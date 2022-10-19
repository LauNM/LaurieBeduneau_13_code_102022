import {store} from "../store"

export async function getToken(data = {}) {
  return await fetch('http://localhost:3001/api/v1/user/login', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(data)
  }).then(res => res.json());
}

export async function getProfile() {
  const token = store.getState().token.token
  return await fetch('http://localhost:3001/api/v1/user/profile', {
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: "POST",
  }).then(res => res.json());
}

export async function updateProfile(data = {}) {
  const token = store.getState().token.token
  return await fetch('http://localhost:3001/api/v1/user/profile', {
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: "PUT",
    body: JSON.stringify(data)
  }).then(res => res.json());
}