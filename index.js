const axios = require("axios");
const cheerio = require("cheerio");

const fetchData = () => {
  const url =
    "https://olympics.com/tokyo-2020/olympic-games/en/results/all-sports/medal-standings.htm";

  axios.get(url).then(response => {
    const $ = cheerio.load(response.data);

    $("#medal-standing > table > tbody > tr").each((_, tr) => {
      const tds = $(tr).find("td");
      const country = tds.eq(1).text().trim();
      const gold = tds.eq(2).text().trim();
      const silver = tds.eq(3).text().trim();
      const bronze = tds.eq(4).text().trim();
      const total_medals = tds.eq(5).text().trim();
      const total_rank = tds.eq(6).text().trim();
      console.log(country, gold, silver, bronze, total_medals, total_rank);
    });
  });
};

fetchData();
