



    // Function to fetch posts and display them
    async function fetchPosts() {
        try {
            const response = await fetch('http://localhost:3000/posts/p'); // Replace with your actual server URL
            const posts = await response.json();
            const feedContainer = document.querySelector('.feed');

            // Loop through posts and create HTML elements
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <div class="post-header">
                        <div class="post-user-info">
                            <div class="post-username">${post.username}</div>
                            <div class="post-college">${post.college}</div>
                        </div>
                        <button class="post-follow">Follow</button>
                    </div>
                    <div class="post-question">${post.question}</div>
                    <div class="post-actions">
                        <button><i class="fa fa-thumbs-up"></i><span>${post.upvotes} Upvotes</span></button>
                        <button><i class="fa fa-thumbs-down"></i><span>${post.downvotes} Downvotes</span></button>
                        <button><i class="fa fa-comment"></i><span>${post.commentsCount} Comments</span></button>
                    </div>
                    <div class="post-comments">
                        <input type="text" placeholder="Add a comment...">
                    </div>
                `;
                feedContainer.append(postElement);
                // feedContainer.appendChild(postElement); // Append new posts to the feed
            });
        } catch (error) {
            console.error('Error fetching posts:', error); // Handle any errors
        }
    }

    // Fetch posts when the page loads
    window.onload = fetchPosts;

const followButtons = document.querySelectorAll('.post-follow');

followButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Check if the button's text is "Follow"
        if (button.textContent === "Follow") {
            // Reset all buttons to "Follow"
            followButtons.forEach(btn => btn.textContent = "Follow");
            
            // Change the clicked button to "Following"
            button.textContent = "Following";
        }
    });
});
