// data/networks/apiClient.ts
import { api } from "@/core/api";
import { ApiError } from "@/core/apiError";
import messages from "@/consts/messages";

// shape of the errors $fetch throws, only the fields read below
interface FetchErrorLike {
  name?: string;
  message?: string;
  response?: { status?: number; _data?: unknown };
}

//reference or depend on common backend response (docs/api/README.md)
export interface ApiResponse<T> {
  timestamp: string; // "2006-01-02-15-04-05" layout, server local time
  status: 1 | 0; // 1 = success, 0 = error
  items: T | null; // payload; null on error
  error: string | null; // message on error; null on success
}

export async function apiRequest<T>(
  url: string,
  options?: Parameters<typeof api>[1],
): Promise<{ data: T; timestamp: string }> {
  try {
    const res = await api<ApiResponse<T>>(url, options);

    if (res.status !== 1) {
      throw new ApiError(
        0,
        "API_ERROR",
        res.error ?? messages.API_ERROR,
        res.timestamp,
      );
    }

    return {
      data: res.items as T,
      timestamp: res.timestamp,
    };
  } catch (error: unknown) {
    if (error instanceof ApiError) throw error;

    // only "offline" when the browser says so; runs without navigator (e.g. in tests)
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      throw new ApiError(0, "OFFLINE", messages.OFFLINE);
    }

    const err = (error ?? {}) as FetchErrorLike;

    if (err.name === "AbortError" || err.message?.includes("timeout")) {
      throw new ApiError(0, "TIMEOUT", messages.TIMEOUT);
    }

    const status = err.response?.status ?? 500;
    const body = err.response?._data as
      | Partial<ApiResponse<unknown>>
      | undefined;
    throw new ApiError(
      status,
      String(status),
      body?.error ?? messages.HTTP_ERROR,
      body?.timestamp,
    );
  }
}
