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
      label ? `${label} copied to clipboard` : "Copied to clipboard",
    );
  } catch (error) {
    console.error("Copy failed:", error);
    onError?.(error);
  }
}

export async function handleViewOnBlockchain(
  address: string,
  type: "token" | "spv" | "asset",
) {
  let url = "";
  if (!address) {
    toast.error("No on-chain address available");
    return;
  }
  if (type === "token") {
  }
  url = `https://amoy.polygonscan.com/address/${address}#code`;
  window.open(url, "_blank");
}
