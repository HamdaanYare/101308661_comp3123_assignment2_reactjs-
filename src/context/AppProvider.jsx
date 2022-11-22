import { createContext, useContext, useEffect, useState } from "react"
import axios from "../config/axios"
import jwtDecode from "jwt-decode"
import { Loader } from "../components"

const AppContext = createContext()

const AppProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [token, setToken] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		// Method to persist user authenticated state is user has logged in previously and didn't logout
		async function persistUser() {
			setIsLoading(true)
			const token = localStorage.getItem("accessToken")

			if (!token) {
				return setIsLoading(false)
			}

			// Request to server to get user information by passing the auth jwt token as header
			try {
				const decoded = jwtDecode(token)
				if (!decoded) return

				const { data: user } = await axios.get(
					`/api/emp/employees/${decoded.id}`
				)

				// Update context states
				setToken(token)
				setUser(user)
				setIsLoading(false)
			} catch (err) {
				setIsLoading(false)
				if (err.response?.data) {
					alert("Something failed. " + err.response?.data.message)
				} else {
					alert("Something failed. " + err.message)
				}
				console.log(err.response?.data || err.message)
			}
		}

		persistUser()
	}, [])

	// If persisting user check hasn't finished a loader should be rendered
	if (isLoading) {
		return <Loader />
	}

	return (
		<AppContext.Provider value={{ user, setUser, token, setToken }}>
			{children}
		</AppContext.Provider>
	)
}

export default AppProvider

// Custom hook to user app context
export const useAppContext = () => {
	return useContext(AppContext)
}
