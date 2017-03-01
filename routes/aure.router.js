const Router = require('koa-router');
const logger = require('../logger');

const router = new Router({
    prefix: '/aure'
});

/*
const pets = {
  list: (ctx) => {
    const names = Object.keys(db);
    ctx.body = 'pets: ' + names.join(', ');
  },

  show: (ctx, name) => {
    const pet = db[name];
    if (!pet) return ctx.throw('cannot find that pet', 404);
    ctx.body = pet.name + ' is a ' + pet.species;
  }
};
*/



class Pruebas {
   static async read1(){
        return "read 1";
    }

     static async read2(){
        return "read 2";
    }

     static  read3(){
        for(var i=0;i<300000000;i++){
            let a=0;
        }
        return "read 3";
    }

     static  read4(){
        return "read 4";
    }
    static async Prueba1(ctx) {
         var txt =  Pruebas.read3();
         console.log(txt);
         var txt =  Pruebas.read4();
         console.log(txt);
         var txt = await Pruebas.read1();
         console.log(txt);
         var txt = await Pruebas.read2();
         console.log(txt);
        ctx.body = 'Get Prueba1';
    }
}
router.get('/prueba1', Pruebas.Prueba1);


module.exports = router;