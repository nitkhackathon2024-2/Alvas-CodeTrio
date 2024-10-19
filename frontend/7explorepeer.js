fetch('http://localhost:3000/api/users/match-users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        fullName: "JohnDoe1",
            email: "johndo@example1.com",
            dob: "1995-08-15T00:00:00.000Z",
            location: "New York, USA",
            academicLevel: "Undergraduate",
            major: "Computer Science",
            learningPreferences: "Visual, Hands-on",
            learningGoals: "Master data structures and algorithms",
            collaborationStyle: "Team player, Open to feedback",
            availability: "Weekdays, 6 PM to 9 PM",
            bio: "Aspiring software developer passionate about AI and web development.",
            languagesSpoken: "English, Spanish",
            skills: "JavaScript, Python, Node.js, MongoDB"
    })
})
.then(response => {
    console.log('Response status:', response.status); // Check the status code
    return response.json();
})
.then(peers => {
    console.log('Fetched peers:', peers); // Log the fetched peers
    const contentDiv = document.querySelector('.profile-container');
    if (contentDiv) {
        let i=1;
        peers.forEach(peer => {
            
            peer.profilePicture=`img/(${i}).jpeg`;
            i++;
            const profileCard = `
                <div class="profile-card">
                    <div class="profile-banner"></div>
                    <img src="${peer.profilePicture}" alt="Profile Picture" class="profile-pic">
                    <h4>${peer.fullName}</h4>
                    <p>${peer.academicLevel} in ${peer.major}</p>
                    <button class="connect-button">Connect</button>
                </div>
            `;
            contentDiv.innerHTML += profileCard;
        });
    } else {
        console.error('Content div not found');
    }
})
.catch(error => {
    console.error('Error fetching peers:', error);
});
