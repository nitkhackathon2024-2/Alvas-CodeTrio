document.addEventListener('DOMContentLoaded', () => { 
    const form = document.querySelector('form');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            dob: document.getElementById('dob').value,
            location: document.getElementById('location').value,
            academicLevel: document.getElementById('academicLevel').value,
            major: document.getElementById('major').value,
            learningPreferences: document.getElementById('learningPreferences').value,
            learningGoals: document.getElementById('learningGoals').value,
            collaborationStyle: document.getElementById('collaborationStyle').value,
            availability: document.getElementById('availability').value,
            profilePicture: document.getElementById('profilePicture').value,
            bio: document.getElementById('bio').value,
            languagesSpoken: document.getElementById('languagesSpoken').value,
            skills: document.getElementById('skills').value // Assuming skills is a comma-separated string
        };

        console.log('Form data to be sent:', JSON.stringify(formData));

        try {
            // Send form data to the server
            const response = await fetch('http://localhost:3000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Handle JSON parsing safely
            const contentType = response.headers.get('Content-Type');
            if (response.ok && contentType && contentType.includes('application/json')) {
                const responseData = await response.json();
                // Handle successful registration
                alert('Registration successful!');
                window.location.href = '7home.html'; // Corrected redirect path
            } else {
                // Handle server errors or non-JSON response
                const errorText = await response.text();
                alert('Registration failed: ' + errorText);
            }
        } catch (error) {
            // Handle network errors
            alert('Network error: ' + error.message);
        }
    });
});



