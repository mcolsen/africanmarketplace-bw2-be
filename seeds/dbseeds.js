
exports.seed = function(knex) {
  // Deletes ALL existing entries
  knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'user1', password: 'password', role: 'user'},
        {id: 2, username: 'user2', password: 'password', role: 'user'},
        {id: 3, username: 'user3', password: 'password', role: 'user'}
      ]);
    });
  knex('profile').truncate()
  .then(function () {
    // Inserts seed entries
    return knex('profile').insert([
      {id: 1, user_id: 1, business: 'Schmergama Industries', email: 'user1@users.net'},
      {id: 2, user_id: 2, business: 'Learnda School', email: 'user2@lambdastudents.scam'},
      {id: 3, user_id: 3, business: 'Cannabiz', email: 'hiiiiigh@sohigh.hi'}
    ]);
  });
  return knex('listings').truncate()
  .then(function () {
    // Inserts seed entries
    return knex('listings').insert([
      {
        id: 1, profile_id: 1,
        item: 'Schmergama',
        description: 'Real Schmergama, fresh grown.',
        price: 420, amount: 12,
        location: 'Burundi'
      },
      {
        id: 2, profile_id: 1,
        item: 'Schmergama',
        description: 'Fake Schmergama, lab grown.',
        price: 100, amount: 69,
        location: 'Swaziland'
      },
      {
        id: 3, profile_id: 2,
        item: 'Oats',
        description: 'Real oats, steel cut.',
        price: 10, amount: 10000,
        location: 'Nigeria'
      },
      {
        id: 4, profile_id: 3,
        item: 'Cannabis',
        description: 'Sativa, Northern Lights.',
        price: 220, amount: 45,
        location: 'South Sudan'
      },
      {
        id: 5, profile_id: 3,
        item: 'Rice',
        description: 'Jasmine Rice, medium grain.',
        price: 15, amount: 62,
        location: 'Madagascar'
      },
      {
        id: 6, profile_id: 3,
        item: 'Opium',
        description: 'Sweet Black Pony',
        price: 300, amount: 12,
        location: 'Morroco'
      },
    ]);
  });
};
