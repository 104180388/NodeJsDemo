const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const strCompress = 'Hello Factipjs';
  return res.status(200).json({
    message: 'Welcome Fantipjs!',
  });
});

module.exports = router;