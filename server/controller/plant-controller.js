const {Router} = require('express');
const {
    insertOne: insertPlant,
    insertMany: insertPlants,
    getAll: getAllPlants  
 } = require('../repository/plant-respository');

const PlantController = {
  get router(){
    const router = Router();

    router.get('/', this.index);
    router.post('/', this.create);
    router.put('/', this.notAllowed);
    router.patch('/', this.notAllowed);
    router.delete('/', this.notAllowed);

    router.get('/:id', this.find);
    router.post('/:id', this.notAllowed);
    router.put('/:id', this.update);
    router.patch('/:id', this.replace);
    router.delete('/:id')

    return router;
  },

  async index(req, res, next){
    try{
      const query = {user: req.user}
      var result = await getAllPlants(query);  
      res.status(200).json(result);
    }
    catch(e){
      console.log(e);
      res.status(400).json(e);
    }
  },

  async find(req, res, next){
    try{
      const query = {user: req.user, '_id': req.params.id}
      var result = await getAllPlants(query);  
      res.status(200).json(result);
    }
    catch(e){
      res.status(400).json({error: e.message});
    }
  },

  async create(req, res, next){
    const insert = { data: req.body, user: req.user};
    try{
      if(Array.isArray(insert.data)){
        var result = await insertPlants(insert);
      }
      else{
        var result = await insertPlant(insert);
      }
      res.status(201).json(result);
    }
    catch(e){
      console.log(e);
      res.status(400).json(e);
    }
  },

  async replace(req, res, next){

  },

  async update(req, res, next){

  },

  notAllowed(req, res){
    res.status(405).json({error: `${req.method} not allowed on resource at ${req.originalUrl}`})
  }
}

module.exports = PlantController;