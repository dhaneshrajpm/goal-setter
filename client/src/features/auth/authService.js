import axios from 'axios'

const BASE_URL = 'https://goal-setter-api-taupe.vercel.app';
const API_URL = '/api/users'

const URL = BASE_URL + API_URL;

// Register user
const registerApi = async (userData) => {
  const response = await axios.post(URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const loginApi = async (userData) => {
  const response = await axios.post(URL + '/login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logoutApi = () => {
  localStorage.removeItem('user')
}

const authService = {
  registerApi,
  logoutApi,
  loginApi,
}

export default authService
