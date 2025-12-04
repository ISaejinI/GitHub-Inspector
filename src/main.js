import './style.css';
import APIrequests from './APIrequests.js';

new APIrequests();

console.log('GitHub Explorer');


// const results = await new APIrequests().getSearchResults('ISaejinI');
// console.log(results);

// const userDetails = await new APIrequests().getUserDetails('ISaejinI');
// console.log(userDetails);

// const userRepos = await new APIrequests().getUserRepos('ISaejinI');
// console.log(userRepos);

// const repoCommits = await new APIrequests().getRepoCommits('ISaejinI', 'GitHub-Inspector');
// console.log(repoCommits);

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search_form');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const searchInput = document.getElementById('searchBar');
        const username = searchInput.value.trim();
        const usersList = document.getElementById('users_list');

        if (username) {
            const results = await new APIrequests().getSearchResults(username);
            if (typeof results === 'string') {
                usersList.innerHTML = `<p class="error_message">${results}</p>`;
                return;
            }

            const usersResult = results.items;
            const numberResults = usersResult.length;
            const counter = document.getElementById('users_number');
            counter.textContent = numberResults;
            document.getElementById('users_result_count').classList.remove('hide');

            if (numberResults === 0) {
                usersList.innerHTML = '<p class="lighter">No users found.</p>';
                return;
            }


            usersList.innerHTML = '<div id="users_loader" class="hide">Loading...</div>';

            usersResult.forEach(user => {
                usersList.innerHTML += `
                <div class="user">
                    <img src="${user.avatar_url}" alt="${user.login}'s Avatar" class="user_avatar">
                    <div class="user_username">
                        <p class="user_name">${user.login}</p>
                        <p class="user_id lighter">@${user.id}</p>
                    </div>
                </div>
                `;
            });

            addListenersToUsers();
        }
    });




    function addListenersToUsers() {
        const users = document.querySelectorAll('.user');
        users.forEach(user => {
            user.addEventListener('click', async (e) => {
                users.forEach(u => u.classList.remove('selected'));
                e.currentTarget.classList.add('selected');

                const username = e.currentTarget.querySelector('.user_name').textContent;
                console.log(`User ${username} clicked.`);

                const results = await new APIrequests().getUserDetails(username);
                // console.log(results);
                if (typeof results === 'string') {
                    usersList.innerHTML = `<p class="error_message">${results}</p>`;
                    return;
                }

                const userCard = document.getElementById('user_card');
                userCard.innerHTML = `
                    <div id="user_loader" class="hide">Loading...</div>
                    <div class="user_card_header">
                        <img src="${results.avatar_url}" alt="${results.login}'s Avatar" class="user_card_avatar">
                        <div class="user_card_names">
                            <h3 class="user_card_name">${results.name ? results.name : results.login}</h3>
                            <p class="user_card_username lighter">@${results.login}</p>
                        </div>
                    </div>
                    <div class="user_card_body">
                        <p class="user_card_bio">${results.bio ? results.bio : 'No bio available.'}</p>
                        <p class="user_card_location">${results.location ? results.location : 'Location not specified.'}</p>
                        <p class="user_card_stats">Followers: ${results.followers} | Following: ${results.following} | Public Repos: ${results.public_repos}</p>
                    </div>
                `;

            });
        });
    }



});

