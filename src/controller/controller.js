const fs =require('fs');
const filename = './Ressources/enquete.json';
let enquetes = require('../../Ressources/enquete.json');
const helper = require('../autres/divers_function.js');

//lecture d'enquete qui retour un promise
// tp-promise
function getEnquetes() {
    return new Promise((resolve, reject) => {
        if (enquetes.length === 0) {
            reject({
                message: 'pas d\' enquetes disponible',
                status: 202
            })
        }
        resolve(enquetes)
    })
}

//lecture d'enquete par ID qui retour un promise
// tp-promise-then
function getEnquete(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(enquetes, id)
            .then(enquete => resolve(enquete))
            .catch(err => reject(err))
    })
}

//insertion d'enquete qui retour un promise
// tp-promise-then
function insertEnquete(newEnquete) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(enquetes) }
        newEnquete = { ...id, ...newEnquete }
        enquetes.push(newEnquete)
        helper.writeJSONFile(filename, enquetes)
        resolve(newEnquete)
    })
}

//modification d'enquete qui retour un promise
// tp-promise-then
function updateEnquete(id, newEnquete) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(enquetes, id)
            .then(enquete => {
                const index = enquetes.findIndex(p => p.id == enquete.id)
                id = { id: enquete.id }
                enquetes[index] = { ...id, ...newEnquete }
                helper.writeJSONFile(filename, enquetes)
                resolve(enquetes[index])
            })
            .catch(err => reject(err))
    })
}

//Suppression d'enquete qui retour un promise
// tp-promise-then
function deleteEnquete(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(enquetes, id)
            .then(() => {
                enquetes = enquetes.filter(p => p.id != id)
                helper.writeJSONFile(filename, enquetes)
                resolve()
            })
            .catch(err => reject(err))
    })
}
//exportation des modules pour qu'on puisse l'appeler dans autres fichiers
module.exports = {
    insertEnquete,
    getEnquetes,
    getEnquete,
    updateEnquete,
    deleteEnquete
}
