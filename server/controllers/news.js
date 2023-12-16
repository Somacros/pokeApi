const fetch = require('node-fetch');

const getNews = async (req, res) => {

  try {
    const fetchData = await fetch(`https://newsapi.org/v2/everything?q=
    +pokemon OR "pokemon anime" OR "pokemon event" OR pikachu
    &language=en&pageSize=10&apiKey=${process.env.NEWS_APP_KEY}&page=1`);
    const news = await fetchData.json();


    res.json(news);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

module.exports = {
  getNews
}