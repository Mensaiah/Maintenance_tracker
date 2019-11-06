const header = {
  'Content-type': 'application/json',
  'x-auth-token': localStorage.token
};
const BASE_URL = !process.env.NODE_ENV
  ? 'http://localhost:5000/api/v1/users'
  : process.env.BASE_URL;

class FetchAPI {
  // HTTP GET Request
  async get(url, cbFunction) {
    this.url = url;

    const response = await fetch(BASE_URL + url, {
      method: 'GET',
      headers: header,
      mode: 'cors'
    });

    const data = await response.json();
    const status = await response.status;
    cbFunction({ data, status });
  }

  // HTTP Post Request
  async post(url, body, cbFunction) {
    this.url = url;
    this.body = body;

    const response = await fetch(BASE_URL + url, {
      method: 'POST',
      headers: header,
      mode: 'cors',
      body: JSON.stringify(body)
    });

    const data = await response.json();
    const status = await response.status;
    cbFunction({ data, status });
  }

  // HTTP PUT Request
  async put(url, body, cbFunction) {
    this.url = url;
    this.body = body;

    const response = await fetch(BASE_URL + url, {
      method: 'PUT',
      headers: header,
      mode: 'cors',
      body: JSON.stringify(body)
    });

    const data = await response.json();
    const status = await response.status;
    cbFunction({ data, status });
  }

  async delete(url, cbFunction) {
    this.url = url;

    const response = await fetch(BASE_URL + url, {
      method: 'DELETE',
      headers: header
    });

    const data = await response.json();
    const status = await response.status;
    cbFunction({ data, status });
  }
}

module.exports FetchAPI