import React from "react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Loader } from "../../components"
import axios from "../../config/axios"

function UpdateEmployeeInfo() {
	const { state } = useLocation()
	const navigate = useNavigate()

	// const { firstNameS, lastNameS, usernameS, genderS, salaryS } =

	const [isLoading, setIsLoading] = useState(false)
	const [firstName, setFirstName] = useState(state.employeeInfo.firstName)
	const [lastName, setLastName] = useState(state.employeeInfo.lastName)
	const [gender, setGender] = useState(state.employeeInfo.gender)
	const [salary, setSalary] = useState(state.employeeInfo.salary)

	const handleUpdate = async (e) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			await axios.put(`/api/emp/employees/${state.employeeInfo.id}`, {
				firstName,
				lastName,
				gender,
				salary,
			})
			alert("Employee information updated successfully!")
			setIsLoading(false)
			navigate("/")
		} catch (err) {
			setIsLoading(false)
			console.log(err.response?.data.message || err.message)
			alert(err.response?.data.message || err.message)
		}
	}

	return (
		<div className="grid place-items-center">
			{isLoading && <Loader />}

			<article className="relative bg-white w-full max-w-lg p-8 pt-12 rounded-lg">
				<h2 className="mb-6 text-center text-2xl text-blue-500 font-medium">
					Update employee information
				</h2>

				<form onSubmit={handleUpdate}>
					<label className="block mb-1 text-md" htmlFor="firstName">
						First name
					</label>
					<input
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
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
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
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
						value={state.employeeInfo.username}
						onChange={() => {}}
						className="border-2 px-3 py-2 w-full mb-4 text-sm"
						type="text"
						name="username"
						id="username"
						required
					/>

					<div className="flex gap-4">
						<div className="flex-1">
							<label
								className="block mb-1 text-md"
								htmlFor="gender"
							>
								Gender
							</label>
							<select
								value={gender}
								onChange={(e) => setGender(e.target.value)}
								name="gender"
								id="gender"
								className="border-2 px-3 py-2 w-full mb-4 text-sm"
							>
								<option value="male">Male</option>
								<option value="female">Female</option>
							</select>
						</div>

						<div className="flex-1">
							<label
								className="block mb-1 text-md"
								htmlFor="salary"
							>
								Salary
							</label>
							<input
								value={salary}
								onChange={(e) => setSalary(e.target.value)}
								className="border-2 px-3 py-2 w-full mb-4 text-sm"
								type="number"
								name="salary"
								id="salary"
								placeholder="e.g, 10000"
								required
							/>
						</div>
					</div>

					<button
						className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white mt-2 mb-4 mx-auto block rounded-md"
						type="submit"
					>
						Submit
					</button>
				</form>
			</article>
		</div>
	)
}

export default UpdateEmployeeInfo
