
    document.getElementById('question-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect input values
        const username = 'CharlieBrown'; // Replace with dynamic value if needed
        const collegeName = 'California Institute of Technology'; // Replace with dynamic value if needed
        const question = document.querySelector('#question-input').value;

        // Prepare data to send
        const data = {
            username: username,
            college: collegeName,
            question: question
        };

        // Send data to the server
        fetch('http://localhost:3000/posts/p', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Specify the content type
            },
            body: JSON.stringify(data) // Convert data to JSON string
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Parse the JSON from the response
        })
        .then(data => {
            console.log('Success:', data);
            
            // Create a new post element
            const newPost = document.createElement('div');
            newPost.className = 'post';
            newPost.innerHTML = `
                <div class="post-header">
                    <div class="post-user-info">
                        <div class="post-username">${data.username}</div>
                        <div class="post-college">${data.college}</div>
                    </div>
                    <button class="post-follow">Follow</button>
                </div>
                <div class="post-question">${data.question}</div>
                <div class="post-actions">
                    <button><i class="fa fa-thumbs-up"></i><span>${data.upvotes || 0} Upvotes</span></button>
                    <button><i class="fa fa-thumbs-down"></i><span>${data.downvotes || 0} Downvotes</span></button>
                    <button><i class="fa fa-comment"></i><span>${data.comments || 0} Comments</span></button>
                </div>
                <div class="post-comments">
                    <input type="text" placeholder="Add a comment...">
                </div>
            `;

            // // Insert the new post after the last question in the content div
            // const contentDiv = document.querySelector('.content');
            // const lastPost = contentDiv.querySelector('.post:last-of-type'); // Select the last post
            // if (lastPost) {
            //     lastPost.insertAdjacentElement('afterend', newPost); // Insert after the last post
            // } else {
            //     contentDiv.appendChild(newPost); // If no posts exist, just append
            // }

            const questionForm = document.getElementById('question-form');
            questionForm.insertAdjacentElement('afterend', newPost);



            // Clear the input field
            document.getElementById('question-input').value = '';
        })
        .catch((error) => {
            console.error('Error:', error);
            // Optionally, you can show an error message to the user
        });
    });

