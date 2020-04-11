export const sortTableColumn = (columnName) => {
  const sortByKey = (key) => (a, b) => (a[key] > b[key] ? 1 : -1);
  return sortByKey(columnName);
};
