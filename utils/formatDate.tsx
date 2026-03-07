export function formatDate(date: string) {
  const formatedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
  return formatedDate;
}
