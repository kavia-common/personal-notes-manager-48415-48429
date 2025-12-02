const getEnv = (key, fallback = "") => {
  try {
    const value = process.env[key];
    return value == null ? fallback : value;
  } catch {
    return fallback;
  }
};

/**
 * PUBLIC_INTERFACE
 * getConfig
 * Returns typed configuration for optional environment variables.
 */
export function getConfig() {
  /** This is a public function. */
  return {
    // Optional backend base URLs; empty string means local-only mode
    apiBase: getEnv("REACT_APP_API_BASE", ""),
    backendUrl: getEnv("REACT_APP_BACKEND_URL", ""),
    frontendUrl: getEnv("REACT_APP_FRONTEND_URL", ""),
    wsUrl: getEnv("REACT_APP_WS_URL", ""),
    nodeEnv: getEnv("REACT_APP_NODE_ENV", ""),
    telemetryDisabled: getEnv("REACT_APP_NEXT_TELEMETRY_DISABLED", ""),
    enableSourceMaps: getEnv("REACT_APP_ENABLE_SOURCE_MAPS", ""),
    port: getEnv("REACT_APP_PORT", ""),
    trustProxy: getEnv("REACT_APP_TRUST_PROXY", ""),
    logLevel: getEnv("REACT_APP_LOG_LEVEL", "info"),
    healthcheckPath: getEnv("REACT_APP_HEALTHCHECK_PATH", "/healthz"),
    featureFlags: getEnv("REACT_APP_FEATURE_FLAGS", ""),
    experimentsEnabled: getEnv("REACT_APP_EXPERIMENTS_ENABLED", ""),
  };
}

/**
 * PUBLIC_INTERFACE
 * isBackendEnabled
 * Returns true if a backend URL or API base is available.
 */
export function isBackendEnabled() {
  /** This is a public function. */
  const { apiBase, backendUrl } = getConfig();
  return Boolean(apiBase || backendUrl);
}
