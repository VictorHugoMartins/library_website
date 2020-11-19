const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
/* app.use(cors({ origin: 'http://meuapp.com })) p/ producao ; */
app.use(express.json()); /* as requisições estão em formato json*/
app.use(routes);

app.listen(3333);

/* o que vem depois do / são os recursos */

/* MÉTODOS HTTP

get: buscar uma informação do back end
post: criar uma informação no back end
put: alterar uma informação no back end
delete: deletar uma informação no back end

Tipos de parâmetros:

Query params: parametros nomeados enviados na rota após '?' (filtros, paginação) /users?name=Diego&idade=25
Route params: usados p/ identificar recursos (por exemplo, identificar um único usuário) /users/1
Request body: corpo da requisição, usado p/ criar ou alterar recursos

*/

/*

SQL: SQLite
NoSQL: MongoDB

Driver: pacote oficial do banco de dados pra node
        SELECT * from users
Query builder: table('users').select('*').where()
*/

/* entidades é tudo o que vai ser salvo no banco 
/* biblioteca (ong)
livro (case)

FUNCIONALIDADES

Login de biblioteca
cadastro de biblioteca
logout de biblioteca
cadastrar novos livros
deletar livros
listar livros

mobile
listar todos os livros
entrar em contato com a biblioteca
*/

/*

Para criar um migrate:
npx knex migrate:make create_books
isso gera um arquivo com um up que vai ser executado e um down que é tipo um catch se der errado

para alterar a migrate que já foi executada:
npx knex migrate:rollback (desfaz a última migrate executada)
*/