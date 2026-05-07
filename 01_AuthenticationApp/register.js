const form = document.getElementById("registerForm");

const errorText = document.querySelector(".error");
const successText = document.querySelector(".success");

form.addEventListener("submit", handleRegister);

async function handleRegister(e) {
  e.preventDefault();

  errorText.textContent = "";
  successText.textContent = "";

  const userData = {
    email: form.email.value,
    password: form.password.value,
    role: form.role.value,
    username: form.username.value,
  };

  try {
    const response = await fetch(
      "https://api.freeapi.app/api/v1/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    successText.textContent = "User registered successfully";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);

  } catch (error) {
    errorText.textContent = error.message;
  }
}