import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootStackNavigationProps } from '../navigation/RootNavigator';

import auth from '@react-native-firebase/auth';

export default function SplashScreen(/*{ navigation }: RootStackScreenProps<'Splash'>*/) {

  const navigation = useNavigation<RootStackNavigationProps>()

  useEffect(() => {
    if (auth().currentUser) {
      navigation.navigate('Root')
    } else {
      navigation.navigate('Auth')
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookshelf</Text>
      <ActivityIndicator color={'black'} style={styles.spinner}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  spinner: {
    marginTop: 20,
  },
});
