import axios from "axios"

// Creating an axios instance to be used across the app

export default axios.create({
	baseURL: "https://mohammed-ems.onrender.com/",
})
