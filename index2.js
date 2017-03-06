85
const Koa = require('koa');
const koaLogger = require('koa-logger');
const logger = require('logger');
const body = require('koa-body');
const filmRouter = require('routes/film.router');
const htmlRouter = require('routes/html.router');
const validate = require('koa-validate');
const mount = require('koa-mount');
const views = require('koa-views');
const convert = require('koa-convert');
const session = require('koa-generic-session');
const File = require('koa-generic-session-file');
const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost:27017/films-db';
const onDBReady = (err) => {
    if (err) {
        logger.error('Error connecting', err);
        throw new Error('Error connecting', err);
    }
    const app = new Koa();
    if (process.env.NODE_ENV === 'dev') {
        app.use(koaLogger());
    }
    app.keys = ['claveSuperSecreta'];
    app.use(convert(session({
        store: new File({
            sessionDirectory: __dirname + '/sessions'
        })
    })));
    app.use(async (ctx, next) => {
        logger.info(`Last request was ${ctx.session.lastRequest}`);
        ctx.session.lastRequest = new Date();
        await next();
    });
    app.use(body());
    app.use(async (ctx, next) => {
        const start = Date.now();        
        await next();
        const time = Date.now() - start;
        //set the header
        ctx.set('X-Response-Time', `${time} ms`);
    });
    validate(app);
    app.use(views(__dirname + '/views', {
        map: {
            ejs: 'ejs'
        }
    }));
    app.use(mount('/api/v1', filmRouter.routes()));
    app.use(htmlRouter.routes());
    app.listen(3000, function (err) {
        if (err) {
            logger.error('Error listening in port 3000', err);
            process.exit(1);
        }
        logger.info('Koa server listening in port 3000');
    });
}
mongoose.connect(mongoUri, onDBReady);