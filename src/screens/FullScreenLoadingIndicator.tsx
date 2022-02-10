import { ActivityIndicator, StyleSheet } from "react-native";
import { View } from "../components/Themed";

export default function FullScreenLoadingIndicator() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color='white' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#0000007f',
    justifyContent: 'center',
    alignItems: 'center',
  }
})