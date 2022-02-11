import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, Image, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HorizontalDivider from '../../components/HorizontalDivider';
import { Text, View } from '../../components/Themed';
import VerMarginView from '../../components/VerMarginView';
import { MaterialIcons } from '@expo/vector-icons';
import SubmitButton from '../../components/SubmitButton';
import HorMarginView from '../../components/HorMarginView';
import { isEmailValid } from '../../utils/strings';
import { useAppUIContext } from '../../context/AppUIContext';
import auth from '@react-native-firebase/auth';
import { userDoc } from '../../service/firebase/firebaseQueries';
import { RootStackNavigationProps } from '../../navigation/RootNavigator';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthStackNavigationProps } from '../../navigation/AuthNavigator';

export default function SigninScreen() {

  const navigation = useNavigation<CompositeNavigationProp<AuthStackNavigationProps, RootStackNavigationProps>>()
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const refPasswordInput = useRef<TextInput>(null)

  const [confirmPassword, setConfirmPassword] = useState('')
  const refConfirmPasswordInput = useRef<TextInput>(null)
  
  const { showLoadingIndicator } = useAppUIContext()

  const signUpAvailable = useMemo(() => {
    return isEmailValid(emailAddress) && password.length > 5 && password === confirmPassword
  }, [emailAddress, password, confirmPassword])

  const onSignup = () => {
    showLoadingIndicator(true)
    auth().createUserWithEmailAndPassword(emailAddress, password)
      .then(userCredential => {
        showLoadingIndicator(false)
        const createdUserId = userCredential.user?.uid
        if (createdUserId) {
          userDoc(createdUserId).set({
            uid: createdUserId,
            created: new Date().getTime(),
            email: emailAddress,
            auth_by: 'email',
          })
          navigation.push('Root')
        } else {
          Alert.alert('Sign up failed', undefined, [{
            text: "Ok",
            style: "cancel"
          }])
        }
      })
      .catch(err => {
        showLoadingIndicator(false)
        Alert.alert('Sign up failed', err.message, [{
          text: "Ok",
          style: "cancel"
        }])
      })
  }

  const onGoogleSign = async () => {

    showLoadingIndicator(true)
    try {
      const { idToken, user } = await GoogleSignin.signIn()
      const googleCredential = auth.GoogleAuthProvider.credential(idToken)
      
      const authUserCredential = await auth().signInWithCredential(googleCredential)
      const userId = authUserCredential.user.uid
      if (userId) {
        const userDocData = await userDoc(userId).get()
        if (!userDocData.exists) {
          await userDoc(userId).set({
            uid: userId,
            created: new Date().getTime(),
            auth_by: 'google',
            firstName: user.givenName,
            lastName: user.familyName,
            avatar: user.photo
          })
        }
        showLoadingIndicator(false)
        navigation.navigate('Root')
      } else {
        showLoadingIndicator(false)  
      }
    } catch (err: any) {
      showLoadingIndicator(false)
    }
  }

  const onSignin = () => {
    navigation.navigate('Signin')
  }

  useEffect(() => {
    
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingViewContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.title}>Sign up</Text>
        <VerMarginView size={50} />
        <View style={styles.bottomBox}>
          <View style={styles.textInput}>
            <TextInput 
              placeholder='Email address'
              autoCapitalize='none'
              style={{ width: '100%', height: '100%' }}
              keyboardType='email-address'
              value={emailAddress}
              returnKeyType='next'
              onChangeText={setEmailAddress}
              onSubmitEditing={() => refPasswordInput.current?.focus()}
            />
            <MaterialIcons name="email" size={24} color='#adadad' style={styles.textInputIcon} />
          </View>
          <HorizontalDivider />
          <VerMarginView size={10} />
          <View>
            <TextInput 
              ref={refPasswordInput}
              placeholder='Password (6 or more characters)'
              style={styles.textInput}
              value={password}
              textContentType='oneTimeCode'
              returnKeyType='next'
              blurOnSubmit={false}
              onChangeText={setPassword}
              onSubmitEditing={() => refConfirmPasswordInput.current?.focus()}
              secureTextEntry
            />
            <MaterialIcons name="lock" size={24} color='#adadad' style={styles.textInputIcon} />
          </View>
          <HorizontalDivider />
          <VerMarginView size={10} />
          <View>
            <TextInput 
              ref={refConfirmPasswordInput}
              placeholder='Confirm password'
              style={styles.textInput}
              textContentType='oneTimeCode'
              value={confirmPassword}
              blurOnSubmit={false}
              returnKeyType='done'
              onChangeText={setConfirmPassword}
              secureTextEntry
              onSubmitEditing={() => Keyboard.dismiss()}
            />
            <MaterialIcons name="lock" size={24} color='#adadad' style={styles.textInputIcon} />
          </View>
          <HorizontalDivider />
          <VerMarginView size={30} />
          <SubmitButton 
            disabled={!signUpAvailable}
            onPress={onSignup}
            text="Sign up"
          />
          <VerMarginView size={50} />
          <View style={styles.orSeparatorContainer}>
            <View style={styles.orSeparator} />
            <Text style={styles.orText}>Or</Text>
            <View style={styles.orSeparator} />
          </View>
          <VerMarginView size={20} />
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity onPress={onGoogleSign} style={styles.googleButton}>
              <Image 
                source={require('../../../assets/images/google-logo.png')}
                resizeMode='contain'
                style={styles.socialLogo}
              />
              <Text style={styles.googleButtonText}>Sign up with Google</Text>
            </TouchableOpacity>
            <HorMarginView size={20}/>
            <TouchableOpacity style={styles.appleButton}>
              <Image 
                source={require('../../../assets/images/apple-logo.png')}
                resizeMode='contain'
                style={styles.socialLogo}
              />
              <Text style={styles.appleButtonText}>Sign up with Apple</Text>
            </TouchableOpacity>
          </View>
          <VerMarginView size={20} />
          <Text style={{ textAlign: 'center' }}>
            If you have an account, please <Text onPress={onSignin} style={{ color: 'blue' }}>Sign In</Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  keyboardAvoidingViewContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomBox: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  spinner: {
    marginTop: 20,
  },
  textInput: {
    height: 40,
    width: '100%',
  },
  textInputIcon: {
    position: 'absolute',
    right: 20,
    top: '50%',
    marginTop: -12
  },
  orSeparatorContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  orSeparator: {
    flex: 1,
    height: 1,
    backgroundColor: '#efefef',
  },
  orText: {
    marginHorizontal: 20,
    color: '#9f9f9f',
  },
  socialButtonsContainer: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
  },
  googleButton: {
    flex: 1,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#cdcdcd',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  googleButtonText: {
    color: 'black',
    fontSize: 13,
    marginLeft: 10,
  },
  appleButton: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 3,
  },
  appleButtonText: {
    color: 'white',
    fontSize: 13,
    marginLeft: 10,
  },
  socialLogo: {
    width: 20,
    height: 20,
  },
})