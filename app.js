import Fetcher from "./fetch.js";

const app = Fetcher.create({
  baseUrl: "https://jsonplaceholder.typicode.com",
  header: {
    "content-type": "application/json",
  },
});

// //get call
// // app
// //   .get("https://jsonplaceholder.typicode.com/todos", {
// //     "content-type": "application/json",
// //     "x-user-id": "1",
// //   })
// //   .then((response) => response.json())
// //   .then((json) => console.log(json));

// //post call
// // app
// //   .post(
// //     "https://jsonplaceholder.typicode.com/todos",
// //     {},
// //     {
// //       userId: 1,
// //       title: "test todos",
// //       completed: false,
// //     }
// //   )
// //   .then((response) => response.json())
// //   .then((json) => console.log(json));

// //put call
// // app
// //   .put(
// //     "https://jsonplaceholder.typicode.com/todos/95",
// //     {},
// //     {
// //       userId: 5,
// //       title: "edited - title",
// //       completed: false,
// //     }
// //   )
// //   .then((response) => response.json())
// //   .then((json) => console.log(json));

// // app
// //   .get("https://jsonplaceholder.typicode.com/todos/95")
// //   .then((response) => response.json())
// //   .then((json) => console.log(json));

// app.addRequestInterceptor(
//   (config) => {
//     console.log("Inside request Interceptor", config);

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// app.addResponseInterceptor(
//   (config) => {
//     console.log("Inside response Interceptor", config);
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// //get timeout call
app
  .get("/todos/95", {
    "content-type": "application/json",
    "x-user-id": "1",
    timeout: 1000,
  })
  .then((response) => response.json())
  .then((json) => console.log(json));
