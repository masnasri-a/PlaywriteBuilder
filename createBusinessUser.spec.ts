import { test, expect } from "@playwright/test";
test.describe("business user", () => {
  const expectTrue = [
    "businessUserId",
    "businessPartnerId",
    "name",
    "email",
    "phoneNumber",
  ];
  const testCase = [
    {
      params: {
        name: "Unilever",
        email: "unilever@unilever.com",
        phoneNumber: "62854555936",
      },
      expectedStatusCode: 401,
      expectKeyResult: ["message"],
    },
    {
      params: {
        name: "Unilever",
        email: "unilever@unilever.com",
        phoneNumber: "62854555936",
      },
      expectedStatusCode: 200,
      expectKeyResult: [
        "businessUserId",
        "businessPartnerId",
        "name",
        "email",
        "phoneNumber",
      ],
    },
    {
      params: { email: "unilever@unilever.com", phoneNumber: "62854555936" },
      expectedStatusCode: 200,
      expectKeyResult: [
        "businessUserId",
        "businessPartnerId",
        "name",
        "email",
        "phoneNumber",
      ],
    },
    {
      params: { name: "Unilever", phoneNumber: "62854555936" },
      expectedStatusCode: 200,
      expectKeyResult: [
        "businessUserId",
        "businessPartnerId",
        "name",
        "email",
        "phoneNumber",
      ],
    },
    {
      params: { name: "Unilever", email: "unilever@unilever.com" },
      expectedStatusCode: 200,
      expectKeyResult: [
        "businessUserId",
        "businessPartnerId",
        "name",
        "email",
        "phoneNumber",
      ],
    },
  ];
  let increment = 0;
  const auth = process.env.AUTH || "";
  testCase.map(({ params, expectedStatusCode, expectKeyResult }) => {
    const url = `https://partner-api.estidar-dev.com/businessUser/createBusinessUser`;

    test(`create business user with param = ${JSON.stringify(
      params
    )} and return = ${expectedStatusCode}`, async ({ request }) => {
      let headers = {};
      if (increment != 0) {
        headers = { Authorization: `Bearer ${auth}` };
      }
      const issues = await request.get(url, { headers: headers });

      expect.soft(issues.status()).toBe(expectedStatusCode);
      expect.soft(Object.keys(issues.json())).toEqual(expectKeyResult);
    });
    increment += 1;
  });
});
