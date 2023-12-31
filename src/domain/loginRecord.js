import dbClient from '../utils/dbClient.js';

export const updateUserLoginRecord = (
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