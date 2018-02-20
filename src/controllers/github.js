const Octokit = require('@octokit/rest');

const octokit = new Octokit();
let owner;
let repo;

let authenticate = (GITHUB_TOKEN) => {
    octokit.authenticate({
        type: 'oauth',
        token: process.env.GITHUB_TOKEN
    });
    owner = process.env.OWNER;
    repo = process.env.REPO;
    console.log(repo)
}

let getContributers = () => octokit.repos.getCollaborators({ owner: owner, repo: repo });

let getRepoIssues = () => octokit.issues.getForRepo({ owner: owner, repo: repo });

let getIssue = (issueNumber) => octokit.issues.get({ owner: owner, repo: repo, number: issueNumber });

let createIssue = (title,
    body,
    milestone,
    labels,
    assignees) => octokit.issues.create({
        owner: owner,
        repo: repo,
        title: title,
        body: body,
        milestone: milestone,
        labels: labels,
        assignees: assignees
    });

let editIssue = (
    issueNumber,
    state,
    title,
    body,
    milestone,
    labels,
    assignees) => {
    return octokit.issues.edit({
        owner: owner,
        repo: repo,
        number: issueNumber,
        title: title,
        state: state,
        body: body,
        milestone: milestone,
        labels: labels,
        assignees: assignees
    });
}

module.exports = {
    authenticate,
    getContributers,
    getRepoIssues,
    getIssue,
    createIssue,
    editIssue
}
