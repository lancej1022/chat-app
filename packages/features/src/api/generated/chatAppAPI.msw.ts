/**
 * Generated by orval v7.8.0 🍺
 * Do not edit manually.
 * Chat App API
 * API specification for the Chat application
 * OpenAPI spec version: 1.0.0
 */
import { faker } from "@faker-js/faker";
import { delay, http, HttpResponse } from "msw";

import type { SignupResponse } from "../models";

export const getSignupResponseMock = (
  overrideResponse: Partial<SignupResponse> = {},
): SignupResponse => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  created_at: `${faker.date.past().toISOString().split(".")[0]}Z`,
  updated_at: `${faker.date.past().toISOString().split(".")[0]}Z`,
  token: faker.string.alpha(20),
  refresh_token: faker.string.alpha(20),
  is_chirpy_red: faker.datatype.boolean(),
  ...overrideResponse,
});

export const getSignupMockHandler = (
  overrideResponse?:
    | SignupResponse
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0],
      ) => Promise<SignupResponse> | SignupResponse),
) => {
  return http.post("*/signup", async (info) => {
    await delay(1000);

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === "function"
            ? await overrideResponse(info)
            : overrideResponse
          : getSignupResponseMock(),
      ),
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  });
};
export const getChatAppAPIMock = () => [getSignupMockHandler()];
