export function calculateProgress(pagesRead: number, totalPages: number) {
  if (totalPages <= 0) return 0;
  return Math.min(100, (pagesRead / totalPages) * 100);
}

export function getReadingStatus(pagesRead: number, totalPages: number) {
  if (pagesRead >= totalPages) return "Read";
  if (pagesRead > 0) return "Reading";
  return "Unread";
}
