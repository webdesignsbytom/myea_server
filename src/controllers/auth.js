import bcrypt from 'bcrypt';
// Database
import { findUserByEmailForAppLogin } from '../domain/users.js';
// Responses
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js';
// Events
import { myEmitterErrors } from '../event/errorEvents.js';
// Token
import { createAccessToken } from '../utils/tokens.js';
import { LoginServerErrorEvent } from '../event/utils/errorUtils.js';
import { resetUserLoginRecord, updateUserLoginRecord } from '../domain/loginRecord.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  const lowerCaseEmail = email.toLowerCase();

  if (!lowerCaseEmail || !password) {
    return sendDataResponse(res, 400, {
      email: 'Missing email and/or password provided',
    });
  }

  try {
    const userModel = await findUserByEmailForAppLogin(lowerCaseEmail);

    const areCredentialsValid = await validateCredentials(
      password,
      userModel
    );

    if (!areCredentialsValid) {
      return sendDataResponse(res, 400, {
        email: 'Invalid email and/or password provided',
      });
    }

    // Login records and points
    let lastLoginTime = userModel.loginRecord.lastLoginDateTime;
    console.log('last login time', lastLoginTime);

    let oneDayLater = new Date(lastLoginTime.getTime() + 1);
    console.log('one day later', oneDayLater);

    let twoDaysLater = new Date(lastLoginTime.getTime() + 172800000);
    console.log('twoDaysLater', twoDaysLater);

    let newLoginTime = new Date();
    console.log('newLoginTime', newLoginTime);

    // rewards
    if (newLoginTime > oneDayLater && newLoginTime < twoDaysLater) {
      await updateUserLoginRecord(userModel.loginRecord.id, newLoginTime);
      // Await score + 2x
    }

    if (newLoginTime > twoDaysLater) {
      await resetUserLoginRecord(userModel.loginRecord.id, newLoginTime);
      // Await score ++
    }

    delete userModel.password;

    const userLoginToken = createAccessToken(userModel.id, userModel.email);

    return sendDataResponse(res, 200, { user: { userLoginToken, userModel }});
  } catch (err) {
    //
    const serverError = new LoginServerErrorEvent(email, `Login Server error`);
    myEmitterErrors.emit('error-login', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export async function validateCredentials(password, user) {
  if (!user) {
    return false;
  }

  if (!password) {
    return false;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return false;
  }

  return true;
}
