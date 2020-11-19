
exports.up = function(knex) {
    return knex.schema.createTable('books', function (table) {
        table.increments(); /* autoincrement */
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('price').notNullable();
        
        table.string('library_id').notNullable();
        
        table.foreign('library_id').references('id').inTable('libraries');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('books')
  
};
