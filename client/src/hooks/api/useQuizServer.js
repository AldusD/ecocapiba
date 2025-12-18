// import { useQuery, useMutation } from "react-query";

const API = import.meta.env.VITE_API_URL;

async function getQuiz(quizType) {
  const token = localStorage.getItem('authToken');
  const options = { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, method: 'GET' };
  const response = await fetch(`${API}/quizzes/${quizType}`, options);
  const data = response.text();
  return data;
}

export async function postQuizAttempt(attemptData) {
  const token = localStorage.getItem('authToken');
  if (!token) return null;
  const options = { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, method: 'POST', body: JSON.stringify({correctCount: attemptData.correctCount}) };
  const response = await fetch(`${API}/quiz/attempt/${attemptData.quizId}`, options);
  const data = response.text();
  return data;
}

export default {
  postQuizAttempt
}

//export default getQuiz;

//////////////////////

// const API = process.env.REACT_APP_API_BASE_URL;