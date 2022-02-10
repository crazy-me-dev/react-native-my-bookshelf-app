import auth from '@react-native-firebase/auth'

export const isLoggedIn = () => {
    if (auth().currentUser?.uid) {
        return true
    } else {
        return false
    }
}

export const authUserId = () => {
    return auth().currentUser?.uid
}

export const authProvider = () => {
    return auth().currentUser?.providerId
}

export const logout = () => {
    auth().signOut()
}