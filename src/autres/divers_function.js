const fs = require('fs')

//géneration de nouvelle id par rappot à la dérnier ID dans le fichier

const getNewId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1
    } else {
        return 1
    }
}

//verification de ID s'il existe dans la base et s'il ne trouve pas ,la fonction va retourné ereur 404
// tp-promise
function mustBeInArray(array, id) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.id == id)
        if (!row) {
            reject({
                message: 'ID inexistant',
                status: 404
            })
        }
        resolve(row)
    })
}

//fonction qui permet décrire dans le fichier de .json
function writeJSONFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

module.exports = {
    getNewId,
    mustBeInArray,
    writeJSONFile
}
