function getUpdatedValues(newItem, oldItem) {
    const updatedValues = {};

    for (const key in newItem) {
        if (newItem[key] !== oldItem[key]) {
            updatedValues[key] = newItem[key];
        }
    }

    return updatedValues;
};

module.exports = {getUpdatedValues};
