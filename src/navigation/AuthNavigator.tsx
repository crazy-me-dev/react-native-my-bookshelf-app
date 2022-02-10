import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import SigninScreen from '../screens/auth/SigninScreen';
import SignupScreen from '../screens/auth/SignupScreen';
 
export type AuthStackParamList = {
    Signin: undefined;
    Signup: undefined;
};

export type AuthStackNavigationProps = NativeStackNavigationProp<AuthStackParamList>

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
}