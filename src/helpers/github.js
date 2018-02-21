const Octokit = require('@octokit/rest');

const octokit = new Octokit();
let owner = process.env.OWNER;
let repo = process.env.REPO;

// API key and access token 
process.env.GITHUB_TOKEN
    ? octokit.authenticate({
        type: 'oauth',
        token: process.env.GITHUB_TOKEN
    })
    : console.error('GITHUB oauth token not found');

let getContributers = () => octokit.repos.getCollaborators({ owner: owner, repo: repo });

let getRepoIssues = () => octokit.issues.getForRepo({ owner: owner, repo: repo });

let getIssue = (issueNumber) => octokit.issues.get({ owner: owner, repo: repo, number: issueNumber });

let createIssue = (title, body, milestone, labels, assignees) => octokit.issues.create({
    owner: owner,
    repo: repo,
    title: title,
    body: body,
    milestone: milestone,
    labels: labels,
    assignees: assignees
});

let editIssue = (issueNumber, state, title, body, milestone, labels, assignees) => {
    let options = {
        owner: owner,
        repo: repo,
    };
    Object.assign(options,
        issueNumber && { number: issueNumber, },
        title && { title: title, },
        body && { body: body, },
        milestone && { milestone: milestone, },
        labels && { labels: labels, },
        assignees && { assignees: assignees });
    return octokit.issues.edit(options);
}
module.exports = {
    getContributers,
    getRepoIssues,
    getIssue,
    createIssue,
    editIssue
}
