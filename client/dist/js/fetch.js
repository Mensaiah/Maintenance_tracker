const header = {
  "Content-type": "application/json",
  "x-auth-token": localStorage.token
};

// class Fetch {
//   async get(url, cbFunction) {
//     try {
//       this.url = url;
//       const response = await fetch(url, {
//         method: "GET",
//         headers: header
//       });

//       return {
//         data: response.json(),
//         status: response.status
//       };
//     } catch (error) {
//       console.log(error);
//     }
//     cbFunction();
//     return
//   }
// }
