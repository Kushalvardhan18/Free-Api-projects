const form = document.getElementById("loginForm");

const username = document.querySelector(".username");
const password = document.querySelector(".password");

const errorText = document.querySelector(".error");
const successText = document.querySelector(".success");

const registerBtn = document.getElementById("registerBtn");

form.addEventListener("submit", handleLogin);

async function handleLogin(e) {
  e.preventDefault();

  errorText.textContent = "";
  successText.textContent = "";

  if (!username.value || !password.value) {
    errorText.textContent = "All fields are required";
    return;
  }

  try {
    const response = await fetch(
      "https://api.freeapi.app/api/v1/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("token", data.data.accessToken);

    successText.textContent = "Login successful";

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);

  } catch (error) {
    errorText.textContent = error.message;
  }
}

registerBtn.addEventListener("click", () => {
  window.location.href = "register.html";
});