import React, { useRef } from "react"
import { Link } from "react-router-dom"

function Signup() {
	// References to input fields
	const firstNameRef = useRef()
	const lastNameRef = useRef()
	const usernameRef = useRef()
	const passwordRef = useRef()

	// Method to handle user submitting data to Signup
	const handleSubmit = async (e) => {
		e.preventDefault()
	}

	return (
		<div className="min-h-screen grid place-items-center p-4">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md py-8 px-6 rounded-lg md:px-10"
				style={{
					boxShadow: "0px 0px 10px 0px rgba(169, 169, 169, 0.25)",
				}}
			>
				<h2 className="text-3xl font-medium mb-6 text-blue-600">
					Sign up
				</h2>

				<label className="block mb-1 text-md" htmlFor="firstName">
					First name
				</label>
				<input
					ref={firstNameRef}
					className="border-2 px-3 py-2 w-full mb-4 text-sm"
					type="text"
					name="firstName"
					id="firstName"
					required
				/>

				<label className="block mb-1 text-md" htmlFor="lastName">
					Last name
				</label>
				<input
					ref={lastNameRef}
					className="border-2 px-3 py-2 w-full mb-4 text-sm"
					type="text"
					name="lastName"
					id="lastName"
					required
				/>

				<label className="block mb-1 text-md" htmlFor="username">
					Username
				</label>
				<input
					ref={usernameRef}
					className="border-2 px-3 py-2 w-full mb-4 text-sm"
					type="text"
					name="username"
					id="username"
					required
				/>

				<div className="flex gap-4">
					<div className="flex-1">
						<label className="block mb-1 text-md" htmlFor="gender">
							Gender
						</label>
						<select
							name="gender"
							id="gender"
							className="border-2 px-3 py-2 w-full mb-4 text-sm"
						>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
					</div>

					<div className="flex-1">
						<label className="block mb-1 text-md" htmlFor="salary">
							Salary
						</label>
						<input
							ref={usernameRef}
							className="border-2 px-3 py-2 w-full mb-4 text-sm"
							type="number"
							name="salary"
							id="salary"
							placeholder="e.g, 10000"
							required
						/>
					</div>
				</div>

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
						Already have an account?{" "}
						<Link
							className="cursor-pointer  text-blue-600 hover:underline"
							to={"/login"}
						>
							Log in
						</Link>
					</p>
				</div>
			</form>
		</div>
	)
}

export default Signup
