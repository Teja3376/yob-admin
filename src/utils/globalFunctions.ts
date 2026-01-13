import { toast } from "sonner";

export async function handleCopy(
  text: string,
  label?: string,
  onSuccess?: () => void,
  onError?: (error: unknown) => void,
) {
  try {
    if (!text) return;

    await navigator.clipboard.writeText(text);

    onSuccess?.();
    toast.success(
      label ? `${label} copied to clipboard` : "Copied to clipboard"
    );
  } catch (error) {
    console.error("Copy failed:", error);
    onError?.(error);
  }
}
