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

                // Display selected user's information
                const userResults = await new APIrequests().getUserDetails(username);
                if (typeof userResults === 'string') {
                    usersList.innerHTML = `<p class="error_message">${userResults}</p>`;
                    return;
                }

                const userCard = document.getElementById('user_card');
                userCard.innerHTML = `
                    <div id="user_loader" class="hide">Loading...</div>
                    <div class="user_card_header">
                        <img src="${userResults.avatar_url}" alt="${userResults.login}'s Avatar" class="user_card_avatar">
                        <div class="user_card_names">
                            <h3 class="user_card_name">${userResults.name ? userResults.name : userResults.login}</h3>
                            <p class="user_card_username lighter">@${userResults.login}</p>
                        </div>
                    </div>
                    <div class="user_card_body">
                        <p class="user_card_bio">${userResults.bio ? userResults.bio : 'No bio available.'}</p>
                        <p class="user_card_location">${userResults.location ? userResults.location : 'Location not specified.'}</p>
                        <p class="user_card_stats">Followers: ${userResults.followers} | Following: ${userResults.following} | Public Repos: ${userResults.public_repos}</p>
                    </div>
                `;

                // Display selected user's repositories
                const reposResults = await new APIrequests().getUserRepos(username);
                if (typeof reposResults === 'string') {
                    userCard.innerHTML += `<p class="error_message">${reposResults}</p>`;
                    return;
                }

                console.log(reposResults);
                const userRepos = document.getElementById('user_repos');
                userRepos.innerHTML = '<div id="repos_loader" class="hide">Loading...</div>';
                reposResults.forEach(repo => {
                    userRepos.innerHTML += `
                    <div class="repo">
                        <h4 class="repo_name">${repo.name}</h4>
                        <p>Updated ${repo.updated_at} ago</p>
                    </div>
                    `;
                });


            });
        });
    }



});

