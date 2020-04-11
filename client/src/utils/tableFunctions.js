export const sortTableColumn = (columnName, sortDescending) => {
  const sortByKey = sortDescending
    ? (key) => (a, b) => (a[key] > b[key] ? 1 : -1)
    : (key) => (a, b) => (a[key] < b[key] ? 1 : -1);

  return sortByKey(columnName);
};
