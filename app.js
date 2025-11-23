import Fetcher from "./fetch.js";

const app = Fetcher.create({
  header: {
    timeout: 1000,
    "content-type": "application/json",
  },
});

//get call
// app
//   .get("https://jsonplaceholder.typicode.com/todos", {
//     "content-type": "application/json",
//     "x-user-id": "1",
//   })
//   .then((response) => response.json())
//   .then((json) => console.log(json));

//post call
// app
//   .post(
//     "https://jsonplaceholder.typicode.com/todos",
//     {},
//     {
//       userId: 1,
//       title: "test todos",
//       completed: false,
//     }
//   )
//   .then((response) => response.json())
//   .then((json) => console.log(json));

//put call
app
  .put(
    "https://jsonplaceholder.typicode.com/todos/95",
    {},
    {
      userId: 5,
      title: "edited - title",
      completed: false,
    }
  )
  .then((response) => response.json())
  .then((json) => console.log(json));

app
  .get("https://jsonplaceholder.typicode.com/todos/95")
  .then((response) => response.json())
  .then((json) => console.log(json));
