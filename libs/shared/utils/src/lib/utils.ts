export function utils(): string {
  return 'utils';
}
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}