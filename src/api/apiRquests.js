import { store } from "../store"

export async function getToken(data = {}) {
  return await fetch('http://localhost:3001/api/v1/user/login', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(data)
  }).then(res => {
    if (res.ok) return res.json()
    throw new Error("Accès non autorisé")
  });
}

export async function getProfile() {
  const token = store.getState().token.token
  return await fetch('http://localhost:3001/api/v1/user/profile', {
    headers: {
      'Authorization': `Bearer ${ token }`,
      'Content-Type': 'application/json'
    },
    method: "POST",
  }).then(res => {
    if (res.ok) return res.json()
    throw new Error("Accès non autorisé")
  });
}

export async function updateProfile(data = {}) {
  const token = store.getState().token.token
  return await fetch('http://localhost:3001/api/v1/user/profile', {
    headers: {
      'Authorization': `Bearer ${ token }`,
      'Content-Type': 'application/json'
    },
    method: "PUT",
    body: JSON.stringify(data)
  }).then(res => {
    if (res.ok) return res.json()
    throw new Error("Une erreur s'est produite")
  });
}