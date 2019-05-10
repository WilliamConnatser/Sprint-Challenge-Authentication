const db = require('../database/dbConfig');

const add = user => {
    return db('users')
    .insert(user)
    .then(idArray => {
        return db('users')
        .where({id: idArray[0]})
        .first();
    });
}

const get = username => {
    console.log(username)
    return db('users')
    .where({username})
    .first();
}

module.exports = {
    add,
    get
}