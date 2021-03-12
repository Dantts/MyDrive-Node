module.exports = function ( data ) {
    let newData = [];

    const array = Object.keys(data);

    for (let i = 0 ; i < Object.keys(data).length ; i++) {
        const variable = array[i];
        newData[array[i]] = data[variable].toLowerCase();
    }

    return {...newData};
}