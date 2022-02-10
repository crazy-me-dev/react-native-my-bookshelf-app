import storage from '@react-native-firebase/storage'

export const userProfileAvatarRef = (userId: string, fileName?: string) => storage().ref(`/uploads/profiles/${userId}/${Math.trunc(new Date().getTime() / 1000)}-${fileName}`)