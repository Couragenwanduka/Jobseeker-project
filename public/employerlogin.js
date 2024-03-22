document.addEventListener('DOMContentLoaded',()=>{
    const signupform = document.getElementById('signupForm');
    const message = document.getElementById('message');
    signupform.addEventListener('submit',async(event)=>{
         event.preventDefault();
         const formData=  new FormData(signupform);
         const data={};
         formData.forEach((value, key)=>{
            data[key]=value;
         });
         try{
           const response= await fetch('/employer-login',{
             method:'POST',
             headers:{
               'Content-Type':'application/json'
             },
             body:JSON.stringify(data),
             
           });
          //  const responseData= await response.json();
           if(response.ok){
          //    message.textContent=responseData.message;
          //    console.log(responseData.message)
          window.location.href = 'jobs';
             signupform.reset();
           }else{
            const responseData= await response.json();
             message.textContent=responseData.message;
           }
    }catch(error){
        console.log(error);
    }
    })
})