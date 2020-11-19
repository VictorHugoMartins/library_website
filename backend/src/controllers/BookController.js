const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;
        
        const [ count ] = await connection('books')
            .count(); /* o [ count] pega o primeiro resultado */

        const books = await connection('books')
            .join('libraries', 'libraries.id', '=', 'books.library_id')
            .limit(5) /* limite por página */
            .offset((page - 1) * 5)
            .select([
                'books.*',
                'libraries.name',
                'libraries.email',
                'libraries.whatsapp',
                'libraries.city',
                'libraries.uf']);
        
        response.header('X-Total-Count', count['count(*)']);
        return response.json({books});
    },

    async create(request, response) {
        const { title, description, price } = request.body;
        /* a library_id nao é enviada pelo body porque ela é a da library que tá logada e isso costuma vir pelo cabeçalho */
        const library_id = request.headers.authorization; /* dados sobre idioma, etc, contexto */
    
        console.log(library_id);
        const [id] = await connection('books').insert({
            title,
            description,
            price,
            library_id
        });

        return response.json({id});
    },

    async delete(request, response) {
        const { id } = request.params;
        const library_id = request.headers.authorization; /* dados sobre idioma, etc, contexto */
    
        const book = await connection('books')
            .where('id', id)
            .select('library_id')
            .first();

        if ( book.library_id === library_id ) {
            await connection('books').where('id', id).delete();

            return response.status(204).send();
        } else {
            return response.status(401).json({ error: "Operation not permitted."}); /* nao autorizado */
        }
    }
};