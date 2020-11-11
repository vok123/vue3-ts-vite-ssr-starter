const express = require('express');
const server = express();
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE');
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
  next();
});
server.get('/list', (req, res) => {
  const names = ['Orange', 'Apricot', 'Apple', 'Plum', 'Pear', 'Pome', 'Banana', 'Cherry', 'Grapes', 'Peach'];

  const list = names.map((name, id) => {
    return {
      id: ++id,
      name,
      price: Math.ceil(Math.random() * 100)
    };
  });

  res.end(JSON.stringify({ code: 0, data: list, message: '' }));
});

server.listen(5656, () => {
  console.log('listen at http://localhos:5656/');
});
