/** @module API **/

const config = require("./config");
const { INFO, ERROR } = require("./logs");
const { Pool } = require("pg");

const pool = new Pool(config.database);

function errorResponse(code, msg, res) {
  res.status(code).send(msg);
}

/**
 * Get the results of a query
 * @param {string} query - the query to run
 * @param {string} view - the view to run the query on
 * @param {string} predicate - the predicate of the query, ex : ORDER BY ... 
 * @param {object} res - the response parameter of the API
 * @param {string} log - the log parameter of the API
 * @param {boolean} single_line - specify if the response of the API is a single line or an array
 */
const get = async function (query, view, predicate, res, log, single_line) {
  try {
    var result;
    if (predicate) {
      result = await pool.query(`SELECT ${query} FROM ${view} ${predicate};`);
    } else {
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
      ERROR(
        `GET[${log} ${query} on ${view}]: Failed, result: ${JSON.stringify(
          result.rows
        )}`
      );
      errorResponse(402, `Failed to get ${log}`, res);
    }
  } catch (e) {
    ERROR(`get[${log} ${query} on ${view}]: error: ${e}`);
    errorResponse(401, `failed to get ${log}`, res);
  }
};

/**
 * Statistics API
 * returns the overall number of commits, repositories, contributors and PRs
 * @param {object} res - the parameter that has the return result of the API
 */
const statistics = async function (req, res, next) {
  await get("*", "overview_view", "", res, "statistics", true);
};

/***
 * Contributors API
 * returns the list of contributors of the month based on the number of commits over the last month
 * @param {object} res - the parameter that has the return result of the API
 */
const topContributors = async function (req, res, next) {
  await get(
    "*",
    "top_contributors_view",
    "ORDER BY contributions DESC",
    res,
    "topContributors",
    false
  );
};

/**
 * Commits API
 * returns the total number of commits per month
 * @param {object} res - the parameter that has the return result of the API
 */
const commits = async function (req, res, next) {
  await get(
    "*",
    "commits_view",
    "ORDER BY commit_month",
    res,
    "commits",
    false
  );
};

/**
 * Active Contributors API
 * returns the number of active developers for each month over the last year
 * @param {object} res - the parameter that has the return result of the API
 */
const activeContributors = async function (req, res, next) {
  await get(
    "*",
    "active_contributors_view",
    "ORDER BY month",
    res,
    "activeContributors",
    false
  );
};

/**
 * Recent commits API
 * returns the list of recent commits across all Polkadot repositories over the last 30 days
 * @param {object} res - the parameter that has the return result of the API
 */
const recentCommits = async function (req, res, next) {
  await get(
    "*",
    "recent_commits_view",
    "ORDER BY commit_date DESC LIMIT 1000",
    res,
    "recentCommits",
    false
  );
};

/**
 * Repositories API
 * returns the number of repositories for each month over the last year
 * @param {object} res - the response parameter of the API.
 */
const repositories = async function (req, res, next) {
  await get(
    "*",
    "repositories_view",
    "ORDER BY month",
    res,
    "repositories",
    false
  );
};

/**
 * Activity API
 * returns the number of active developers and active repositories for each month over the last year
 * @param {object} res - the parameter that has the return result of the API
 */
 const activity = async function (req, res, next) {
  await get(
    "*",
    "activity_view",
    "ORDER BY month",
    res,
    "activity",
    false
  );
};

module.exports = {
  statistics,
  topContributors,
  commits,
  activeContributors,
  recentCommits,
  repositories,
  activity,
};
