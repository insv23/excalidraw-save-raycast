// src/services/api/config.ts

import { getPreferenceValues } from "@raycast/api";
import type { Preferences } from "../../types";

interface ApiConfig {
  host: string;
  token: string;
}

export const getApiConfig = async (): Promise<ApiConfig> => {
  const preferences = getPreferenceValues<Preferences>();
  const { host, token } = preferences;
  if (!host || !token) {
    throw new Error("API host and token are required");
  }
  return { host, token };
};