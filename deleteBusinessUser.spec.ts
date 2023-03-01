import { test, expect } from "@playwright/test";
test.describe("business user", () => {
const expectTrue = ['businessUserId']
const testCase = [{'params': {'businessUserId': '16481234'}, 'expectedStatusCode': 401, 'expectKeyResult': ['message']}, {'params': {'businessUserId': '16481234'}, 'expectedStatusCode': 200, 'expectKeyResult': ['businessUserId']}, {'params': {}, 'expectedStatusCode': 200, 'expectKeyResult': ['businessUserId']}]
let increment = 0;
const auth = process.env.AUTH || "";
testCase.map(({ params, expectedStatusCode, expectKeyResult }) => {
const query = Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join("&");
const url = `https://partner-api.estidar-dev.com/businessUser/deleteBusinessUser${query}`

test(`delete business user with param = ${JSON.stringify(params)} and return = ${expectedStatusCode}`, async ({ request }) => {
let headers = {};
if (increment != 0) {headers = {Authorization: `Bearer ${auth}`,};}
const issues = await request.delete(url, {headers: headers,});

expect.soft(issues.status()).toBe(expectedStatusCode);
if (issues.status() == 401 || issues.status() == 200) {
expect.soft(Object.keys(issues.json())).toEqual(expectKeyResult);
};
});
increment += 1
})});