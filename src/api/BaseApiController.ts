import { APIRequestContext } from "@playwright/test";

export class BaseApiController {
  constructor(protected readonly request: APIRequestContext) {}
}
