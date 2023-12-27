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

export const createMemberInNewsletterDatabase = (lowerCaseEmail) =>
  dbClient.newsletterMember.create({
    data: {
      email: lowerCaseEmail,
    },
  });
