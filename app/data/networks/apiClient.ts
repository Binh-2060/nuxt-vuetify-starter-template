// data/networks/apiClient.ts
import { api } from "@/utils/api";

//reference or depend on common backend response (docs/api_specs.md)
export interface ApiResponse<T> {
  timestamp: string; // "2006-01-02-15-04-05" layout, server local time
  status: 1 | 0; // 1 = success, 0 = error
  items: T | null; // payload; null on error
  error: string | null; // message on error; null on success
}

//use as T in apiRequest<Paginated<T>> for list endpoints
export interface Paginated<T> {
  listData: T[]; // never null; empty = []
  pagination: {
    currentPage: number;
    currentPageTotalItem: number;
    totalPage: number; // all three are -1 when the endpoint doesn't paginate
  };
}

export class ApiError extends Error {
  status: number;
  code: string;
  timestamp: string;

  constructor(
    status: number,
    code: string,
    message: string,
    timestamp?: string,
  ) {
    super(message);
    this.status = status;
    this.code = code;
    this.timestamp = timestamp ?? "";
  }
}

export async function apiRequest<T>(
  url: string,
  options?: Parameters<typeof api>[1],
): Promise<{ data: T; timestamp: string }> {
  try {
    const res = await api<ApiResponse<T>>(url, options);

    if (res.status !== 1) {
      throw new ApiError(
        400,
        "API_ERROR",
        res.error ?? "Unknown error",
        res.timestamp,
      );
    }

    return {
      data: res.items as T,
      timestamp: res.timestamp,
    };
  } catch (error: any) {
    if (error instanceof ApiError) throw error;

    if (!navigator.onLine) {
      throw new ApiError(0, "OFFLINE", "No internet connection.");
    }

    if (error?.name === "AbortError" || error?.message?.includes("timeout")) {
      throw new ApiError(0, "TIMEOUT", "Request timed out.");
    }

    const status = error?.response?.status ?? 500;
    const body = error?.response?._data as
      | Partial<ApiResponse<unknown>>
      | undefined;
    throw new ApiError(
      status,
      String(status),
      body?.error ?? "Something went wrong",
      body?.timestamp,
    );
  }
}
