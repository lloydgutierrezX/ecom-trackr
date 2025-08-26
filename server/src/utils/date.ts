export const addHours = (hours: number) => {
  return new Date(Date.now() + 1000 * 60 * 60 * hours);
}