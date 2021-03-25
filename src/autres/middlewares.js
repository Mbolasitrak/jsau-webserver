//verification de type s'il est en valeur numerique
/*const bodyParser = require('body-parser')
app.use(bodyParser.json());*/
function mustBeInteger(req, res, next) {
    const id = req.params.id
    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'ID doit être ne valeur numerique(Integer)' })
    } else {
        next()
    }
}

//verification des noms d'attribut s'il existe
function checkFieldsEnquete(req, res, next) {
    const { nom, description} = req.body
    if (nom && description) {
        next()
    } else {
        res.status(400).json({ message: 'il y a de(s) mauvais champs'})
    }
}

module.exports = {
    mustBeInteger,
    checkFieldsEnquete
}
