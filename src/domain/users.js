import dbClient from '../utils/dbClient.js';

export const findAllUsers = () =>
  dbClient.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      profile: true,
      newsletterMember: true,
    },
  });

export const findUserByEmail = (email) =>
  dbClient.user.findUnique({
    where: { email: email },
    include: {
      profile: true,
      loginRecord: true,
    },
  });

export const findUserById = (userId) =>
  dbClient.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      profile: true,
      newsletterMember: true,
    },
  });

export const findUsersByRole = (role) =>
  dbClient.user.findMany({
    where: {
      role: role,
    },
    include: {
      messages: true,
      notifications: true,
      profile: true,
      newsletterMember: true,
    },
  });

export const createUser = (
  email,
  password,
  firstName,
  lastName,
  lowerCaseCountry,
  agreedToTerms,
  agreedToNewsletter
) =>
  dbClient.user.create({
    data: {
      email: email,
      password: password,
      agreedToTerms: agreedToTerms,
      agreedToNewsletter: agreedToNewsletter,
      profile: {
        create: {
          firstName: firstName,
          lastName: lastName,
          country: lowerCaseCountry,
        },
      },
    },
  });

export const updateUserLoginRecordToRewardAvailable = (
  recordId,
  newLoginTime
) =>
  dbClient.loginRecord.update({
    where: {
      id: recordId,
    },
    data: {
      lastLoginDateTime: newLoginTime,
    },
  });

export const resetUserLoginRecord = (recordId, newLoginTime) =>
  dbClient.loginRecord.update({
    where: {
      id: recordId,
    },
    data: {
      daysInARow: 1,
      lastLoginDateTime: newLoginTime,
    },
  });

export const createNewsletterMembershipForNewMember = (userId, email) =>
  dbClient.newsletterMember.create({
    data: {
      userId: userId,
      email: email,
    },
  });

export const findVerification = (userId) =>
  dbClient.userVerification.findUnique({
    where: {
      userId: userId,
    },
  });

export const findResetRequest = (userId) =>
  dbClient.passwordReset.findUnique({
    where: {
      userId: userId,
    },
  });

export const resetUserPassword = (userId, password) =>
  dbClient.user.update({
    where: {
      id: userId,
    },
    data: {
      password: password,
    },
  });

export const deleteUserById = (userId) =>
  dbClient.user.delete({
    where: {
      id: userId,
    },
  });

export const updateUserById = (userId, email, firstName, lastName, country) =>
  dbClient.user.update({
    where: {
      id: userId,
    },
    data: {
      email,
      firstName,
      lastName,
      country,
    },
  });
