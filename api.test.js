jest.mock("pg");
const { response } = require("express");
const { Pool } = require("pg");

jest.mock("pg", () => {
  const mPool = {
    connect: function () {
      return { query: jest.fn() };
    },
    query: jest.fn(),
    end: jest.fn(),
    on: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

const mockRequest = (sessionData, body) => ({
  session: { data: sessionData },
  body,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const {
  statistics,
  topContributors,
  commits,
  activeContributors,
  recentCommits,
  repositories,
  activity,
} = require("./api");

describe("API", () => {
  let pool;

  beforeEach(() => {
    pool = new Pool();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("statistics", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          commits: "100000",
          repos: "300",
          contributors: "2000",
          prs: "25000",
          issues_open: "250",
          issues_closed: "40000",
        },
      ],
    });

    const req = mockRequest();
    const res = mockResponse();

    await statistics(req, res);

    expect(res.json).toHaveBeenCalledWith({
      commits: "100000",
      repos: "300",
      contributors: "2000",
      prs: "25000",
      issues_open: "250",
      issues_closed: "40000",
    });
  });

  test("topContributors", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          dev_name: "dev_name1",
          avatar_url: "avatar_url1",
          contributions: "100",
        },
        {
          dev_name: "dev_name2",
          avatar_url: "avatar_url2",
          contributions: "200",
        },
        {
          dev_name: "dev_name3",
          avatar_url: "avatar_url3",
          contributions: "300",
        },
        {
          dev_name: "dev_name4",
          avatar_url: "avatar_url4",
          contributions: "400",
        },
        {
          dev_name: "dev_name5",
          avatar_url: "avatar_url5",
          contributions: "500",
        },
      ],
    });

    const req = mockRequest();
    const res = mockResponse();

    await topContributors(req, res);

    expect(res.json).toHaveBeenCalledWith([
      {
        dev_name: "dev_name1",
        avatar_url: "avatar_url1",
        contributions: "100",
      },
      {
        dev_name: "dev_name2",
        avatar_url: "avatar_url2",
        contributions: "200",
      },
      {
        dev_name: "dev_name3",
        avatar_url: "avatar_url3",
        contributions: "300",
      },
      {
        dev_name: "dev_name4",
        avatar_url: "avatar_url4",
        contributions: "400",
      },
      {
        dev_name: "dev_name5",
        avatar_url: "avatar_url5",
        contributions: "500",
      },
    ]);
  });

  test("commits", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          commits: "1900",
          commit_month: "2021-06-01T00:00:00.000Z",
          display_month: "Jun 21",
        },
        {
          commits: "2500",
          commit_month: "2021-07-01T00:00:00.000Z",
          display_month: "Jul 21",
        },
        {
          commits: "2000",
          commit_month: "2021-08-01T00:00:00.000Z",
          display_month: "Aug 21",
        },
        {
          commits: "1600",
          commit_month: "2021-09-01T00:00:00.000Z",
          display_month: "Sep 21",
        },
        {
          commits: "1400",
          commit_month: "2021-10-01T00:00:00.000Z",
          display_month: "Oct 21",
        },
        {
          commits: "1600",
          commit_month: "2021-11-01T00:00:00.000Z",
          display_month: "Nov 21",
        },
        {
          commits: "1900",
          commit_month: "2021-12-01T00:00:00.000Z",
          display_month: "Dec 21",
        },
        {
          commits: "2500",
          commit_month: "2022-01-01T00:00:00.000Z",
          display_month: "Jan 22",
        },
        {
          commits: "2300",
          commit_month: "2022-02-01T00:00:00.000Z",
          display_month: "Feb 22",
        },
        {
          commits: "3000",
          commit_month: "2022-03-01T00:00:00.000Z",
          display_month: "Mar 22",
        },
        {
          commits: "4000",
          commit_month: "2022-04-01T00:00:00.000Z",
          display_month: "Apr 22",
        },
        {
          commits: "3800",
          commit_month: "2022-05-01T00:00:00.000Z",
          display_month: "May 22",
        },
        {
          commits: "3600",
          commit_month: "2022-06-01T00:00:00.000Z",
          display_month: "Jun 22",
        },
        {
          commits: "2400",
          commit_month: "2022-07-01T00:00:00.000Z",
          display_month: "Jul 22",
        },
        {
          commits: "4900",
          commit_month: "2022-08-01T00:00:00.000Z",
          display_month: "Aug 22",
        },
        {
          commits: "5300",
          commit_month: "2022-09-01T00:00:00.000Z",
          display_month: "Sep 22",
        },
        {
          commits: "4500",
          commit_month: "2022-10-01T00:00:00.000Z",
          display_month: "Oct 22",
        },
      ],
    });

    const req = mockRequest();
    const res = mockResponse();

    await commits(req, res);

    expect(res.json).toHaveBeenCalledWith([
      {
        commits: "1900",
        commit_month: "2021-06-01T00:00:00.000Z",
        display_month: "Jun 21",
      },
      {
        commits: "2500",
        commit_month: "2021-07-01T00:00:00.000Z",
        display_month: "Jul 21",
      },
      {
        commits: "2000",
        commit_month: "2021-08-01T00:00:00.000Z",
        display_month: "Aug 21",
      },
      {
        commits: "1600",
        commit_month: "2021-09-01T00:00:00.000Z",
        display_month: "Sep 21",
      },
      {
        commits: "1400",
        commit_month: "2021-10-01T00:00:00.000Z",
        display_month: "Oct 21",
      },
      {
        commits: "1600",
        commit_month: "2021-11-01T00:00:00.000Z",
        display_month: "Nov 21",
      },
      {
        commits: "1900",
        commit_month: "2021-12-01T00:00:00.000Z",
        display_month: "Dec 21",
      },
      {
        commits: "2500",
        commit_month: "2022-01-01T00:00:00.000Z",
        display_month: "Jan 22",
      },
      {
        commits: "2300",
        commit_month: "2022-02-01T00:00:00.000Z",
        display_month: "Feb 22",
      },
      {
        commits: "3000",
        commit_month: "2022-03-01T00:00:00.000Z",
        display_month: "Mar 22",
      },
      {
        commits: "4000",
        commit_month: "2022-04-01T00:00:00.000Z",
        display_month: "Apr 22",
      },
      {
        commits: "3800",
        commit_month: "2022-05-01T00:00:00.000Z",
        display_month: "May 22",
      },
      {
        commits: "3600",
        commit_month: "2022-06-01T00:00:00.000Z",
        display_month: "Jun 22",
      },
      {
        commits: "2400",
        commit_month: "2022-07-01T00:00:00.000Z",
        display_month: "Jul 22",
      },
      {
        commits: "4900",
        commit_month: "2022-08-01T00:00:00.000Z",
        display_month: "Aug 22",
      },
      {
        commits: "5300",
        commit_month: "2022-09-01T00:00:00.000Z",
        display_month: "Sep 22",
      },
      {
        commits: "4500",
        commit_month: "2022-10-01T00:00:00.000Z",
        display_month: "Oct 22",
      },
    ]);
  });

  test("activeContributors", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          active_contributors: "50",
          month: "2021-06-01T00:00:00.000Z",
          display_month: "Jun 21",
        },
        {
          active_contributors: "130",
          month: "2021-07-01T00:00:00.000Z",
          display_month: "Jul 21",
        },
        {
          active_contributors: "120",
          month: "2021-08-01T00:00:00.000Z",
          display_month: "Aug 21",
        },
        {
          active_contributors: "120",
          month: "2021-09-01T00:00:00.000Z",
          display_month: "Sep 21",
        },
        {
          active_contributors: "110",
          month: "2021-10-01T00:00:00.000Z",
          display_month: "Oct 21",
        },
        {
          active_contributors: "110",
          month: "2021-11-01T00:00:00.000Z",
          display_month: "Nov 21",
        },
        {
          active_contributors: "120",
          month: "2021-12-01T00:00:00.000Z",
          display_month: "Dec 21",
        },
        {
          active_contributors: "130",
          month: "2022-01-01T00:00:00.000Z",
          display_month: "Jan 22",
        },
        {
          active_contributors: "160",
          month: "2022-02-01T00:00:00.000Z",
          display_month: "Feb 22",
        },
        {
          active_contributors: "165",
          month: "2022-03-01T00:00:00.000Z",
          display_month: "Mar 22",
        },
        {
          active_contributors: "145",
          month: "2022-04-01T00:00:00.000Z",
          display_month: "Apr 22",
        },
        {
          active_contributors: "140",
          month: "2022-05-01T00:00:00.000Z",
          display_month: "May 22",
        },
        {
          active_contributors: "130",
          month: "2022-06-01T00:00:00.000Z",
          display_month: "Jun 22",
        },
        {
          active_contributors: "130",
          month: "2022-07-01T00:00:00.000Z",
          display_month: "Jul 22",
        },
        {
          active_contributors: "137",
          month: "2022-08-01T00:00:00.000Z",
          display_month: "Aug 22",
        },
        {
          active_contributors: "135",
          month: "2022-09-01T00:00:00.000Z",
          display_month: "Sep 22",
        },
        {
          active_contributors: "120",
          month: "2022-10-01T00:00:00.000Z",
          display_month: "Oct 22",
        },
      ],
    });

    const req = mockRequest();
    const res = mockResponse();

    await activeContributors(req, res);

    expect(res.json).toHaveBeenCalledWith([
      {
        active_contributors: "50",
        month: "2021-06-01T00:00:00.000Z",
        display_month: "Jun 21",
      },
      {
        active_contributors: "130",
        month: "2021-07-01T00:00:00.000Z",
        display_month: "Jul 21",
      },
      {
        active_contributors: "120",
        month: "2021-08-01T00:00:00.000Z",
        display_month: "Aug 21",
      },
      {
        active_contributors: "120",
        month: "2021-09-01T00:00:00.000Z",
        display_month: "Sep 21",
      },
      {
        active_contributors: "110",
        month: "2021-10-01T00:00:00.000Z",
        display_month: "Oct 21",
      },
      {
        active_contributors: "110",
        month: "2021-11-01T00:00:00.000Z",
        display_month: "Nov 21",
      },
      {
        active_contributors: "120",
        month: "2021-12-01T00:00:00.000Z",
        display_month: "Dec 21",
      },
      {
        active_contributors: "130",
        month: "2022-01-01T00:00:00.000Z",
        display_month: "Jan 22",
      },
      {
        active_contributors: "160",
        month: "2022-02-01T00:00:00.000Z",
        display_month: "Feb 22",
      },
      {
        active_contributors: "165",
        month: "2022-03-01T00:00:00.000Z",
        display_month: "Mar 22",
      },
      {
        active_contributors: "145",
        month: "2022-04-01T00:00:00.000Z",
        display_month: "Apr 22",
      },
      {
        active_contributors: "140",
        month: "2022-05-01T00:00:00.000Z",
        display_month: "May 22",
      },
      {
        active_contributors: "130",
        month: "2022-06-01T00:00:00.000Z",
        display_month: "Jun 22",
      },
      {
        active_contributors: "130",
        month: "2022-07-01T00:00:00.000Z",
        display_month: "Jul 22",
      },
      {
        active_contributors: "137",
        month: "2022-08-01T00:00:00.000Z",
        display_month: "Aug 22",
      },
      {
        active_contributors: "135",
        month: "2022-09-01T00:00:00.000Z",
        display_month: "Sep 22",
      },
      {
        active_contributors: "120",
        month: "2022-10-01T00:00:00.000Z",
        display_month: "Oct 22",
      },
    ]);
  });

  test("recentCommits", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          dev_name: "dev1",
          repo: "repo1",
          organisation: "org1",
          commit_hash: "hash1",
          commit_date: "date1",
          avatar_url: "avatar_url1",
          message: "message1",
        },
        {
          dev_name: "dev2",
          repo: "repo2",
          organisation: "org2",
          commit_hash: "hash2",
          commit_date: "date2",
          avatar_url: "avatar_url2",
          message: "message2",
        },
        {
          dev_name: "dev3",
          repo: "repo3",
          organisation: "org3",
          commit_hash: "hash3",
          commit_date: "date3",
          avatar_url: "avatar_url3",
          message: "message3",
        },
        {
          dev_name: "dev4",
          repo: "repo4",
          organisation: "org4",
          commit_hash: "hash4",
          commit_date: "date4",
          avatar_url: "avatar_url4",
          message: "message4",
        },
        {
          dev_name: "dev5",
          repo: "repo5",
          organisation: "org5",
          commit_hash: "hash5",
          commit_date: "date5",
          avatar_url: "avatar_url5",
          message: "message5",
        },
      ],
    });

    const req = mockRequest();
    const res = mockResponse();

    await recentCommits(req, res);

    expect(res.json).toHaveBeenCalledWith([
      {
        dev_name: "dev1",
        repo: "repo1",
        organisation: "org1",
        commit_hash: "hash1",
        commit_date: "date1",
        avatar_url: "avatar_url1",
        message: "message1",
      },
      {
        dev_name: "dev2",
        repo: "repo2",
        organisation: "org2",
        commit_hash: "hash2",
        commit_date: "date2",
        avatar_url: "avatar_url2",
        message: "message2",
      },
      {
        dev_name: "dev3",
        repo: "repo3",
        organisation: "org3",
        commit_hash: "hash3",
        commit_date: "date3",
        avatar_url: "avatar_url3",
        message: "message3",
      },
      {
        dev_name: "dev4",
        repo: "repo4",
        organisation: "org4",
        commit_hash: "hash4",
        commit_date: "date4",
        avatar_url: "avatar_url4",
        message: "message4",
      },
      {
        dev_name: "dev5",
        repo: "repo5",
        organisation: "org5",
        commit_hash: "hash5",
        commit_date: "date5",
        avatar_url: "avatar_url5",
        message: "message5",
      },
    ]);
  });

  test("repositories", async () => {
    pool.query.mockResolvedValue({
      rows: [
        { month: "2021-06-30T00:00:00.000Z", repositories: "150" },
        { month: "2021-08-31T00:00:00.000Z", repositories: "160" },
        { month: "2021-09-30T00:00:00.000Z", repositories: "170" },
        { month: "2021-10-31T22:00:00.000Z", repositories: "180" },
        { month: "2021-11-30T22:00:00.000Z", repositories: "190" },
        { month: "2021-12-31T22:00:00.000Z", repositories: "200" },
        { month: "2022-01-31T22:00:00.000Z", repositories: "220" },
        { month: "2022-02-28T22:00:00.000Z", repositories: "240" },
        { month: "2022-03-31T00:00:00.000Z", repositories: "260" },
        { month: "2022-04-30T00:00:00.000Z", repositories: "280" },
        { month: "2022-06-30T00:00:00.000Z", repositories: "300" },
        { month: "2022-07-31T00:00:00.000Z", repositories: "350" },
        { month: "2022-08-31T00:00:00.000Z", repositories: "400" },
      ],
    });

    const req = mockRequest();
    const res = mockResponse();

    await repositories(req, res);

    expect(res.json).toHaveBeenCalledWith([
      { month: "2021-06-30T00:00:00.000Z", repositories: "150" },
      { month: "2021-08-31T00:00:00.000Z", repositories: "160" },
      { month: "2021-09-30T00:00:00.000Z", repositories: "170" },
      { month: "2021-10-31T22:00:00.000Z", repositories: "180" },
      { month: "2021-11-30T22:00:00.000Z", repositories: "190" },
      { month: "2021-12-31T22:00:00.000Z", repositories: "200" },
      { month: "2022-01-31T22:00:00.000Z", repositories: "220" },
      { month: "2022-02-28T22:00:00.000Z", repositories: "240" },
      { month: "2022-03-31T00:00:00.000Z", repositories: "260" },
      { month: "2022-04-30T00:00:00.000Z", repositories: "280" },
      { month: "2022-06-30T00:00:00.000Z", repositories: "300" },
      { month: "2022-07-31T00:00:00.000Z", repositories: "350" },
      { month: "2022-08-31T00:00:00.000Z", repositories: "400" },
    ]);
  });

  test("activity", async () => {
    pool.query.mockResolvedValue({
      rows: [
        { month: "2021-06-30T00:00:00.000Z", active_contributors: "150", active_repos: "20" },
        { month: "2021-08-31T00:00:00.000Z", active_contributors: "160", active_repos: "20" },
        { month: "2021-09-30T00:00:00.000Z", active_contributors: "170", active_repos: "20" },
        { month: "2021-10-31T22:00:00.000Z", active_contributors: "180", active_repos: "20" },
        { month: "2021-11-30T22:00:00.000Z", active_contributors: "190", active_repos: "20" },
        { month: "2021-12-31T22:00:00.000Z", active_contributors: "200", active_repos: "20" },
        { month: "2022-01-31T22:00:00.000Z", active_contributors: "220", active_repos: "20" },
        { month: "2022-02-28T22:00:00.000Z", active_contributors: "240", active_repos: "20" },
        { month: "2022-03-31T00:00:00.000Z", active_contributors: "260", active_repos: "20" },
        { month: "2022-04-30T00:00:00.000Z", active_contributors: "280", active_repos: "20" },
        { month: "2022-06-30T00:00:00.000Z", active_contributors: "300", active_repos: "20" },
        { month: "2022-07-31T00:00:00.000Z", active_contributors: "350", active_repos: "20" },
        { month: "2022-08-31T00:00:00.000Z", active_contributors: "400", active_repos: "20" },
      ],
    });

    const req = mockRequest();
    const res = mockResponse();

    await repositories(req, res);

    expect(res.json).toHaveBeenCalledWith([
      { month: "2021-06-30T00:00:00.000Z", active_contributors: "150", active_repos: "20" },
      { month: "2021-08-31T00:00:00.000Z", active_contributors: "160", active_repos: "20" },
      { month: "2021-09-30T00:00:00.000Z", active_contributors: "170", active_repos: "20" },
      { month: "2021-10-31T22:00:00.000Z", active_contributors: "180", active_repos: "20" },
      { month: "2021-11-30T22:00:00.000Z", active_contributors: "190", active_repos: "20" },
      { month: "2021-12-31T22:00:00.000Z", active_contributors: "200", active_repos: "20" },
      { month: "2022-01-31T22:00:00.000Z", active_contributors: "220", active_repos: "20" },
      { month: "2022-02-28T22:00:00.000Z", active_contributors: "240", active_repos: "20" },
      { month: "2022-03-31T00:00:00.000Z", active_contributors: "260", active_repos: "20" },
      { month: "2022-04-30T00:00:00.000Z", active_contributors: "280", active_repos: "20" },
      { month: "2022-06-30T00:00:00.000Z", active_contributors: "300", active_repos: "20" },
      { month: "2022-07-31T00:00:00.000Z", active_contributors: "350", active_repos: "20" },
      { month: "2022-08-31T00:00:00.000Z", active_contributors: "400", active_repos: "20" },
    ]);
  });
});
