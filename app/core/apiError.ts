// core/apiError.ts
import messages from "@/consts/messages";

// error thrown by data/networks/apiClient.ts for every failed request
// lives in core so composables and data both depend on core, not on each other
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

// turns any thrown value into the text shown to the user (no UI here)
export const getErrorMessage = (err: unknown): string => {
  if (err instanceof ApiError) return `[${err.code ?? ""}] ${err.message}`;
  if (err instanceof Error) return err.message;
  return messages.UNEXPECTED_ERROR;
};
