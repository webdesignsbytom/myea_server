import dbClient from '../utils/dbClient.js';

export const findAllNewsletterMembers = () =>
  dbClient.newsletterMember.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

export const checkMemberExistsInDatabase = (lowerCaseEmail) =>
  dbClient.newsletterMember.findFirst({
    where: {
      email: lowerCaseEmail,
    },
  });

export const createMemberInNewsletterDatabase = (lowerCaseEmail, userId) =>
  dbClient.newsletterMember.create({
    data: {
      email: lowerCaseEmail,
      userId: userId,
    },
  });

export const findNewsletterMemberById = (newsletterId) =>
  dbClient.newsletterMember.findFirst({
    where: {
      id: newsletterId,
    }
  });

export const deleteMemberFromNewsletter = (newsletterId) =>
  dbClient.newsletterMember.delete({
    where: {
      id: newsletterId,
    }
  });
