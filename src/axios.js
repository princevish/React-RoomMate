import axios from 'axios';

//const baseURL = 'http://127.0.0.1:4000/';

const axiosInstance = axios.create({
	headers: {
		'Content-Type': 'application/json',
		accept: 'application/json',
	} 
});
export default axiosInstance;