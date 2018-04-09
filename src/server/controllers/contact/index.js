const express = require('express');
const axios = require('axios');
const qs = require('querystring');

const router = express.Router();

router.post('/create-or-update', (req, res) => {
  const apiKey = process.env.HUBSPOT_API_KEY;
  const url = `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${req.body.email}/?hapikey=${apiKey}`;

  axios({
    method: 'post',
    url: url,
    data:
      {"properties": [
        {
          "property": "firstname",
          "value": req.body.firstName
        },
        {
          "property": "lastname",
          "value": req.body.lastName
        },
        {
          "property": "website",
          "value": req.body.website
        },
        {
          "property": "company",
          "value": req.body.company
        },
        {
          "property": "phone",
          "value": req.body.phone
        },
        {
          "property": "address",
          "value": req.body.address
        },
        {
          "property": "city",
          "value": req.body.city
        },
        {
          "property": "state",
          "value": req.body.state
        },
        {
          "property": "zip",
          "value": req.body.zip
        }
      ] },
  }).then((response) => {
    console.log(response.data);
  });
});


module.exports = router;
