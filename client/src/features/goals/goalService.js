import axios from "axios";

const BASE_URL = 'https://goal-setter-api-taupe.vercel.app';
const API_URL = '/api/goals';

const URL = BASE_URL + API_URL;

const fetchGoalApi = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(URL, config);
  return response.data;
}

const createGoalApi = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(URL, goalData, config);
  return response.data;
}

const deleteGoalApi = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(`${URL}/${goalId}`, config);
  return response.data;
}

const goalServices = {
  fetchGoalApi,
  createGoalApi,
  deleteGoalApi
}

export default goalServices;
