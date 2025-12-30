import { renderHook, act, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useAppQueryParams } from "../useAppQueryParams";
import type { FC, ReactNode } from "react";

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

interface TestParams extends Record<string, unknown> {
  search?: string;
  page: number;
  limit: number;
  sortBy?: "name" | "date";
  orderBy?: "asc" | "desc";
}

describe("useAppQueryParams", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  it("should initialize with default params", () => {
    const { result } = renderHook(
      () =>
        useAppQueryParams<TestParams>({
          defaultParams: {
            page: 1,
            limit: 10,
            orderBy: "desc",
          },
        }),
      { wrapper: Wrapper },
    );

    expect(result.current.params).toEqual({
      page: 1,
      limit: 10,
      orderBy: "desc",
    });
  });

  it("should parse URL params with custom parser", () => {
    window.history.pushState({}, "", "/?page=2&search=test&limit=20");

    const { result } = renderHook(
      () =>
        useAppQueryParams<TestParams>({
          defaultParams: {
            page: 1,
            limit: 10,
          },
          parseParams: (searchParams) => ({
            search: searchParams.get("search") || undefined,
            page: Number(searchParams.get("page") || "1"),
            limit: Number(searchParams.get("limit") || "10"),
            sortBy: (searchParams.get("sortBy") as TestParams["sortBy"]) || undefined,
            orderBy: (searchParams.get("orderBy") as TestParams["orderBy"]) || undefined,
          }),
        }),
      { wrapper: Wrapper },
    );

    expect(result.current.params.search).toBe("test");
    expect(result.current.params.page).toBe(2);
    expect(result.current.params.limit).toBe(20);
  });

  it("should update params with setParams", () => {
    const { result } = renderHook(
      () =>
        useAppQueryParams<TestParams>({
          defaultParams: {
            page: 1,
            limit: 10,
          },
          parseParams: (searchParams) => ({
            page: Number(searchParams.get("page") || "1"),
            limit: Number(searchParams.get("limit") || "10"),
            search: searchParams.get("search") || undefined,
          }),
        }),
      { wrapper: Wrapper },
    );

    act(() => {
      result.current.setParams({ page: 2, search: "action" });
    });

    waitFor(() => {
      expect(result.current.params.page).toBe(2);
      expect(result.current.params.search).toBe("action");
    });
  });

  it("should remove params when set to undefined", () => {
    window.history.pushState({}, "", "/?page=2&search=test");

    const { result } = renderHook(
      () =>
        useAppQueryParams<TestParams>({
          defaultParams: {
            page: 1,
            limit: 10,
          },
          parseParams: (searchParams) => ({
            page: Number(searchParams.get("page") || "1"),
            limit: Number(searchParams.get("limit") || "10"),
            search: searchParams.get("search") || undefined,
          }),
        }),
      { wrapper: Wrapper },
    );

    act(() => {
      result.current.setParams({ search: undefined });
    });

    waitFor(() => {
      expect(result.current.params.search).toBeUndefined();
      expect(result.current.searchParams.has("search")).toBe(false);
    });
  });

  it("should reset to defaults with resetParams", () => {
    window.history.pushState({}, "", "/?page=5&search=test&limit=50");

    const { result } = renderHook(
      () =>
        useAppQueryParams<TestParams>({
          defaultParams: {
            page: 1,
            limit: 10,
          },
          parseParams: (searchParams) => ({
            page: Number(searchParams.get("page") || "1"),
            limit: Number(searchParams.get("limit") || "10"),
            search: searchParams.get("search") || undefined,
          }),
        }),
      { wrapper: Wrapper },
    );

    act(() => {
      result.current.resetParams();
    });

    waitFor(() => {
      expect(result.current.params).toEqual({
        page: 1,
        limit: 10,
      });
    });
  });

  it("should provide access to raw searchParams", () => {
    window.history.pushState({}, "", "/?page=2&custom=value");

    const { result } = renderHook(
      () =>
        useAppQueryParams<TestParams>({
          defaultParams: { page: 1, limit: 10 },
        }),
      { wrapper: Wrapper },
    );

    expect(result.current.searchParams.get("page")).toBe("2");
    expect(result.current.searchParams.get("custom")).toBe("value");
  });

  it("should expose useParamUpdate methods", () => {
    const { result } = renderHook(
      () =>
        useAppQueryParams<TestParams>({
          defaultParams: { page: 1, limit: 10 },
        }),
      { wrapper: Wrapper },
    );

    expect(result.current.updateParams).toBeDefined();
    expect(result.current.getParam).toBeDefined();
    expect(result.current.removeParams).toBeDefined();
    expect(result.current.clearParams).toBeDefined();
  });
});
