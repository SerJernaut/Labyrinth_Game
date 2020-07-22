module.exports.createValidationMW = (schema) =>{

    return async (req, res, next) => {
        try {
            req.body = await schema.validateAsync( req.body );
            next();
        } catch (e) {
            next( e );
        }
    };
}