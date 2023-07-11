const omitId = (obj) => {
  const copyObj = JSON.parse(JSON.stringify(obj));
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

const filterClientsBySearchString = (clientsArr, searchString) => {
  const compareWithSearchString = compareStrings.bind(null, searchString);
  return clientsArr.filter((client) => {
    const isNameMatched = compareWithSearchString(client.name);
    const isSubstationMatched = client.substations.some((substation) =>
      compareWithSearchString(substation.name)
    );
    const isPeopleMatched = client.people.some((person) =>
      compareWithSearchString(person.name)
    );

    return isNameMatched || isSubstationMatched || isPeopleMatched;
  });
};

const compareStrings = (str1, str2) => {
  return str2.toLowerCase().includes(str1.toLowerCase());
};

module.exports = { omitId, filterClientsBySearchString };
