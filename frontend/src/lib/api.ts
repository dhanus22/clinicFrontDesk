export async function apiRequest<TResponse = unknown, TBody = unknown>(
  endpoint: string,
  method: string = "GET",
  body?: TBody
): Promise<TResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${baseUrl}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let errorMsg = `HTTP ${res.status}`;
    try {
      const errData = (await res.json()) as { message?: string | string[] };
      if (errData.message) {
        errorMsg = Array.isArray(errData.message)
          ? errData.message.join(", ")
          : errData.message;
      }
    } catch {
      // Ignore JSON parse error
    }
    throw new Error(errorMsg);
  }

  return (await res.json()) as TResponse;
}
