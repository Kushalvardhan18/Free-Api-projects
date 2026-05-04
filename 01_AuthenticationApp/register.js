const url = 'https://api.freeapi.app/api/v1/users/register';
const options = {
  method: 'POST',
  headers: {accept: 'application/json', 'content-type': 'application/json'},
  body: '{"email":"user.email@domain.com","password":"test@123","role":"ADMIN","username":"doejohn"}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}