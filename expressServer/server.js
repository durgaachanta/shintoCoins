const express = require("express");
const app = express();
const axios = require("axios");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

var shintoCounter = 0;

// post route - UI makes a post call to save the number of coins mined
app.post('/mineorbuycoins/count/:coins/action/:action', (req, res) => {
  // api call to store data in Mockapi
  axios.post('http://5c983a812e1ca60014d60d43.mockapi.io/shintocoins', {
    Action: req.params.action,
    Count: req.params.coins,
  })
    .then((response) => {

      axios.get('http://5c983a812e1ca60014d60d43.mockapi.io/shintocoins')
        .then((response) => {
          var total = 0;
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].Action !== 'sell') {
              total = total + parseInt(response.data[i].Count);
            } else {
              total = total - parseInt(response.data[i].Count);
            }
          }
          res.json({
            status: "success",
            totalShintoCoins: total,
          });


        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });

})

//get route - to fetch the number of shinto coins owned
app.get('/ownedcoins', (req, res) => {
  // api call to calculate the total number of shinto coins
  axios.get('http://5c983a812e1ca60014d60d43.mockapi.io/shintocoins')
    .then((response) => {
      var total = 0;
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].Action !== 'sell') {
          total = total + parseInt(response.data[i].Count);
        } else {
          total = total - parseInt(response.data[i].Count);
        }
      }
      res.json({
        status: "success",
        ownedCoins: total,
      });

    })
    .catch((error) => {
      console.log(errror);
    });

})

//post route - UI makes a post call to sell coins
app.post('/sellcoins/:coins', (req, res) => {
  console.log(req.params.coins);
  //shintoCounter = shintoCounter - parseInt(req.params.coins);
  // api call to store data in Mockapi
  axios.post('http://5c983a812e1ca60014d60d43.mockapi.io/shintocoins', {
    Action: "sell",
    Count: req.params.coins,
  })
    .then((response) => {
      // api call to calculate the total number of shinto coins
      axios.get('http://5c983a812e1ca60014d60d43.mockapi.io/shintocoins')
        .then((response) => {
          var total = 0;
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].Action !== 'sell') {
              total = total + parseInt(response.data[i].Count);
            } else {
              total = total - parseInt(response.data[i].Count);
            }
          }
          res.json({
            status: "success",
            totalShintoCoins: total,
          });
        })
        .catch((error) => {
          console.log(errror);
        });
    })
    .catch((error) => {
      console.log(error);
    });

})

//get route - UI makes a get call to fetch all the transactions
app.get('/fetchledgerdata', (req, res) => {
  axios.get('http://5c983a812e1ca60014d60d43.mockapi.io/shintocoins')
    .then((response) => {
      console.log(response);
      res.json({
        status: "success",
        ledgerdata: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });

})

//get route - UI makes a call to fetch individual record
app.get('/fetchrecord/:id', (req, res) => {
  axios.get(`http://5c983a812e1ca60014d60d43.mockapi.io/shintocoins/${req.params.id}`)
    .then((response) => {
      res.json({
        status: "success",
        detaildata: response.data,
      });

    })
    .catch((error) => {
      console.log(error);
    })
})

app.use(express.static(__dirname + '../../shintoapp/build/'));
app.listen(1337);