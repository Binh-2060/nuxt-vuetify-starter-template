import { ApiError } from "@/data/networks/apiClient";

// composables/useDialog.ts
interface DialogOptions {
  title?: string;
  message?: string;
  type?: "success" | "error" | "warning" | "info" | "confirm";
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  persistent?: boolean;
  input?: boolean;
  inputLabel?: string;
  inputPlaceholder?: string;
  inputRules?: ((v: string) => string | true)[];
}

interface DialogState extends Required<Omit<DialogOptions, "inputRules">> {
  show: boolean;
  inputValue: string;
  inputRules: ((v: string) => string | true)[];
  resolve: ((value: DialogResult) => void) | null;
}

interface DialogResult {
  isConfirmed: boolean;
  value?: string;
}

const state = reactive<DialogState>({
  show: false,
  title: "",
  message: "",
  type: "info",
  confirmText: "OK",
  cancelText: "Cancel",
  showCancel: false,
  persistent: false,
  input: false,
  inputLabel: "",
  inputPlaceholder: "",
  inputValue: "",
  inputRules: [],
  resolve: null,
});

const open = (options: DialogOptions): Promise<DialogResult> => {
  return new Promise((resolve) => {
    Object.assign(state, {
      show: true,
      title: options.title ?? "",
      message: options.message ?? "",
      type: options.type ?? "info",
      confirmText: options.confirmText ?? "OK",
      cancelText: options.cancelText ?? "Cancel",
      showCancel: options.showCancel ?? false,
      persistent: options.persistent ?? false,
      input: options.input ?? false,
      inputLabel: options.inputLabel ?? "",
      inputPlaceholder: options.inputPlaceholder ?? "",
      inputValue: "",
      inputRules: options.inputRules ?? [],
      resolve,
    });
  });
};

const onConfirm = () => {
  state.show = false;
  state.resolve?.({ isConfirmed: true, value: state.inputValue });
};

const onCancel = () => {
  state.show = false;
  state.resolve?.({ isConfirmed: false });
};

export const useDialog = () => {
  // Shorthand methods matching SweetAlert2 patterns
  const fire = (options: DialogOptions) => open(options);

  const confirm = (title: string, message?: string) =>
    open({
      title,
      message,
      type: "confirm",
      showCancel: true,
      confirmText: "Confirm",
    });

  const success = (title: string, message?: string) =>
    open({ title, message, type: "success" });

  const error = (title: string, message?: string) =>
    open({ title, message, type: "error" });

  const warning = (title: string, message?: string) =>
    open({
      title,
      message,
      type: "warning",
      showCancel: true,
      confirmText: "OK",
    });

  const info = (title: string, message?: string) =>
    open({ title, message, type: "info" });

  const prompt = (title: string, options?: Partial<DialogOptions>) =>
    open({
      title,
      input: true,
      showCancel: true,
      confirmText: "Submit",
      ...options,
    });

  const catchError = async <T>(
    fn: () => Promise<T>,
    title = "ຜິດພາດ",
  ): Promise<T | null> => {
    try {
      return await fn();
    } catch (err) {
      let message = "";
      if (err instanceof ApiError) {
        console.log("on this case");
        message = `[${err.code ?? ""}] ${err.message}`;
      } else if (err instanceof Error) {
        message = err.message;
      } else {
        message = "Something went wrongs";
      }
      await error(title, message);
      return null;
    }
  };

  return {
    state,
    fire,
    confirm,
    success,
    error,
    warning,
    info,
    prompt,
    onConfirm,
    onCancel,
    catchError,
  };
};
