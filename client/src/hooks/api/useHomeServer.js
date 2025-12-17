const API = import.meta.env.VITE_API_URL;

async function getStreak() {
  const token = localStorage.getItem('authToken');
  if (!token) return null; 

  const options = { 
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}` 
    }, 
    method: 'GET' 
  };
  
  const response = await fetch(`${API}/recycle/streak`, options);
  if (response.ok) return response.json();
  throw new Error(response.statusText);
}

async function getXp() {
  const token = localStorage.getItem('authToken');
  if (!token) return null;

  const options = { 
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}` 
    }, 
    method: 'GET'
  };
  
  const response = await fetch(`${API}/auth/getxp`, options);
  if (response.ok) return response.json();
  throw new Error(response.statusText);
}

async function postAddXp(amount) {
  const token = localStorage.getItem('authToken');
  if (!token) return null;

  const options = { 
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}` 
    }, 
    method: 'POST', 
    body: JSON.stringify({ amount }) 
  };

  const response = await fetch(`${API}/auth/addxp`, options);
  if (response.ok) return response.json();
  throw new Error(response.statusText);
}

export default {
  getStreak,
  getXp,
  postAddXp
};