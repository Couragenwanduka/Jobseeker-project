const postJobForm= document.getElementById('formData')
const message= document.getElementById('message');

postJobForm.addEventListener('submit',async(event)=>{

    event.preventDefault();
    const formdata=new FormData(postJobForm)
    const data={}
    formdata.forEach((value,key)=>{
        data[key]=value
    })
    try{
       const response= await fetch('/jobs',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
       });
       if(response.ok){
        message.textContent =response.message;
        postJobForm.reset();
       }else{
        message.textContent = response.message;
       }

    }catch(error){
        console.error('Error:', error);
            message.textContent = 'An error occurred while processing your request.';
    }
})