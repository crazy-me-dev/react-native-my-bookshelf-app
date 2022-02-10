import { StyleSheet } from "react-native";
import { View } from "./Themed";

export default function HorMarginView({ size }: { size: number}) {
  return (
    <View style={{ width: size }} />
  )
}