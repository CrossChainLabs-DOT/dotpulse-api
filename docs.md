# DotPulse API

<a name="module_API"></a>

## API

* [API](#module_API)
    * [~get(query, view, predicate, res, log, single_line)](#module_API..get)
    * [~statistics(res)](#module_API..statistics)
    * [~commits(res)](#module_API..commits)
    * [~active_contributors(res)](#module_API..active_contributors)
    * [~recent_commits(res)](#module_API..recent_commits)
    * [~repositories(res)](#module_API..repositories)

<a name="module_API..get"></a>

### API~get(query, view, predicate, res, log, single_line)
Get the results of the query

**Kind**: inner method of [<code>API</code>](#module_API)  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | The query to run. |
| view | <code>string</code> | The view to run the query on. |
| predicate | <code>string</code> | The predicate of the query, ex : ORDER BY ... . |
| res | <code>object</code> | The response parameter of the API. |
| log | <code>string</code> | The log parameter of the API. |
| single_line | <code>boolean</code> | Specify if the response of the API is single line or an array. |

<a name="module_API..statistics"></a>

### API~statistics(res)
Statistics API
returns the overall number of commits, repositories, contributors, PRs

**Kind**: inner method of [<code>API</code>](#module_API)  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>object</code> | The response parameter of the API. |

<a name="module_API..commits"></a>

### API~commits(res)
Commits API
returns the total number of commits per month

**Kind**: inner method of [<code>API</code>](#module_API)  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>object</code> | The response parameter of the API. |

<a name="module_API..active_contributors"></a>

### API~active\_contributors(res)
Active Contributors API
returns the number of active developers for each month over the last year

**Kind**: inner method of [<code>API</code>](#module_API)  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>object</code> | The response parameter of the API. |

<a name="module_API..recent_commits"></a>

### API~recent\_commits(res)
Recent commits API
returns the list of recent commits across all Polkadot repositories over the last 30 days

**Kind**: inner method of [<code>API</code>](#module_API)  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>object</code> | The response parameter of the API. |

<a name="module_API..repositories"></a>

### API~repositories(res)
Repositories API
returns  returns the number of repositories for each month over the last year

**Kind**: inner method of [<code>API</code>](#module_API)  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>object</code> | The response parameter of the API. |


* * *

&copy; 2022 CrossChain Labs