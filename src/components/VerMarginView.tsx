import { StyleSheet } from "react-native";
import { View } from "./Themed";

export default function VerMarginView({ size }: { size: number}) {
  return (
    <View style={{ height: size }} />
  )
}