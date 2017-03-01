const Koa = require('koa');
const koaLogger = require('koa-logger');
const logger = require('./logger');


const app = new Koa();

const body = require('koa-body');

const filmRouter = require('./routes/film.router');
const aureRouter = require('./routes/aure.router');

const mount = require('koa-mount');

app.use(body());

if (process.env.NODE_ENV === 'dev') {
    app.use(koaLogger());
}
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const time = Date.now() - start;
    //set the header
    ctx.set('X-Response-Time', `${time} ms`);
});


app.use(mount('/api/v1', filmRouter.routes()));
app.use(aureRouter.routes());





app.listen(3000, function (err) {
    if (err) {
        logger.error('Error listening in port 3000', err);
        process.exit(1);
    }
    logger.info('Koa server listening in port 3000');
});