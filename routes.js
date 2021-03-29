const express = require('express');
const stuController = require('./Controller/controller');


const stuRouter = express.Router();

stuRouter.post('/', stuController.create);
stuRouter.get('/', stuController.getAll);
stuRouter.get('/:rollno', stuController.getById);
stuRouter.delete('/:rollno', stuController.deleteById);
stuRouter.put('/:rollno', stuController.updateById)

const routes = (app) => {

  app.use('/students', stuRouter);

  app.get('/', (req, res) => {
    return res.send({ message: "Student Service Up!"});
  }) 
}

module.exports = routes;