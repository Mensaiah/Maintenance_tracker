const alert = document.querySelector(".alert");

const fetchAPI = new FetchAPI();


 fetchAPI.get("/auth/signin", ({data,status}) => {
        if(status === 400){
          showError(alert, data.msg);
          
        }else if (status === 200) {
          
          localStorage.userId = data[0].user_uid
    fetchAPI.get("/requests", ({ data, status }) => {
  if (status === 400) {
    showError(alert, data.msg);
  } else if (status === 200) {
   
    data.find((element) => {
      if(element.status === 'Pending' ){
        console.log(element);
        
        return element.title
      }
    })
  }

    })
        }
});
