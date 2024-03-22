document.addEventListener('DOMContentLoaded', async () => {
    const jobListings = document.getElementById('jobListings');
    try {
        // Fetch job data from the server
        const response = await fetch('/displayJob', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const { job } = await response.json(); // Destructure the job array from the response

        // Clear previous listings
        jobListings.innerHTML = '';

        // Display the fetched job listings
        job.forEach(job => { // Access the job array
            // Create job listing HTML elements
            console.log(job);
            const jobDiv = document.createElement('div');
            jobDiv.classList.add('job');
            jobDiv.innerHTML = `
                <h2>${job.title}</h2>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Description:</strong> ${job.description}</p>
                <!-- Add more job details as needed -->
            `;
            const apply = document.createElement('button');
            apply.classList.add('apply');
            apply.innerHTML = 'Apply';
            apply.addEventListener('click', () => {
                openModal(job);
                modal.style.display = 'block'; // Open the modal
            });
            jobListings.appendChild(jobDiv);
            jobDiv.appendChild(apply);
        });
    } catch (error) {
        console.log(error);
    }
    const modal = document.getElementById('myModal');
    
    const openModal = (job) => {
        // Get the modal
       
        const myModal = document.getElementById('jobApplicationForm');
        const message = document.getElementById('message');

        myModal.addEventListener('submit', async(event) => {
            event.preventDefault();
            const formData = new FormData(myModal);
            const application = {};
            formData.forEach((value, key) => {
                application[key] = value;
            });
            const id = job.company;
            try {
                const response = await fetch(`/displayJob`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(application)
                });
                const { message: responseMessage } = await response.json(); // Destructure the message from the response
                message.textContent = responseMessage; // Display the response message
            } catch (error) {
                console.log(error);
                message.textContent = 'An error occurred while processing your request.';
            }
        });

        // When the user clicks on <span> (x), close the modal
        document.querySelector('.close').addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // When the user clicks anywhere outside of the modal, close it
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    };
});
