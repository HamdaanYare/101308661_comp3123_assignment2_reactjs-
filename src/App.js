import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from "react-router-dom"
import { Navbar } from "./components"
import { useAppContext } from "./context/AppProvider"

import { EmployeeInfo, Home, Login, Signup, UpdateEmployeeInfo } from "./pages"

function App() {
	const { user } = useAppContext()

	return (
		<div>
			<Router>
				<Navbar />
				{user ? (
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route
							exact
							path="/employee/:id"
							element={<EmployeeInfo />}
						/>
						<Route
							exact
							path="/employee/update/:id"
							element={<UpdateEmployeeInfo />}
						/>
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				) : (
					<Routes>
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/signup" element={<Signup />} />
						<Route path="*" element={<Navigate to="/login" />} />
					</Routes>
				)}
			</Router>
		</div>
	)
}

export default App
