class FilmValidator {
    static async validateCreate(ctx, next) {
     /*   ctx.checkBody('name').notEmpty().len(2, 10);
        ctx.checkBody('year').isInt().toInt();
        ctx.checkBody('genre').notEmpty().in(['terror', 'comedy', 'action',
            'fantastic']);
        if (ctx.errors && ctx.errors.length > 0) {
            ctx.status = 400;
            ctx.body = ctx.errors;
            return;
        }*/
        await next();
    }
    static async validateId(ctx, next) {
     /*x.checkParams('id').isHexadecimal().isLength(24);
        if (ctx.errors && ctx.errors.length > 0) {
            ctx.status = 400;
            ctx.body = ctx.errors;
            return;
        }*/
        await next();
    }
}
module.exports = FilmValidator;