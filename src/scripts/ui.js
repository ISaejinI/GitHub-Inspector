import { format } from 'timeago.js';
//Empty lists
export function flushUsersList() {
    const usersList = document.getElementById('users_list');
    usersList.innerHTML = `
        <div id="users_loader" class="hide">Loading...</div>
        <p class="lighter">No users to display</p>
    `;
}

export function flushUserDetails() {
    const userCard = document.getElementById('user_card');
    userCard.innerHTML = `
        <div id="user_loader" class="hide">Loading...</div>
        <p class="lighter">No user selected</p>
    `;

    const userRepos = document.getElementById('user_repos');
    userRepos.innerHTML = `
        <div id="repos_loader" class="hide">Loading...</div>
        <p class="lighter">No repositories to display</p>
    `;
}

export function flushCommits() {
    const commitsList = document.getElementById('repo_info');
    commitsList.innerHTML = `
        <div id="repo_loader" class="hide">Loading...</div>
        <p class="lighter">No repository selected</p>
    `;
}

//Display and hide loaders
export function displayLoader(id) {
    if (!id) return;
    const el = document.getElementById(id);
    if (el && el.classList) el.classList.remove('hide');
}

export function hideLoader(id) {
    if (!id) return;
    const el = document.getElementById(id);
    if (el && el.classList) el.classList.add('hide');
}

//Display results
export function displayUsers(users) {
    const usersList = document.getElementById('users_list');

    if (typeof users === 'string') {
        usersList.innerHTML = `<p class="error_message">${users}</p>`;
        return;
    }

    const usersResult = users.items;
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
}

export function displayUserCard(user) {
    const userCard = document.getElementById('user_card');
    if (typeof user === 'string') {
        userCard.innerHTML = `<p class="error_message">${user}</p>`;
        return;
    }

    userCard.innerHTML = `
        <div id="user_loader" class="hide">Loading...</div>
        <div class="user_card_header">
            <img src="${user.avatar_url}" alt="${user.login}'s Avatar" class="user_card_avatar">
            <div class="user_card_names">
                <h3 class="user_card_name">${user.name ? user.name : user.login}</h3>
                <p class="user_card_username lighter">@${user.login}</p>
            </div>
        </div>
        <div class="user_card_body">
            <p class="user_card_bio">${user.bio ? user.bio : 'No bio available.'}</p>
            <p class="user_card_location">${user.location ? user.location : 'Location not specified.'}</p>
            <p class="user_card_stats">Followers: ${user.followers} | Following: ${user.following} | Public Repos: ${user.public_repos}</p>
        </div>
    `;
}

export function displayUserRepos(repos) {
    const userRepos = document.getElementById('user_repos');
    if (typeof repos === 'string') {
        userRepos.innerHTML += `<p class="error_message">${repos}</p>`;
        return;
    }

    userRepos.innerHTML = '<div id="repos_loader" class="hide">Loading...</div>';
    repos.forEach(repo => {
        userRepos.innerHTML += `
            <div class="repo">
                <h4 class="repo_name">${repo.name}</h4>
                <p>Updated ${format(repo.updated_at)}</p>
            </div>
        `;
    });
}

export function displayRepoCommits(commits, formatDate) {
    const commitsList = document.getElementById('repo_info');
    if (typeof commits === 'string') {
        userCard.innerHTML += `<p class="error_message">${commits}</p>`;
        return;
    }

    commitsList.innerHTML = '<div id="repo_loader" class="hide">Loading...</div>';
    commits.forEach(commit => {
        commitsList.innerHTML += `
            <div class="commit">
                <p class="commit_message">${commit.commit.message}</p>
                <p class="commit_author lighter">Author: ${commit.commit.author.name} | Date: ${format(commit.commit.author.date)}</p>
            </div>
        `;
    });
}