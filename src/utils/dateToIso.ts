export const dateToIso = (date: string | Date): string => {
  const isoDate = new Date(date).toISOString();

  return isoDate;
};
