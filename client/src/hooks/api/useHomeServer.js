const API = import.meta.env.VITE_API_URL;

async function getStreak() {
  const token = localStorage.getItem('accessToken');
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
  const token = localStorage.getItem('accessToken');
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

async function postAddXp(amount, capibas, reason, metadata) {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;

  const body = { amount };
  if (capibas !== undefined && capibas !== null) body.capibas = capibas;
  if (reason) body.reason = reason;
  if (metadata) body.metadata = metadata;

  const options = { 
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}` 
    }, 
    method: 'POST', 
    body: JSON.stringify(body) 
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