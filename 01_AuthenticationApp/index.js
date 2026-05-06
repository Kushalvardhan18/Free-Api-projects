const username = document.querySelector('.username')
const password = document.querySelector('.password')
const logInBtn = document.querySelector('.logIn')
const errorText = document.querySelector('.error');
const register = document.querySelector('.register')
logInBtn.addEventListener('click', handleLogIn)

async function handleLogIn(e) {
    e.preventDefault()
    const url = "https://api.freeapi.app/api/v1/users/login"
    const options = {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: JSON.stringify({ "password": password.value, "username": username.value })
    };
    if (!username.value || !password.value) {
        errorText.textContent = "All fields are required";
        return;
    }
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

register.addEventListener('click',()=>{
    window.location.href = "register.html"
})





