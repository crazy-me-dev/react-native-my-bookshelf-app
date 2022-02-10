import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "./Themed";

type Props = {
  text: string,
  onPress: () => void,
}

export default function SubmitButton({
  text,
  onPress
} : Props) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
})