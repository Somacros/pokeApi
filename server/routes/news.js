const { Router } = require('express');
const { getNews } = require('../controllers/news');

const router = Router();

router.get('/news', getNews);

module.exports = router;