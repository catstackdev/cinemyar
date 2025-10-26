import { waitFor } from "@testing-library/react";

export const waitForLoadingToFinish = async () => {
  await waitFor(
    () => {
      const loadingElement = document.querySelector('[role="status"]');
      if (loadingElement) {
        throw new Error("Still loading");
      }
    },
    { timeout: 3000 },
  );
};

export const createMockFile = (
  name: string = "test.txt",
  size: number = 1024,
  type: string = "text/plain",
): File => {
  const content = "a".repeat(size);
  return new File([content], name, { type });
};

export const createMockEvent = <T extends Event>(
  type: string,
  properties: Partial<T> = {},
): T => {
  const event = new Event(type) as T;
  Object.assign(event, properties);
  return event;
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const flushPromises = (): Promise<void> => {
  return new Promise((resolve) => setImmediate(resolve));
};
