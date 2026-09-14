export function formatShutterSpeed(seconds: number): string {
  if (seconds >= 1) {
    return `${seconds}s`;
  }

  return `1/${Math.round(1 / seconds)}`;
}
