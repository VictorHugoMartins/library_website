/* retorna os livros específicos de uma biblioteca */

const connection = require("../database/connection");
const { connect } = require("../routes");

module.exports = {
    async index(request, response) {
        try {
            const library_id = request.headers.authorization;
            const books = await connection('books')
                .where('library_id', library_id)
                .select('*');
            return response.json(books);
        } catch ( err ) {
            console.log("Deu errado");
            return response.status(400).json({error: 'Nenhuma bibioteca foi encontrada com esse id'});
        }
    }
}