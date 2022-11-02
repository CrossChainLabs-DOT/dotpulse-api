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
});
