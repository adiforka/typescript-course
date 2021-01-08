// fetch 'succeeds' even if you get a response of 404 etc. it's only considered to be failing if there's a deeper network access error etc.

fetch(`https://jsonplaceholder.typicode.com/users`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    phone: "1-770-736-8031 x56442",
    username: "Bret",
    website: "hildegard.org",
  }),
})
  .then(res => {
    console.log(res.status);
    return res;
  })
  .then(res => console.log(res.json()))
  .catch(() => console.log("ERROR"));
