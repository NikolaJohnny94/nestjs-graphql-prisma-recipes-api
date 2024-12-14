export function normalizeArray(input: string[]): string[] {
  return Array.isArray(input) ? input.map((item) => item.toLowerCase()) : input;
}
