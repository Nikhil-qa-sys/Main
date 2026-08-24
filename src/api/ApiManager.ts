import { APIRequestContext } from "@playwright/test";
import { AuthApiController } from "./AuthApiController";

export class ApiManager {
  private authInstance?: AuthApiController;

  constructor(private readonly request: APIRequestContext) {}

  get auth(): AuthApiController {
    if (!this.authInstance) {
      this.authInstance = new AuthApiController(this.request);
    }
    return this.authInstance;
  }
}
