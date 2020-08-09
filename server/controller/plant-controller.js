const {Router} = require('express');

const PlantController = {
    get router(){
        const router = Router();

        router.get('/', this.index);
        router.post('/', this.create);

        return router;
    },

    index(req, res, next){
        res.status(200).send('list all plants');
    },
    create(req, res, next){
        res.status(201).send('plant created');
    }
}

module.exports = PlantController;


// apiRouter.post('/api/plant', checkJwt, async (req, res) => {
    // const plants = db.collection('plants');
    // await plants.insertOne(
    //     {
    //     data: req.body,
    //     user: req.user.sub
    //     }
    // );
    // res.send({
    //     msg: `Inserted ${req.body}`
    // })
    // });
      
    // router.get("/api/plants", checkJwt, async (req, res) => {
    //     const plants = await db.collection('plants');
    //     const data = await plants.find({user: req.user.sub}).toArray();
    //     res.send(data);
    // });