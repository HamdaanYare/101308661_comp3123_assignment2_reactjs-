import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loader, ModalBackdrop } from "../../components"
import axios from "../../config/axios"

function Home() {
	const navigate = useNavigate()

	const [employees, setEmployees] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [showAddEmployeesModal, setShowAddEmployeesModal] = useState(false)

	// References to input fields
	const firstNameRef = useRef()
	const lastNameRef = useRef()
	const userNameRef = useRef()
	const genderRef = useRef()
	const salaryRef = useRef()
	const passwordRef = useRef()

	const fetchEmployees = async () => {
		setIsLoading(true)
		try {
			const { data } = await axios.get("/api/emp/employees")
			setEmployees(data)
			setIsLoading(false)
		} catch (err) {
			setIsLoading(false)
			console.log(err)
		}
	}

	const handleDelete = async (id) => {
		setIsLoading(true)

		try {
			const { data } = await axios.delete(`/api/emp/employees?eid=${id}`)
			console.log(data)
			setIsLoading(false)
			fetchEmployees()
		} catch (err) {
			setIsLoading(false)
			console.log(err)
			alert(err.response?.data.message || err.message)
		}
	}

	const handleAddEmployee = async (e) => {
		e.preventDefault()
		// setIsLoading(true)

		try {
			await axios.post(`/api/emp/employees`, {
				username: userNameRef.current.value,
				firstName: firstNameRef.current.value,
				lastName: lastNameRef.current.value,
				gender: genderRef.current.value,
				salary: salaryRef.current.value,
				password: passwordRef.current.value,
			})
			setShowAddEmployeesModal(false)
			setIsLoading(false)
			fetchEmployees()
		} catch (err) {
			setIsLoading(false)
			console.log(err)
			alert(err.response?.data.message || err.message)
		}
	}

	useEffect(() => {
		fetchEmployees()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="px-4">
			{isLoading && <Loader />}

			<main className="w-full max-w-5xl mx-auto">
				<header className="pt-10 pb-6 flex items-center">
					<h2 className="text-2xl text-blue-500 font-medium">
						Employees List
					</h2>

					<button
						className="ml-auto px-4 rounded-md py-3 text-sm bg-blue-500 border-none text-white border-2 hover:bg-blue-400"
						onClick={() => setShowAddEmployeesModal(true)}
					>
						<i className="fa-lg fa-regular fa-plus mr-2"></i>
						Add Employee
					</button>
				</header>

				<table className="border-collapse w-full">
					<thead>
						<tr className="border-b-gray-200 border-b-2 text-left italic text-gray-500">
							<th className="p-3 pr-2 font-medium">First name</th>
							<th className="p-3 pr-2 font-medium">Last name</th>
							<th className="p-3 pr-2 font-medium">Username</th>
							<th className="p-3 pr-2 font-medium">Actions</th>
						</tr>
					</thead>

					<tbody>
						{employees?.map((employee) => (
							<tr
								key={employee._id}
								className="whitespace-nowrap odd:bg-white even:bg-slate-50  text-left md:whitespace-normal"
							>
								<td className="p-3 pr-2">
									{employee.firstName}
								</td>
								<td className="p-3 pr-2">
									{employee.lastName}
								</td>
								<td className="p-3 pr-2">
									{employee.username}
								</td>
								<td className="p-3 pr-2">
									<div
										style={{ fontSize: "12px" }}
										className="flex gap-2"
									>
										<button
											onClick={() =>
												navigate(
													`/employee/update/${employee._id}`,
													{
														state: {
															employeeInfo: {
																firstName:
																	employee.firstName,
																lastName:
																	employee.lastName,
																username:
																	employee.username,
																gender: employee.gender,
																salary: employee.salary,
																id: employee._id,
															},
														},
													}
												)
											}
											className="px-3 rounded-md py-2 bg-orange-500 border-none text-white border-2 hover:bg-orange-400"
										>
											<i className="fa-lg fa-solid fa-user-pen"></i>
										</button>
										<button
											onClick={() =>
												handleDelete(employee._id)
											}
											className="px-3 rounded-md py-2 bg-red-500 border-none text-white border-2 hover:bg-red-400"
										>
											<i className="fa-lg fa-solid fa-trash"></i>
										</button>
										<button
											onClick={() =>
												navigate(
													`/employee/${employee._id}`
												)
											}
											className="px-3 rounded-md py-2 bg-green-600 border-none text-white border-2 hover:bg-green-500"
										>
											View
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</main>

			{showAddEmployeesModal && (
				<ModalBackdrop>
					<div className="bg-tranparentDark flex-1 grid place-items-center">
						<article className="relative bg-white w-full max-w-lg p-8 pt-12 rounded-lg">
							<span
								className="absolute top-3 right-6 text-xl cursor-pointer font-semibold"
								onClick={() => setShowAddEmployeesModal(false)}
							>
								&#x2715;
							</span>

							<h2 className="mb-4 text-xl text-blue-500 font-medium">
								Add new employee
							</h2>

							<form onSubmit={handleAddEmployee}>
								<label
									className="block mb-1 text-md"
									htmlFor="firstName"
								>
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

								<label
									className="block mb-1 text-md"
									htmlFor="lastName"
								>
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

								<label
									className="block mb-1 text-md"
									htmlFor="username"
								>
									Username
								</label>
								<input
									ref={userNameRef}
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
											name="gender"
											id="gender"
											className="border-2 px-3 py-2 w-full mb-4 text-sm"
											ref={genderRef}
										>
											<option value="male">Male</option>
											<option value="female">
												Female
											</option>
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
											ref={salaryRef}
											className="border-2 px-3 py-2 w-full mb-4 text-sm"
											type="number"
											name="salary"
											id="salary"
											placeholder="e.g, 10000"
											required
										/>
									</div>
								</div>

								<label
									className="block mb-1"
									htmlFor="password"
								>
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
							</form>
						</article>
					</div>
				</ModalBackdrop>
			)}
		</div>
	)
}

export default Home
