import { test, expect } from "@playwright/test";
test.describe("campaign", () => {
  const expectTrue = ["totalResults", "pageSize", "currentPage", "campaigns"];
  const testCase = [
    {
      params: {
        forBusinessUserId: "36",
        searchQuery: "Unilever",
        status: "AWAITING_PAYMENT",
        influencerId: "1",
      },
      expectedStatusCode: 401,
      expectKeyResult: ["message"],
    },
    {
      params: {
        forBusinessUserId: "36",
        searchQuery: "Unilever",
        status: "AWAITING_PAYMENT",
        influencerId: "1",
      },
      expectedStatusCode: 200,
      expectKeyResult: ["totalResults", "pageSize", "currentPage", "campaigns"],
    },
    {
      params: {
        searchQuery: "Unilever",
        status: "AWAITING_PAYMENT",
        influencerId: "1",
      },
      expectedStatusCode: 200,
      expectKeyResult: ["totalResults", "pageSize", "currentPage", "campaigns"],
    },
    {
      params: {
        forBusinessUserId: "36",
        status: "AWAITING_PAYMENT",
        influencerId: "1",
      },
      expectedStatusCode: 200,
      expectKeyResult: ["totalResults", "pageSize", "currentPage", "campaigns"],
    },
    {
      params: {
        forBusinessUserId: "36",
        searchQuery: "Unilever",
        influencerId: "1",
      },
      expectedStatusCode: 200,
      expectKeyResult: ["totalResults", "pageSize", "currentPage", "campaigns"],
    },
    {
      params: {
        forBusinessUserId: "36",
        searchQuery: "Unilever",
        status: "AWAITING_PAYMENT",
      },
      expectedStatusCode: 200,
      expectKeyResult: ["totalResults", "pageSize", "currentPage", "campaigns"],
    },
    {
      params: {
        forBusinessUserId: "36",
        searchQuery: "Unilever",
        influencerId: "2",
      },
      expectedStatusCode: 200,
      expectKeyResult: ["totalResults", "pageSize", "currentPage", "campaigns"],
    },
    {
      params: {
        searchQuery: "Unilever",
        status: "AWAITING_PAYMENT",
        influencerId: "2",
      },
      expectedStatusCode: 200,
      expectKeyResult: ["totalResults", "pageSize", "currentPage", "campaigns"],
    },
    {
      params: {
        forBusinessUserId: "36",
        status: "AWAITING_PAYMENT",
        influencerId: "2",
      },
      expectedStatusCode: 200,
      expectKeyResult: ["totalResults", "pageSize", "currentPage", "campaigns"],
    },
    {
      params: {
        forBusinessUserId: "36",
        searchQuery: "Unilever",
        status: "COMPLETED",
      },
      expectedStatusCode: 200,
      expectKeyResult: ["totalResults", "pageSize", "currentPage", "campaigns"],
    },
    {
      params: {
        searchQuery: "Unilever",
        status: "COMPLETED",
        influencerId: "1",
      },
      expectedStatusCode: 200,
      expectKeyResult: ["totalResults", "pageSize", "currentPage", "campaigns"],
    },
    {
      params: {
        forBusinessUserId: "36",
        status: "COMPLETED",
        influencerId: "1",
      },
      expectedStatusCode: 200,
      expectKeyResult: ["totalResults", "pageSize", "currentPage", "campaigns"],
    },
    {
      params: {
        searchQuery: "Unilever",
        status: "COMPLETED",
        influencerId: "2",
      },
      expectedStatusCode: 200,
      expectKeyResult: ["totalResults", "pageSize", "currentPage", "campaigns"],
    },
    {
      params: {
        forBusinessUserId: "36",
        status: "COMPLETED",
        influencerId: "2",
      },
      expectedStatusCode: 200,
      expectKeyResult: ["totalResults", "pageSize", "currentPage", "campaigns"],
    },
  ];
  let increment = 0;
  const auth = process.env.AUTH || "";
  testCase.map(({ params, expectedStatusCode, expectKeyResult }) => {
    const query = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    const url = `https://partner-api.estidar-dev.com/api/v1/campaign/listCampaigns${query}`;

    test(`list campaigns with param = ${JSON.stringify(
      params
    )} and return = ${expectedStatusCode}`, async ({ request }) => {
      let headers = {};
      if (increment != 0) {
        headers = { Authorization: `Bearer ${auth}` };
      }
      const issues = await request.get(url, { headers: headers });

      expect.soft(issues.status()).toBe(expectedStatusCode);
      if (issues.status() == 401 || issues.status() == 200) {
        expect.soft(Object.keys(issues.json())).toEqual(expectKeyResult);
      }
    });
    increment += 1;
  });
});
