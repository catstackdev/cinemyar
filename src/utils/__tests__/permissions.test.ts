import { hasRole, hasPermission, isAdmin, isSuperAdmin, canAccessAuthenticated, getRoleDisplayName } from "../permissions";
import type { User } from "@/state/auth/auth.types";

describe("Permission Utilities", () => {
  const createMockUser = (role: any, permissions?: string[]): User => ({
    id: "1",
    email: "test@example.com",
    role,
    permissions,
  });

  describe("hasRole", () => {
    it("should return true if user has one of the allowed roles", () => {
      const user = createMockUser("admin");
      expect(hasRole(user, ["admin", "super-admin"])).toBe(true);
    });

    it("should return false if user does not have any of the allowed roles", () => {
      const user = createMockUser("user");
      expect(hasRole(user, ["admin", "super-admin"])).toBe(false);
    });

    it("should return false if user is null", () => {
      expect(hasRole(null, ["admin"])).toBe(false);
    });
  });

  describe("hasPermission", () => {
    it("should return true if user has the required permission", () => {
      const user = createMockUser("admin", ["read", "write", "delete"]);
      expect(hasPermission(user, "write")).toBe(true);
    });

    it("should return false if user does not have the required permission", () => {
      const user = createMockUser("admin", ["read"]);
      expect(hasPermission(user, "write")).toBe(false);
    });

    it("should return false if user is null", () => {
      expect(hasPermission(null, "read")).toBe(false);
    });

    it("should return false if user has no permissions", () => {
      const user = createMockUser("admin");
      expect(hasPermission(user, "read")).toBe(false);
    });
  });

  describe("isAdmin", () => {
    it("should return true for admin role", () => {
      const user = createMockUser("admin");
      expect(isAdmin(user)).toBe(true);
    });

    it("should return true for super-admin role", () => {
      const user = createMockUser("super-admin");
      expect(isAdmin(user)).toBe(true);
    });

    it("should return false for other roles", () => {
      const user = createMockUser("translator");
      expect(isAdmin(user)).toBe(false);
    });
  });

  describe("isSuperAdmin", () => {
    it("should return true only for super-admin role", () => {
      const user = createMockUser("super-admin");
      expect(isSuperAdmin(user)).toBe(true);
    });

    it("should return false for admin role", () => {
      const user = createMockUser("admin");
      expect(isSuperAdmin(user)).toBe(false);
    });
  });

  describe("canAccessAuthenticated", () => {
    it("should return true for admin", () => {
      const user = createMockUser("admin");
      expect(canAccessAuthenticated(user)).toBe(true);
    });

    it("should return true for translator", () => {
      const user = createMockUser("translator");
      expect(canAccessAuthenticated(user)).toBe(true);
    });

    it("should return true for super-admin", () => {
      const user = createMockUser("super-admin");
      expect(canAccessAuthenticated(user)).toBe(true);
    });

    it("should return false for regular user", () => {
      const user = createMockUser("user");
      expect(canAccessAuthenticated(user)).toBe(false);
    });
  });

  describe("getRoleDisplayName", () => {
    it("should return correct display names for all roles", () => {
      expect(getRoleDisplayName("user")).toBe("User");
      expect(getRoleDisplayName("translator")).toBe("Translator");
      expect(getRoleDisplayName("admin")).toBe("Administrator");
      expect(getRoleDisplayName("super-admin")).toBe("Super Administrator");
    });
  });
});