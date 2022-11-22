import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Loader } from "../../components"
import { useAppContext } from "../../context/AppProvider"
import axios from "../../config/axios"
import jwtDecode from "jwt-decode"

function Login() {
	const { setUser, setToken } = useAppContext()

	// References to input fields
	const usernameRef = useRef()
	const passwordRef = useRef()

	const [isLoading, setIsLoading] = useState(false)

	// Method to handle user submitting data to login
	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			const { data } = await axios.post("/api/user/login", {
				username: usernameRef.current.value,
				password: passwordRef.current.value,
			})
			setToken(data.jwtToken)
			const decoded = jwtDecode(data.jwtToken)
			localStorage.setItem("accessToken", data.jwtToken)

			const res = await axios.get(`/api/emp/employees/${decoded.id}`)
			setUser(res.data)
			setIsLoading(false)
		} catch (err) {
			setIsLoading(false)
			console.log(err.response?.data.message || err.message)
			alert(err.response?.data.message || err.message)
		}
	}

	return (
		<div className="min-h-screen grid place-items-center p-4">
			{isLoading && <Loader />}
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md py-8 px-6 rounded-lg md:px-10"
				style={{
					boxShadow: "0px 0px 10px 0px rgba(169, 169, 169, 0.25)",
				}}
			>
				<h2 className="text-3xl font-medium mb-6 text-blue-600">
					Login
				</h2>

				<label className="block mb-1 text-md" htmlFor="username">
					Username
				</label>
				<input
					ref={usernameRef}
					className="border-2 px-3 py-2 w-full mb-4 text-sm"
					type="text"
					name="username"
					id="username"
					placeholder="e.g, johndoe123"
					required
				/>
				<label className="block mb-1" htmlFor="password">
					Password
				</label>
				<input
					ref={passwordRef}
					className="border-2 px-3 py-2 w-full mb-4 text-sm"
					type="password"
					name="password"
					id="password"
					placeholder="********"
					required
				/>

				<button
					className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white mt-2 mb-4 mx-auto block rounded-md"
					type="submit"
				>
					Submit
				</button>

				<div className="mt-2">
					<p className="text-center text-sm">
						Don't have an account?{" "}
						<Link
							className="cursor-pointer  text-blue-600 hover:underline"
							to={"/signup"}
						>
							Sign up
						</Link>
					</p>
				</div>
			</form>
		</div>
	)
}

export default Login
