import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HorizontalDivider from '../../components/HorizontalDivider';
import { Text, View } from '../../components/Themed';
import VerMarginView from '../../components/VerMarginView';
import { AuthStackNavigationProps } from '../../navigation/AuthNavigator';
import { MaterialIcons } from '@expo/vector-icons';
import SubmitButton from '../../components/SubmitButton';
import HorMarginView from '../../components/HorMarginView';
import { isEmailValid } from '../../utils/strings';
import { RootStackNavigationProps } from '../../navigation/RootNavigator';
import { useAppUIContext } from '../../context/AppUIContext';
import auth from '@react-native-firebase/auth'

export default function SigninScreen() {

  const navigation = useNavigation<CompositeNavigationProp<AuthStackNavigationProps, RootStackNavigationProps>>()
  const [emailAddress, setEmailAddress] = useState('')
  
  const [password, setPassword] = useState('')
  const refPasswordInput = useRef<TextInput>(null)

  const loginButtonAvailable = useMemo(() => {
    return isEmailValid(emailAddress) && password.length > 5
  }, [emailAddress, password])

  const { showLoadingIndicator } = useAppUIContext()

  const onSignup = () => {
    navigation.navigate('Signup')
  }

  const onLogin = () => {
    showLoadingIndicator(true)
    auth().signInWithEmailAndPassword(emailAddress, password)
      .then(() => {
        showLoadingIndicator(false)
        navigation.push('Root')
      })
      .catch(err => {
        showLoadingIndicator(false)
        Alert.alert('Sign in failed', undefined, [{
          text: "Ok",
          style: "cancel"
        }])
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingViewContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.title}>Sign in</Text>
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
              returnKeyType='done'
              onChangeText={setPassword}
              secureTextEntry
            />
            <MaterialIcons name="lock" size={24} color='#adadad' style={styles.textInputIcon} />
          </View>
          <HorizontalDivider />
          <VerMarginView size={30} />
          <SubmitButton 
            onPress={onLogin}
            disabled={!loginButtonAvailable}
            text="Log in"
          />
          <VerMarginView size={50} />
          <View style={styles.orSeparatorContainer}>
            <View style={styles.orSeparator} />
            <Text style={styles.orText}>Or</Text>
            <View style={styles.orSeparator} />
          </View>
          <VerMarginView size={30} />
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.googleButton}>
              <Image 
                source={require('../../../assets/images/google-logo.png')}
                resizeMode='contain'
                style={styles.socialLogo}
              />
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </TouchableOpacity>
            <HorMarginView size={20}/>
            <TouchableOpacity style={styles.appleButton}>
              <Image 
                source={require('../../../assets/images/apple-logo.png')}
                resizeMode='contain'
                style={styles.socialLogo}
              />
              <Text style={styles.appleButtonText}>Sign in with Apple</Text>
            </TouchableOpacity>
          </View>
          <VerMarginView size={20} />
          <Text style={{ textAlign: 'center' }}>
            If you don't have an account, <Text onPress={onSignup} style={{ color: 'blue' }}>Sign Up</Text>
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
});
