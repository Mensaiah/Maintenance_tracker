const header = {
  "Content-type": "application/json",
  "x-auth-token": localStorage.token
};

class Fetch {
  // HTTP GET Request
  async get(url, cbFunction) {
    try {
      this.url = url;
      const response = await fetch(url, {
        method: "GET",
        headers: header
      });
      return {
        data: await response.json(),
        status: await response.status
      };
    } catch (error) {
      console.log(error);
    }
    cbFunction();
  }

  // HTTP Post Request
  async post(url, data, cbFunction) {
    try {
      this.url = url;
      this.data = data;
      const response = await fetch(url, {
        method: "POST",
        headers: header,
        data: JSON.stringify(data)
      });
      return {
        data: await response.json(),
        status: await response.status
      };
    } catch (error) {
      console.log(error);
    }
    cbFunction();
  }

  async put(url, data, cbFunction) {
    try {
      this.url = url;
      this.data = data;
      const response = await fetch(url, {
        method: "PuT",
        headers: header,
        data: JSON.stringify(data)
      });
      return {
        data: await response.json(),
        status: await response.status
      };
    } catch (error) {
      console.log(error);
    }
    cbFunction();
  }

  async delete(url, cbFunction) {
    try {
      this.url = url;

      const response = await fetch(url, {
        method: "PUT",
        headers: header
      });
      return {
        data: await response.json(),
        status: await response.status
      };
    } catch (error) {
      console.log(error);
    }
    cbFunction();
  }
}
