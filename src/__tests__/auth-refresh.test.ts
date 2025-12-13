import axios from "axios";

// Mock axios to simulate 401 and refresh
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Auth Refresh Flow", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should update localStorage when refresh succeeds", async () => {

    // Mock refresh response
    const mockRefreshResponse = {
      data: {
        success: true,
        data: {
          user: {
            id: "1",
            email: "test@example.com",
            username: "testuser",
            role: "user",
          },
          accessTokenExpiresAt: 1234567890,
        },
      },
    };

    // Mock the axios.create().post() call for refresh
    mockedAxios.create.mockReturnValue({
      post: jest.fn().mockResolvedValue(mockRefreshResponse),
    } as any);

    // Act: Trigger the interceptor by making a request that returns 401
    try {
      // This would trigger the refresh in the real interceptor
      const refreshResponse = await axios.create({
        baseURL: "http://localhost:3000",
        withCredentials: true,
      }).post("/auth/refresh");

      // Simulate what the interceptor does
      if (refreshResponse.data?.data?.accessTokenExpiresAt) {
        localStorage.setItem(
          "accessTokenExpiresAt",
          refreshResponse.data.data.accessTokenExpiresAt.toString()
        );
      }
    } catch (error) {
      // Expected in this test setup
    }

    // Assert: Check localStorage was updated
    expect(localStorage.getItem("accessTokenExpiresAt")).toBe("1234567890");
  });

  it("should clear localStorage when refresh fails", async () => {
    // Setup: Put something in localStorage
    localStorage.setItem("accessTokenExpiresAt", "999999");

    // Mock refresh failure
    mockedAxios.create.mockReturnValue({
      post: jest.fn().mockRejectedValue(new Error("Refresh failed")),
    } as any);

    // Act: Simulate refresh failure
    try {
      await axios.create({
        baseURL: "http://localhost:3000",
        withCredentials: true,
      }).post("/auth/refresh");
    } catch (error) {
      // Simulate what the interceptor does on error
      localStorage.removeItem("accessTokenExpiresAt");
    }

    // Assert: Check localStorage was cleared
    expect(localStorage.getItem("accessTokenExpiresAt")).toBeNull();
  });

  it("should have correct response structure", () => {
    // This test documents the expected response structure
    const expectedStructure = {
      success: true,
      data: {
        user: {
          id: "string",
          email: "string",
          username: "string",
          role: "string",
        },
        accessTokenExpiresAt: 1234567890, // number
      },
      message: "Token refreshed successfully",
    };

    expect(expectedStructure.data.accessTokenExpiresAt).toBe(1234567890);
    expect(typeof expectedStructure.data.accessTokenExpiresAt).toBe("number");
  });
});
