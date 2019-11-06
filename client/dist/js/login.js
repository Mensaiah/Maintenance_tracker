const submit = document.getElementById("submit");

const fetchAPI = new FetchAPI();

submit.addEventListener("click", e => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const credentials = {
    username,
    password
  };

  fetchAPI.post("/auth/signin", credentials, ({ data, status }) => {
    if (status === 400) {
      if (data.msg) {
        showError(data.msg);
      } else if (data.errors[0].msg) {
        showError(data.errors[0].msg);
      }
    }
    if (status === 200) {
      localStorage.token = data.token;
     
      location.href = "dashboard.html";
    }
  });
});
