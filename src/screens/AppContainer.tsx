import { useAppUIContext } from "../context/AppUIContext";
import useColorScheme from "../hooks/useColorScheme";
import Navigation from "../navigation";
import FullScreenLoadingIndicator from "./FullScreenLoadingIndicator";

export default function AppContainer() {

  const colorScheme = useColorScheme()
	const { isShowingLoadingIndicator } = useAppUIContext()

	return (
		<>
			<Navigation colorScheme={colorScheme}/>
			{isShowingLoadingIndicator && (
				<FullScreenLoadingIndicator />
			)}
		</>
	)
}