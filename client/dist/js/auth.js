const newUserLinks = ["login.html", "index.html", "register.html"];

const IsNewUserLink = newUserLinks.some(element =>
  location.href.endsWith(element)
);

if (IsNewUserLink && localStorage.token) {
  location.href = "dashboard.html";
}
