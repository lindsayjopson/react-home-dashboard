
export const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
export const humanDays = ["Today", "Tomorrow"];

export const formatDateLookup = (date) => {
  if (!date) return '';
  return [
    date.getFullYear(),
    ('0' + (date.getMonth() + 1)).slice(-2),
    ('0' + date.getDate()).slice(-2)
  ].join('');
};

export const formatDateDisplay = (date) => {
  if (!date) return '';
  return [
    ('0' + date.getDate()).slice(-2),
    ' / ',
    ('0' + (date.getMonth() + 1)).slice(-2),
    ' / ',
    date.getFullYear(),
  ].join('');
};
