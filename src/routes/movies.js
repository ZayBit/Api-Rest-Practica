const { Router } = require('express');
const _ = require('underscore');

const router = Router();

const movies = require('../simple.json');

router.get('/',(req,res)=>{
    res.json(movies)
})

router.post('/',(req,res)=>{
    const { title , director , year , rating } = req.body;
    if(title && director && year && rating ){
        let id = 0,
            ids = [];
        _.each(movies,(movie)=>{
            ids.push(movie.id)
        });
        
        id = (ids.length >= 1) ? Math.max(...ids)+1 : 1;

        const newMovie = {id,...req.body}
        movies.push(newMovie)
        res.json(movies);
    }else{
        res.status(500).json({error:'Hay algun problemas con los datos'})
    }
 
})

router.delete('/:id',(req,res)=>{

    const { id } = req.params;
 
    _.each(movies,(movie,i)=>{
        
        if(movie.id == id){
            movies.splice(i,1);
        }
    });
    res.send(movies)
});

router.put('/:id',(req,res)=>{
    const { title , director , year , rating } = req.body;
    const { id } = req.params;
    if(title && director && year && rating ){
        _.each(movies,(movie,i)=>{
            if(movie.id == id){
                movie.title = title;
                movie.director = director;
                movie.year = year;
                movie.rating = rating;
            }
        })
        res.send(movies)
    }else{
        res.status(500).json({error:'Hay algun problemas con los datos'})
    }
});

module.exports = router;
