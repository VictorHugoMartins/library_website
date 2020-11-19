const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const libraries = await connection('libraries').select('*');
        
        return response.json(libraries);
    },

    async create(request, response) {
        /*const params = request.query;  acessa todos os parametros que foram enviados pela query */
        /* console.log(params) */
        /* const body = request.body */
        const { name, email, whatsapp, city, uf } = request.body; /* corpo da requisição */
        const id = crypto.randomBytes(4).toString('HEX');
        
        await connection('libraries').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        }) /* aguarda para só então continuar */
        
        return response.json({ id }); /* retorna o id porque nesse caso ele serve como cpf p/ fazer login */
    }
};