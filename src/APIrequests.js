export default class APIrequest {
    constructor() {
        this.myToken = import.meta.env.VITE_GITHUB_TOKEN;
        this.parameters = '';

        this.init();
    };

    init() {
        this.setParameters();
    };

    setParameters() {
        this.parameters = {
            headers: {
                Authorization: `token ${this.myToken}`,
            },
        };
    };

    async getResult(url, idLoader) {
        try {
            this.displayLoader(idLoader);
            const response = await fetch(url, {...this.parameters});
            const data = await response.json();
            this.hideLoader(idLoader);
            return data;
        } catch (error) {
            console.error('Error: ', error);
            return 'An error occurred while fetching data from GitHub API.';
        }
    };

    async getSearchResults(username) {
        const url = `https://api.github.com/search/users?q=${username}`;
        return await this.getResult(url, 'users_loader');
    };

    async getUserDetails(username) {
        const url = `https://api.github.com/users/${username}`;
        return await this.getResult(url);
    };

    async getUserRepos(username) {
        const url = `https://api.github.com/users/${username}/repos`;
        return await this.getResult(url);
    };

    async getRepoCommits(username, repo) {
        const url = `https://api.github.com/repos/${username}/${repo}/commits`;
        return await this.getResult(url);
    };

    displayLoader(id) {
        if (!id) return;
        const el = document.getElementById(id);
        if (el && el.classList) el.classList.remove('hide');
    }

    hideLoader(id) {
        if (!id) return;
        const el = document.getElementById(id);
        if (el && el.classList) el.classList.add('hide');
    }
}