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


// Au clic du bouton de recherche, récupérer la valeur de l'input et lancer la recherche


document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search_form');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const searchInput = document.getElementById('searchBar');
        const username = searchInput.value.trim();

        if (username) {
            const results = await new APIrequests().getSearchResults(username);
            console.log(results.items);

            const usersResult = results.items;
            const numberResults = usersResult.length;

            // Afficher le nombre de résultats
            const counter = document.getElementById('users_number');
            counter.textContent = numberResults;
            document.getElementById('users_result_count').classList.remove('hide');

            const usersList = document.getElementById('users_list');
            usersList.innerHTML = '<div id="users_loader" class="hide">Loading...</div>';

            usersResult.forEach(user => {
                usersList.innerHTML += `
                <div class="user">
                    <img src="${user.avatar_url}" alt="User Avatar" class="user_avatar">
                    <div class="user_username">
                        <p class="user_name">${user.login}</p>
                        <p class="user_id lighter">@${user.id}</p>
                    </div>
                </div>
                `;
            });
        }
    });
});

