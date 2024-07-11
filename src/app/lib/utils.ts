export function capitalizeFirst(value?: string) {
  if (!value) {
    return undefined;
  }
  const firstLetter = value[0]?.toUpperCase();
  const rest = value.slice(1, value.length).toLowerCase();
  return firstLetter + rest;
}
