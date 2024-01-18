// Status responses
const STATUS_MESSAGES = {
  200: 'success',
  201: 'success',
  400: 'fail',
  401: 'fail',
  403: 'fail',
  404: 'fail',
  500: 'error',
};

// General responses
export const EVENT_MESSAGES = {
  badRequest: `Bad Request`,
  notFound: `Not Found`,
  conflict: `Conflict Event`,
  missingUserIdentifier: `Missing User identifier`,
  missingFields: `Missing fields in request`,
  // Achievements
  achievementTag: `Achievement database`,
  achievementNotFound: `Failed to find achievement/s`,
  userAchievementsNotFound: `Failed to find user achievements`,
  createAchievementFail: `Failed to create achievement`,
  markAchievementViewedFailed: `Failed to mark achievement as viewed`,
  // Complaints
  complaintTag: `Complaint database`,
  complaintNotFound: `Failed to find complaint/s`,
  userComplaintsNotFound: `Failed to find user complaints`,
  createComplaintFail: `Failed to create complaint`,
  markComplaintViewedFailed: `Failed to mark complaint as viewed`,
  // Contacts
  contactTag: `Contact database`,
  contactNotFound: `Failed to find contact/s`,
  createContactFail: `Failed to create contact`,
  // Events
  eventTag: `Event database`,
  eventNotFound: `Failed to find event`,
  createEventFail: `Failed to create event`,
  // ecoEvents
  ecoEventTag: `ecoEvent database`,
  ecoEventNotFound: `Failed to find ecoEvent/s`,
  createecoEventFail: `Failed to create ecoEvent`,
  // Lottery
  lotteryTag: `Lottery database`,
  lotteryNotFound: `Failed to find lottery`,
  createLotteryFail: `Failed to create lottery`,
  dateInUse: `Draw already taking place on this day`,
  dateNotInUse: `Draw not place on this day`,
  createDrawFail: `Failed to create draw`,
  createTicketFail: `Failed to create ticket`,
  createMultipleTicketsFail: `Failed to create multiple tickets`,
  // Messages
  messageTag: `Message database`,
  messageNotFound: `Failed to find message/s`,
  userMessagesNotFound: `Failed to find user messages`,
  createMessageFail: `Failed to create message`,
  markMessageViewedFailed: `Failed to mark message as viewed`,
  // Newsletters
  newsletterTag: `Newsletter database`,
  newsletterIdNotFound: `Failed find newsletter/s`,
  userNewslettersNotFound: `Failed to find user newsletters`,
  createNewsletterFail: `Failed to create newsletter`,
  removeNewsletterFail: `Failed to remove member from newsletter list`,
  newsletterSignupFail: `Failed to sign up to newsletter mailing list`,
  markNewsletterViewedFailed: `Failed to mark newsletter as viewed`,
  // Notifications
  notificationTag: `Notification database`,
  notificationIdNotFound: `Failed find notification/s`,
  userNotificationsNotFound: `Failed to find user notifications`,
  createNotificationFail: `Failed to create notification`,
  markNotificationViewedFailed: `Failed to mark notification as viewed`,
  // Petigotchis
  petigotchiTag: `Petigotchi database`,
  petigotchiNotFound: `Failed to find petigotchi/s`,
  createPetigotchiFail: `Failed to create new petigotchi`,
  petNotFound: `Failed to find pet/s`,
  petLevelUpFailed: `Failed to update pet level`,
  namePetigotchiFailed: `Failed to update name of petigotchi`,
  petIdConflict: `Pet and User ID's do not match`,
  petDidntDie: `Failed to delete pet`,
  userHasPet: `User already has a pet`,
  // Profiles
  profileTag: `Profile database`,
  profileNotFound: `Failed to find profile/s`,
  createProfileFail: `Failed to create profile`,
  updateProfileFail: `Failed to update profile`,
  updateScoreFail: `Failed to update score`,
  updateLevelFail: `Failed to update level`,
  profileNotFound: `Failed to find profile`,
  profileIdConflict: `Profile and User ID's do not match`,
  // Reviews
  reviewsTag: `Review database`,
  notFoundReview: `Failed to find review/s`,
  userReviewsNotFound: `Failed to find user reviews`,
  createReviewFail: `Failed to create review`,
  markReviewViewedFailed: `Failed to mark review as viewed`,
  // Users
  userTag: `User database`,
  userNotFound: `Failed to find user/s`,
  emailInUse: `Email already in use`,
  emailNotFound: `Email not found in database`,
  loginRecordNotFound: `Login Record not found in database`,
  createUserFail: `Failed to create new user`,
  updateUserToNewsletterMembership: `Failed to set user to newsletter membership`,
  deleteUserFail: `Failed to delete user`,
  passwordMatchError: `Password match error for reset Password - New passwords do not match`,
  passwordResetError: `Account record doesn't exist or has been reset already.`,
  // Verification
  verificationTag: `Verification database`,
  verificationNotFound: `Failed to find verification`,
  verificationNotFoundReturnMessage: `Account record doesn't exist or has been verified already. Please sign up or log in.`,
  expiredLinkMessage: `Links has expired, please sign up or log in and check your account`,
  invalidVerificationMessage: `Invalid verification details passed. Check your inbox, or contact support`,
};

// Error responses for eventEmitter/errors
export const RESPONSE_MESSAGES = {
  ConfictEvent: 'Request conflicts with data on server',
  DeactivatedUserEvent: 'The target user account has been deactivated',
  ServerErrorEvent: 'Internal Server Error',
  CreateEventError: 'Failed to create an event log',
  NotFoundEvent: 'was not found',
  NoPermissionEvent: 'You are not authorized to perform this action',
  NoValidationEvent: 'Unable to verify user',
  BadRequestEvent: 'Incorrect request syntax or malformed request',
  MissingFieldEvent: 'Missing fields in body',
};

// Data responses
export function sendDataResponse(res, statusCode, payload) {
  return res.status(statusCode).json({
    status: STATUS_MESSAGES[statusCode],
    data: payload,
  });
}

// Error responses
export function sendMessageResponse(res, statusCode, message) {
  return res.status(statusCode).json({
    status: STATUS_MESSAGES[statusCode],
    message,
  });
}
