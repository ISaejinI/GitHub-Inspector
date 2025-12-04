import './style.css';
import { format } from 'timeago.js';
import api from './scripts/APIrequests.js';
import { displayUserCard, displayUsers, flushUsersList, flushUserDetails, flushCommits, displayUserRepos, displayRepoCommits } from './scripts/ui.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search_form');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        flushUsersList();
        flushUserDetails();
        flushCommits();

        const searchInput = document.getElementById('searchBar');
        const username = searchInput.value.trim();

        if (username) {
            const results = await api.getSearchResults(username);
            displayUsers(results);
            addListenersToUsers();
        }
    });

    function addListenersToUsers() {
        const users = document.querySelectorAll('.user');
        users.forEach(user => {
            user.addEventListener('click', async (e) => {
                users.forEach(u => u.classList.remove('selected'));
                e.currentTarget.classList.add('selected');

                flushUserDetails();
                flushCommits();

                const username = e.currentTarget.querySelector('.user_name').textContent;
                const userResults = await api.getUserDetails(username);
                displayUserCard(userResults);

                const reposResults = await api.getUserRepos(username);
                displayUserRepos(reposResults);

                addListenersToRepos();
                
            });
        });
    }

    function addListenersToRepos() {
        const repos = document.querySelectorAll('.repo');
        repos.forEach(repo => {
            repo.addEventListener('click', async (e) => {
                repos.forEach(u => u.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
                flushCommits();

                const repoName = e.currentTarget.querySelector('.repo_name').textContent;
                const username = document.querySelector('.user_card_username').textContent.slice(1);
                const repoCommits = await api.getRepoCommits(username, repoName);

                displayRepoCommits(repoCommits);
            })
        })
    }

});