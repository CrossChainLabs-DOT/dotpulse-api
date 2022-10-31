/** @module API **/

const config = require('./config');
const { INFO, ERROR } = require('./logs');
const { Pool } = require("pg");

const pool = new Pool(config.database);

function error_response(code, msg, res) {
    res.status(code).send(msg);
}

/**
 * Get the results of the query
 * @param {string} query - The query to run.
 * @param {string} view - The view to run the query on.
 * @param {string} predicate - The predicate of the query, ex : ORDER BY ... .
 * @param {object} res - The response parameter of the API.
 * @param {string} log - The log parameter of the API.
 * @param {boolean} single_line - Specify if the response of the API is single line or an array.
 */
const get = async function (query, view, predicate, res, log, single_line) {
    try {
        var result;
        if (predicate) {
            result = await pool.query(`SELECT ${query} FROM ${view} ${predicate};`);
        } else
        {
            result = await pool.query(`SELECT ${query} FROM ${view};`);
        }

        if (result.rows.length) {
            INFO(`GET[${log}]: ${JSON.stringify(result.rows.length)} results`);

            if (single_line) {
                res.json(result.rows[0]);
            } else {
                res.json(result.rows);
            }
        } else {
            ERROR(`GET[${log} ${query} on ${view}]: Failed, result: ${JSON.stringify(result.rows)}`);
            error_response(402, `Failed to get ${log}`, res);
        }

    } catch (e) {
        ERROR(`GET[${log} ${query} on ${view}]: error: ${e}`);
        error_response(401, `Failed to get ${log}`, res);
    }
};

/**
 * Statistics API
 * returns the overall number of commits, repositories, contributors, PRs 
 * @param {object} res - The response parameter of the API.
 */
const statistics = async function (req, res, next) {
    await  get('*', 'overview_view', '', res, 'statistics', true);
};

/***
 * Contributors API
 * returns the list of contributors of the month based on the number of commits over the last month
 * @param {object} res - The response parameter of the API.
 */
const top_contributors = async function (req, res, next) {
    await  get('*', 'top_contributors_view', 'ORDER BY contributions DESC', res, 'top_contributors', false);
};


/**
 * Commits API
 * returns the total number of commits per month 
 * @param {object} res - The response parameter of the API.
 */
const commits = async function (req, res, next) {
    await  get('*', 'commits_view', 'ORDER BY commit_month', res, 'commits', false);
};

/**
 * Active Contributors API
 * returns the number of active developers for each month over the last year
 * @param {object} res - The response parameter of the API.
 */
const active_contributors = async function (req, res, next) {
    await  get('*', 'active_contributors_view', 'ORDER BY month', res, 'active_contributors', false);
};

/**
 * Recent commits API
 * returns the list of recent commits across all Polkadot repositories over the last 30 days  
 * @param {object} res - The response parameter of the API.
 */
const recent_commits = async function (req, res, next) {
    await  get('*', 'recent_commits_view', 'ORDER BY commit_date DESC', res, 'recent_commits', false);
};

/**
 * Repositories API
 * returns  returns the number of repositories for each month over the last year  
 * @param {object} res - The response parameter of the API.
 */
const repositories = async function (req, res, next) {
    await get('*', 'repositories_view',   'ORDER BY month', res, 'repositories', false);
};

module.exports = {
    statistics,
    top_contributors,
    commits,
    active_contributors,
    recent_commits,
    repositories
}