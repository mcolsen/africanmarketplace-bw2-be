exports.up = function (knex) {
    return knex.schema
      .createTable("roles", tbl => {
        tbl.increments();
  
        tbl.string("name", 128)
          .notNullable()
          .unique()
          .default("user")
      })
      .createTable("users", tbl => {
        tbl.increments();
  
        tbl.string("username", 128).notNullable().unique().index();
        tbl.string("password", 256).notNullable();
  
        tbl.integer("role")
          .unsigned()
          .references("roles.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      })
      .createTable("profile", tbl => {
        tbl.increments();
        tbl.string("name", 64).notNullable();
        tbl.string("email", 128).notNullable();
        tbl.string("business", 128)
        tbl.integer("user_id")
          .unsigned()
          .references("users.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      }) 
      .createTable("listings", tbl => {
        tbl.increments();
        tbl.string("item", 64).notNullable();
        tbl.string("description", 256).notNullable();
        tbl.integer("price").notNullable();
        tbl.integer("amount").notNullable();
        tbl.string("location", 64).notNullable();
        tbl.integer("profile_id")
          .unsigned()
          .references("profile.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      })
      ;
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("roles")
      .dropTableIfExists("listings")
      .dropTableIfExists("profile")
      .dropTableIfExists("users");
  };