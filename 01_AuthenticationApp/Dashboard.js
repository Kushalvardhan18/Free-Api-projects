const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "index.html";
}

const username = document.getElementById("username");
const email = document.getElementById("email");
const role = document.getElementById("role");

const logoutBtn = document.getElementById("logoutBtn");

async function getCurrentUser() {
  try {
    const response = await fetch(
      "https://api.freeapi.app/api/v1/users/current-user",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      }
    );

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch user");
    }

    username.textContent = data.data.username;
    email.textContent = data.data.email;
    role.textContent = data.data.role;

  } catch (error) {
    console.error(error);
  }
}

getCurrentUser();

logoutBtn.addEventListener("click", async () => {
  try {
    await fetch("https://api.freeapi.app/api/v1/users/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    });

    localStorage.removeItem("token");

    window.location.href = "index.html";

  } catch (error) {
    console.error(error);
  }
});