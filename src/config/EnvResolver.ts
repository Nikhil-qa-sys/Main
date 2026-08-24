import qaConfig from "../test-data/environments/qa.config.json";

export interface EnvConfig {
  BASE_URL: string;
  API_BASE_URL: string;
}

const environments: Record<string, EnvConfig> = {
  qa: qaConfig,
};

export function resolveEnv(): EnvConfig {
  const envName = process.env.TEST_ENV ?? "qa";
  const config = environments[envName];

  if (!config) {
    throw new Error(`Unknown TEST_ENV "${envName}". Available: ${Object.keys(environments).join(", ")}`);
  }

  return config;
}
