const express = require('express');
const axios = require('axios');
const qs = require('querystring');

const router = express.Router();

router.post('/create-or-update', (req, res) => {
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const apiKey = process.env.HUBSPOT_API_KEY;
  const url = `https://forms.hubspot.com/uploads/form/v2/${'4463208'}/${'d7db270f-59d5-435d-af06-80845b064e37'}`;
  const data = qs.stringify({
    'email': req.body.email,
    'firstname': req.body.firstname,
    'lastname': req.body.lastname,
    'website': req.body.website,
    'company': req.body.company,
    'phone': req.body.phone,
    'address': req.body.address,
    'city': req.body.city,
    'state': req.body.state,
    'zip': req.body.zip,
    'hs_context': JSON.stringify({
        "hutk": req.body.trackingCookie,
        "ipAddress": ipAddress,
        "pageName": "HubSpot Demo Form"
      })
    });
  axios({
    method: 'post',
    url: url,
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length,
    },
  }).then((response) => {
    console.log(response);
  });
});


module.exports = router;

// {"properties": [
//   {
//     "property": "firstname",
//     "value": req.body.firstName
//   },
//   {
//     "property": "lastname",
//     "value": req.body.lastName
//   },
//   {
//     "property": "website",
//     "value": req.body.website
//   },
//   {
//     "property": "company",
//     "value": req.body.company
//   },
//   {
//     "property": "phone",
//     "value": req.body.phone
//   },
//   {
//     "property": "address",
//     "value": req.body.address
//   },
//   {
//     "property": "city",
//     "value": req.body.city
//   },
//   {
//     "property": "state",
//     "value": req.body.state
//   },
//   {
//     "property": "zip",
//     "value": req.body.zip
//   }
// ] },
