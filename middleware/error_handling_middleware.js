const ApiError = require('../errors/api_error')

module.exports = function(err, req, res, next){
    console.log(err);
    if(err instanceof ApiError){
        return res.status(err.status).send({message: err.message})
    }
    if(err instanceof SyntaxError){
        return res.status(err.status).send({message: err.message})
    }

    res.status(500).send({message: 'Nazazrda tutilmagan xatolik'})
}