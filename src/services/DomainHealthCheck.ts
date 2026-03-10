/**
 * Minimal domain health check stub.
 * Replace with real implementation when backend health checks are needed.
 */
let isHealthy = true;

export const domainHealthCheck = {
  getHealthStatus: (): boolean => isHealthy,
  startHealthCheck: () => {},
  stopHealthCheck: () => {},
  addListener: (_callback: (healthy: boolean) => void) => {},
  removeListener: (_callback: (healthy: boolean) => void) => {},
};
