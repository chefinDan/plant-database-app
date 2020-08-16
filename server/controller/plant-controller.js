const {Router} = require('express');
const IncomingForm = require('formidable').IncomingForm;
const {
    insertOne: insertPlant,
    insertMany: insertPlants,
    getAll: getAllPlants  
 } = require('../repository/plant-respository');

const {
  search: searchPlants,
} = require('../repository/trefle-repository');

const { pluck } = require('../../utils/array');

const proxy = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
}
const filter = {
  min: ['id','common_name'],
  std: ['id','common_name','scientific_name','image_url'],
}

const PlantController = {
  get router(){
    const router = Router();

    router.get('/search', proxy, this.search);
    
    router.get('/:id', this.find);
    router.post('/:id', this.notAllowed);
    router.put('/:id', this.update);
    router.patch('/:id', this.replace);
    router.delete('/:id');
    
    router.get('/', this.index);
    router.post('/', this.create);
    router.put('/', this.notAllowed);
    router.patch('/', this.notAllowed);
    router.delete('/', this.notAllowed);

    return router;
  },

  async search(req, res, next){
    const {data,links,meta} = await searchPlants(req.query.q)
    const filtered = pluck(data, filter.std);
    console.log(filtered);
    res.status(200).json({
      meta: {
        ...meta,
        filtered: true
      },
      data: filtered
    })
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
    var form = new IncomingForm();
    form.on('file', (field, file) => {
      console.log(field, file);
    });
    form.on('end', () => {
      console.log('form end');
      // res.json()
    });
    form.parse(req);
    // const insert = { data: req.body, user: req.user};
    // try{
    //   if(Array.isArray(insert.data)){
    //     var result = await insertPlants(insert);
    //   }
    //   else{
    //     var result = await insertPlant(insert);
    //   }
    //   res.status(201).json(result);
    // }
    // catch(e){
    //   console.log(e);
    //   res.status(400).json(e);
    // }
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