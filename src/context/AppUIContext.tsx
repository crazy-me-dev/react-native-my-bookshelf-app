import React, { createContext, FC, useContext, useState } from 'react'

interface AppUIContextProperties {
	isShowingLoadingIndicator: boolean,
	showLoadingIndicator: (value: boolean) => void,
}

export const AppUIContext = createContext<AppUIContextProperties>({
	isShowingLoadingIndicator: false,
	showLoadingIndicator: () => undefined,
})

const AppUIContextProvider: FC = ({ children }) => {
	const [isShowingLoadingIndicator, showLoadingIndicator] = useState(false)

	return (
		<AppUIContext.Provider 
			value={{
				isShowingLoadingIndicator,
				showLoadingIndicator,
			}}
		>
			{children}
		</AppUIContext.Provider>
	)
}

export default AppUIContextProvider

export const useAppUIContext = () => useContext(AppUIContext)