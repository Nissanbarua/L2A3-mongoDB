export function formatError(message: string, error: any) {
  return {
    message,
    success: false,
    error,
  };
}
