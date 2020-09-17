const db = require("../data/db-config");

function find() {
  return db("characters"); //CHANGE321
}

function add(character) {
  //CHANGE321
  return db("characters") //CHANGE321
    .insert(character) //CHANGE321
    .then(([id]) => {
      return findById(id);
    });
}

function findById(id) {
  return db("characters").where({ id }).first(); //CHANGE321
}

// function update(changes, id) {
//   return db("[TABLE]") //CHANGE321
//     .update(changes)
//     .where({ id })
//     .then(() => {
//       return findById(id);
//     });
// }

function remove(id) {
  let removed;
  findById(id).then((rez) => (removed = rez));
  return db("characters") //CHANGE321
    .where({ id })
    .del()
    .then(() => {
      return removed;
    });
}

module.exports = {
  find,
  // findById,
  add,
  // update,
  remove,
};
