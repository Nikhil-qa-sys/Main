import { APIResponse } from "@playwright/test";
import { BaseApiController } from "./BaseApiController";

export class AuthApiController extends BaseApiController {
  async verifyLogin(email: string, password: string): Promise<APIResponse> {
    return this.request.post("/api/verifyLogin", {
      form: { email, password },
    });
  }
}
