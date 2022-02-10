import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native"
import { StyleSheet } from 'react-native'
import { Text, View } from "../../components/Themed"
import auth from '@react-native-firebase/auth'

export default function ProfileScreen() {

  const navigation = useNavigation()

  const onLogout = () => {
    auth().signOut()
    navigation.navigate('Auth')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLogout}>
        <Text style={{ fontWeight: 'bold' }}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
