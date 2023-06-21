const omitId = (obj) => {
  const copyObj = structuredClone(obj);
  deleteIdFromObj(copyObj);
  return copyObj;
};

const deleteIdFromObj = (obj) => {
  delete obj._id;
  for (const value of Object.values(obj)) {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (typeof item === "object") {
          deleteIdFromObj(item);
        }
      });
    }
  }
};

module.exports = { omitId };
