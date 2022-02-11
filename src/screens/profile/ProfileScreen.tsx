import { useNavigation } from "@react-navigation/native"
import { Image, Keyboard, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from "react-native"
import { StyleSheet } from 'react-native'
import { Text, View } from "../../components/Themed"
import auth from '@react-native-firebase/auth'
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import HorizontalDivider from "../../components/HorizontalDivider"
import { useEffect, useRef, useState } from "react"
import VerMarginView from "../../components/VerMarginView"
import SubmitButton from "../../components/SubmitButton"
import { User } from "../../model/User"
import { userDoc } from "../../service/firebase/firebaseQueries"
import ActionSheet from 'react-native-actionsheet'
import {Asset, launchCamera, launchImageLibrary} from 'react-native-image-picker'
import { userProfileAvatarRef } from "../../service/firebase/firebaseStorage"

export default function ProfileScreen() {

  const navigation = useNavigation()

  const [firstName, setFirstName] = useState('')

  const [lastName, setLastName] = useState('')
  const refLastNameInput = useRef<TextInput>()

  const [avatar, setAvatar] = useState<string>()

  const [profile, setProfile] = useState<User>()

  const refProfileSnapshot = useRef<(() => void) | null | undefined>(null)

  const [imagePath, setImagePath] = useState<Asset>()
  const actionSheet = useRef<ActionSheet>(null)

  const deleteAvatar = () => {
    setImagePath(undefined)
    if (profile) {
      setProfile({
        ...profile,
        avatar: '',
      })
      myProfileDoc()?.update({
        avatar: '',
      })
    }
  }

  const onLogout = () => {
    auth().signOut()
    navigation.navigate('Auth')
  }

  const chooseProfilePhoto = () => {
    actionSheet.current?.show()
  }

  const openCamera = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        maxWidth: 120,
        maxHeight: 120,
      })
      if (result.assets && result.assets.length > 0) {
        setImagePath(result.assets[0])
        updateProfilePhoto(result.assets[0])
      }
    } catch (err) {
      console.log("Camera picker error => ", JSON.stringify(err))
    }
  }

  const openPhotoLibrary = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 120,
        maxHeight: 120,
      })
      if (result.assets && result.assets.length > 0) {
        setImagePath(result.assets[0])
        updateProfilePhoto(result.assets[0])
      }
    } catch (err) {
      console.log("Photo library picker error => ", JSON.stringify(err))
    }
  }

  const updateProfilePhoto = async (asset: Asset) => {
    const userId = auth().currentUser?.uid

    if (userId) {
      if (imagePath && imagePath.uri) {

        const ref = userProfileAvatarRef(userId, asset.fileName)
        try {
          await ref.putFile(imagePath.uri)
          try {
            const url = await ref.getDownloadURL()
            myProfileDoc()?.update({
              avatar: url,
            })
          } catch (err) {
            console.log("File downloading error => ", JSON.stringify(err))
          }
        } catch (err) {
          console.log("File uploading error => ", JSON.stringify(err))
        }
      }
    }
  }

  const myProfileDoc = () => {
    const userId = auth().currentUser?.uid
    if (userId) {
      return userDoc(userId)
    } else {
      return null
    }
  }

  const updateFirstName = (name: string) => {
    myProfileDoc()?.update({
      firstName: name
    })
  }

  const updateLastName = (name: string) => {
    myProfileDoc()?.update({
      lastName: name
    })
  }

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName)
      setLastName(profile.lastName)
      setAvatar(profile.avatar)
    }
  }, [profile])

  useEffect(() => {
    refProfileSnapshot.current = myProfileDoc()?.onSnapshot(doc => {
      setProfile(doc.data() as User)
    })

    return () => {
      refProfileSnapshot.current?.()
    }
  }, [])

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.pictureArea}>
        <TouchableOpacity style={styles.pictureContainer} onPress={chooseProfilePhoto}>
          {imagePath ? (
            <Image
              source={{ uri: imagePath.uri }}
              style={styles.avatarImage}
            />
          ) : (
          <>
            {(profile?.avatar && profile.avatar !== '') ? (
              <Image
                source={{ uri: profile.avatar }}
                style={styles.avatarImage}
              />
            ) : (
              <MaterialCommunityIcons name="camera-outline" size={44} color='#adadad' />
            )}
          </>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteAvatarButton} onPress={deleteAvatar}>
          <MaterialIcons name="delete-outline" size={24} color='#7f7f7f'/>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, backgroundColor: 'white', width: '100%', paddingHorizontal: 20, paddingVertical: 20 }}>
        <View style={styles.textInput}>
          <TextInput
            placeholder='First name'
            autoCapitalize='words'
            style={{ width: '100%', height: '100%' }}
            value={firstName}
            returnKeyType='next'
            onChangeText={text => {
              setFirstName(text)
              updateFirstName(text)
            }}
            onSubmitEditing={() => refLastNameInput.current?.focus()}
          />
        </View>
        <HorizontalDivider />
        <VerMarginView size={20} />
        <View style={styles.textInput}>
          <TextInput
            placeholder='Last name'
            autoCapitalize="words"
            style={{ width: '100%', height: '100%' }}
            value={lastName}
            returnKeyType='done'
            onChangeText={text => {
              setLastName(text)
              updateLastName(text)
            }}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </View>
        <HorizontalDivider />
        <View style={{ flex: 1 }} />
        <SubmitButton text="Log out" onPress={onLogout}/>
      </View>
      <ActionSheet
          ref={actionSheet}
          title={'Profile Photo?'}
          message={'Select or take a photo to set as your inbyte profile picture'}
          options={['Take a photo', 'Select a photo', 'cancel']}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={(index: number) => { 
            if (index == 0) {
              openCamera()
            } else if (index == 1) {
              openPhotoLibrary()
            }
           }}
        />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  pictureContainer: {
    width: 160,
    height: 160,
    marginVertical: 20,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: '#dadada',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 160,
    height: 160,
    overflow: 'hidden',
    borderRadius: 80,
  },
  textInput: {
    height: 40,
    width: '100%',
  },
  pictureArea: {
    width: '100%',
    alignItems: 'center',
  },
  deleteAvatarButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  }
});
