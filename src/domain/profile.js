import dbClient from '../utils/dbClient.js';

export const getUserProfileById = (profileId) =>
  dbClient.profile.findMany({
    where: {
      id: profileId,
    },
  });

export const updateUserProfileData = (
  profileId,
  username,
  city,
  country,
  gender,
  firstName,
  lastName,
  bio,
  profileImage,
  isPrivateProfile
) =>
  dbClient.profile.update({
    where: {
      id: profileId,
    },
    data: {
      username: username,
      city: city,
      country: country,
      gender: gender,
      firstName: firstName,
      lastName: lastName,
      bio: bio,
      profileImage: profileImage,
      isPrivateProfile: isPrivateProfile
    }
  });
