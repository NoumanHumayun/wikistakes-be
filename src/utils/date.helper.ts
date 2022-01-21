export function getParsedDate(date: string, timezone?: string) {
  const options: unknown = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'long',
    timeZone: timezone || 'Europe/Berlin',
    hour12: true
  };
  return new Date(date).toLocaleString(undefined, options);
}
