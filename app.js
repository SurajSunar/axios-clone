import Fetcher from "./fetch.js";

const app = Fetcher.create({
  header: {
    timeout: 1000,
    "content-type": "application/json",
  },
});

app
  .get("https://jsonplaceholder.typicode.com/todos", {
    "content-type": "application/json",
    "x-user-id": "1",
  })
  .then((response) => response.json())
  .then((json) => console.log(json));
