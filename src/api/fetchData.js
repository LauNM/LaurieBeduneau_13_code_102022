export async function getToken(url = '', data = {}) {
  return await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(data)
  }).then(res => res.json());
}

export async function getUser(url = '', token = '') {
  return await fetch(url, {
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: "POST",
  }).then(res => res.json());
}