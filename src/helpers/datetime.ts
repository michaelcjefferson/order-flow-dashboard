// Format Date into human-readable string or "-", eg. 
export function formatDate(date: Date | null | undefined): string {
  if (!date) return '-';
  //? use the below to get locale from browser rather than always using Japanese date formatting
  // return new Date(date).toLocaleDateString(Intl.DateTimeFormat().resolvedOptions().locale, {
  return new Date(date).toLocaleDateString('ja-JP', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

// Format Date into short human-readable string or "-", eg.
export function formatShortDate(date: Date | null | undefined): string {
  if (!date) return '-';
  return new Date(date).toLocaleDateString(Intl.DateTimeFormat().resolvedOptions().locale, {
    day: '2-digit', month: 'short',
  });
}

// Format Date (including time) into human-readable string or "-", eg. 
export function formatDateAndTime(date: Date | null | undefined): string {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('ja-JP', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
}