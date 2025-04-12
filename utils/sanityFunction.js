const sqlData = [
  { id: 1, sqlWord: "SELECT" },
  { id: 2, sqlWord: "INSERT" },
  { id: 3, sqlWord: "UPDATE" },
  { id: 4, sqlWord: "DELETE" },
  { id: 5, sqlWord: "CREATE" },
  { id: 6, sqlWord: "DROP" },
  { id: 7, sqlWord: "TRUNCATE" },
  { id: 8, sqlWord: "ALTER" },
  { id: 9, sqlWord: ";" },
];

const sanityFunction = (value) => {
  const type = typeof value;

  if (type !== "string" && type !== "number") return null;

  if (type === "string") {
    for (const sqlObj of sqlData) {
      const sqlWord = sqlObj.sqlWord.toUpperCase();
      if (value.toUpperCase().includes(sqlWord)) return null;
    }
  }

  if (type === "number" && isNaN(value)) return null;

  return value;
};

module.exports = { sanityFunction };
