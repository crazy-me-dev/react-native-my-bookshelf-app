import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "./Themed";

type Props = {
  text: string,
  disabled?: boolean,
  onPress: () => void,
}

export default function SubmitButton({
  text,
  disabled = false,
  onPress
} : Props) {
  return (
    <TouchableOpacity 
      disabled={disabled}
      onPress={onPress}
      style={{
        ...styles.container,
        backgroundColor: disabled ? '#cdcdcd' : 'black',
      }}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: '100%',
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