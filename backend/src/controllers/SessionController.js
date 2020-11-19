/* relacionados à sessão de login */
const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const library = await connection('libraries')
            .where('id', id)
            .select('name')
            .first();

        if ( !library ) {
            return response.status(400).json({error: 'No library found with this id'});
        }

        return response.json(library);
    }
}