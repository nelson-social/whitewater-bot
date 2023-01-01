export function isTruthy(x: any): boolean {
  return !!x;
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
