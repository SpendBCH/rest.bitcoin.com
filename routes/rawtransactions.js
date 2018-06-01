let express = require('express');
let router = express.Router();

let BITBOXCli = require('bitbox-cli/lib/bitbox-cli').default;
let BITBOX = new BITBOXCli();

router.get('/', function(req, res, next) {
  res.json({ status: 'rawtransactions' });
});

router.get('/decodeRawTransaction/:hex', function(req, res, next) {
  BITBOX.RawTransactions.decodeRawTransaction(req.params.hex)
  .then((result) => {
    res.json(result);
  }, (err) => { console.log('asdf', err);
  });
});

router.get('/decodeScript/:script', function(req, res, next) {
  BITBOX.RawTransactions.decodeScript(req.params.script)
  .then((result) => {
    res.json(result);
  }, (err) => { console.log(err);
  });
});

router.get('/getRawTransaction/:txid', function(req, res, next) {
  let verbose = false;
  if(req.query.verbose && req.query.verbose === 'true') {
    verbose = true;
  }
  BITBOX.RawTransactions.getRawTransaction(req.params.txid, verbose)
  .then((result) => {
    res.json(result);
  }, (err) => { console.log(err);
  });
});

router.post('/sendRawTransaction/:hex', function(req, res, next) {
  BITBOX.RawTransactions.sendRawTransaction(req.params.hex)
  .then((result) => {
    res.json(result);
  }, (err) => { console.log(err);
  });
});

module.exports = router;
