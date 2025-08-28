const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const strCompress = 'Hello Factipjs';
  return res.status(200).json({
    message: 'Welcome Fantipjs!',
    metadata: strCompress.repeat(1000) // was 10000; reduce to avoid huge payloads
  });
});

module.exports = router;