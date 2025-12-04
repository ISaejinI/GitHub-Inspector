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

    async getResult(url) {
        try {
            const response = await fetch(url, {...this.parameters});
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    async getSearchResults(username) {
        const url = `https://api.github.com/search/users?q=${username}`;
        // retourne aussi le status (pending, fulfilled, rejected)
        return await this.getResult(url);
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
        // Afficher le loader
        document.getElementById(id).classList.remove('hide');
    }

    hideLoader(id) {
        // Cacher le loader
        document.getElementById(id).classList.add('hide');
    }
}