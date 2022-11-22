import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Loader } from "../../components"
import axios from "../../config/axios"

function EmployeeInfo() {
	let { id } = useParams()
	const [isLoading, setIsLoading] = useState(false)
	const [employeeInfo, setEmployeeInfo] = useState(null)

	const fetchEmployeeInfo = async () => {
		setIsLoading(true)
		try {
			const { data } = await axios.get(`/api/emp/employees/${id}`)
			setEmployeeInfo(data)
			setIsLoading(false)
		} catch (err) {
			setIsLoading(false)
			console.log(err.response?.data.message || err.message)
			alert(err.response?.data.message || err.message)
		}
	}

	useEffect(() => {
		fetchEmployeeInfo()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div>
			{isLoading && <Loader />}
			<h2 className="text-3xl text-blue-500 font-medium mt-20 text-center mb-6">
				Employee Information
			</h2>
			<div className="rounded-md p-6 w-full bg-gray-100 max-w-md mx-auto ">
				<div className="flex gap-2 mb-2">
					<p>First name:</p>
					<p>{employeeInfo?.firstName}</p>
				</div>
				<div className="flex gap-2 mb-2">
					<p>Last name:</p>
					<p>{employeeInfo?.lastName}</p>
				</div>
				<div className="flex gap-2 mb-2">
					<p>Username:</p>
					<p>{employeeInfo?.username}</p>
				</div>
				<div className="flex gap-2 mb-2">
					<p>Gender:</p>
					<p>{employeeInfo?.gender}</p>
				</div>
				<div className="flex gap-2 mb-2">
					<p>Salary:</p>
					<p>{employeeInfo?.salary}</p>
				</div>
			</div>
		</div>
	)
}

export default EmployeeInfo
