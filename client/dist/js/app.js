function showError(message) {
  const alert = document.querySelector(".alert");
  alert.innerHTML = message;
  alert.hidden = false;
  setTimeout(() => {
    alert.hidden = true;
  }, 2000);
}
