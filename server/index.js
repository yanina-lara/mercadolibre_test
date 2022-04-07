const express = require('express');
const cors = require('cors');
const URL_API = 'https://api.mercadolibre.com';
const axios = require('axios');
const app = express();
const PORT = 4000;

var addUser = function (req, res, next) {
  const author = {
    name: 'Yanina',
    lastname: 'Lara'
  }
  req.author = author;
  next();
};

app.use(cors());
app.use(addUser);

app.get('/api/items', (req, res) => {
  const author = req.author
  const query = req.query.q;
  axios.get(`${URL_API}/sites/MLA/search?q=:${query}`)
    .then(({
      data: {
        filters,
        results
      }
    }) => {
      let categories = filters.find(({ id }) => id === 'category');
      categories = categories ? categories.values[0].path_from_root.map(({ name }) => name) : [];

      const items = results.splice(0, 4).map(({
        id,
        title,
        price,
        currency_id,
        thumbnail,
        condition,
        shipping,
        address
      }) => {
        const arrayPrice = String(price).split('.');
        const amount = Number(arrayPrice[0]);
        const decimals = arrayPrice[1] ? `${arrayPrice[1][0] || '0'}${arrayPrice[1][1] || '0'}` : '00';
        return { 
          id,
          title,
          condition,
          picture: thumbnail,
          free_shipping: shipping.free_shipping,
          origin: address.state_name,
          price: {
            currency: currency_id,
            amount,
            decimals
          }
        }
      });
 
    res.status(200).send({ author, categories, items });
  
  });
});


app.get('/api/items/:id', (req, res) => {
  console.log(req.params.id)
  const productId = req.params.id;
  const author = req.author
  axios.all([
    axios.get(`${URL_API}/items/${productId}`),
    axios.get(`${URL_API}/items/${productId}/description`)
  ])
  .then(axios.spread(({
    data: { 
      price,
      id,
      title,
      currency_id,
      thumbnail,
      condition,
      sold_quantity,
      category_id,
      shipping: {
        free_shipping
      }
    }}, {
      data: {
        plain_text
      }
    }) => {
    const arrayPrice = String(price).split('.');
    const amount = Number(arrayPrice[0]);
    const decimals = arrayPrice[1] ? `${arrayPrice[1][0] || '0'}${arrayPrice[1][1] || '0'}` : '00';
    const item = {
      id,
      title,
      price: {
        amount,
        decimals,
      },
      picture: thumbnail,
      condition,
      free_shipping,
      sold_quantity,
      description: plain_text,
      category_id
    }

    return { author, item};
  }))
  .then(({ author, item }) => {
    if(item.category_id) {
      axios.get(`${URL_API}/categories/${item.category_id}`)
      .then(({ data: { path_from_root } }) => {
        item.categories = path_from_root.map(cat => cat.name);
        delete item.category_id;
        res.status(200).send({ author, item });
      })
      .catch(err => {
        delete item.category_id;
        item.categories = [];
        res.status(200).send({ author, item });
      });
    } else {
      item.categories = [];
      res.status(200).send({ author, item });
    }
  })
  .catch(err => res.status(400).send(err));
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en el puerto ${PORT}`);
});

