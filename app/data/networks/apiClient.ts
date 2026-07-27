// data/networks/apiClient.ts
import { api } from "@/utils/api";

//reference or depend on common backend response
interface ApiResponse<T> {
  respCode: string;
  respDesc: string;
  respTitle: string | null;
  respIcon: string | null;
  respId: string;
  linkExtenal: string | null;
  labelEnterButton: string | null;
  respData: T;
}

export class ApiError extends Error {
  status: number;
  code: string;
  respId: string;

  constructor(status: number, code: string, message: string, respId?: string) {
    super(message);
    this.status = status;
    this.code = code;
    this.respId = respId ?? "";
  }
}

export async function apiRequest<T>(
  url: string,
  options?: Parameters<typeof api>[1],
): Promise<{ data: T; message: string; respId: string; respDes: string }> {
  try {
    const res = await api<ApiResponse<T>>(url, options);

    if (res.respCode !== "00") {
      throw new ApiError(
        400,
        res.respCode,
        res.respDesc ?? "Unknown error",
        res.respId,
      );
    }

    return {
      data: res.respData,
      message: res.respDesc,
      respId: res.respId,
      respDes: res.respDesc ?? "",
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
    const body = error?.response?._data;
    throw new ApiError(
      status,
      body?.respCode ?? String(status),
      body?.respDesc ?? "Something went wrong",
      body?.respId,
    );
  }
}
