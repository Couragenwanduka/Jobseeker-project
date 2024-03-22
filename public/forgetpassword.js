document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const message = document.getElementById('message');
    
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        // Get form data
        const formData = new FormData(signupForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        try {
            // Send POST request to /signin route
            const response = await fetch('/forgotpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // Check response status
            if (response.ok) {
                // Successful login
                // const responseData = await response.json();
                // message.textContent = responseData.message;
                // console.log(responseData.message);
                signupForm.reset();
                window.location.href = 'recoverpassword'; // Redirect to /Huddle page
            } else {
                // Handle error response
                const errorData = await response.json();
                message.textContent = errorData.message;
            }
        } catch (error) {
            // Handle network or server errors
            console.error('Error:', error);
            message.textContent = 'An error occurred while processing your request.';
        }
    });
});
