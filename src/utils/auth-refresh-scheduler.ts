/**
 * Simple proactive token refresh scheduler
 * Refreshes token 30 seconds before expiry
 * 
 * NOTE: This is OPTIONAL. The axios interceptor already handles
 * reactive refresh on 401 errors, which is usually sufficient.
 * 
 * Use this only if you want to avoid any 401 errors completely.
 */

const EXPIRY_KEY = "accessTokenExpiresAt";
const BUFFER_MS = 30_000; // Refresh 30s before expiry

let refreshTimer: number | null = null;

/**
 * Schedule a proactive token refresh before expiry
 */
export function scheduleProactiveRefresh(
  refreshFn: () => Promise<void>,
  onError?: (error: any) => void
) {
  // Clear existing timer
  if (refreshTimer) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
  }

  // Guard against SSR
  if (typeof window === "undefined") return;

  const expiryStr = localStorage.getItem(EXPIRY_KEY);
  if (!expiryStr) return;

  const expiresAt = Number(expiryStr);
  if (!expiresAt || isNaN(expiresAt)) return;

  const now = Date.now();
  const msUntilRefresh = expiresAt - now - BUFFER_MS;

  // If already expired or very close, skip (interceptor will handle it)
  if (msUntilRefresh <= 0) {
    console.log("⏭️  Token already expired, skipping proactive refresh");
    return;
  }

  console.log(`⏰ Scheduling proactive refresh in ${Math.round(msUntilRefresh / 1000)}s`);

  // Schedule refresh
  refreshTimer = window.setTimeout(async () => {
    try {
      console.log("🔄 Proactive token refresh triggered");
      await refreshFn();
      console.log("✅ Proactive token refresh successful");
      
      // Reschedule for the new token
      scheduleProactiveRefresh(refreshFn, onError);
    } catch (error) {
      console.error("❌ Proactive token refresh failed:", error);
      if (onError) onError(error);
    }
  }, msUntilRefresh);
}

/**
 * Cancel scheduled refresh
 */
export function cancelProactiveRefresh() {
  if (refreshTimer) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
    console.log("🛑 Proactive refresh cancelled");
  }
}
