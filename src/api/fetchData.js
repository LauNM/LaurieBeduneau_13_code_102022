export async function getUser(url = '', data = {}) {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(data) 
    }).then(res => res.json());
    return response; 
  }