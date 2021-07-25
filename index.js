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
      const gold = Number(tds.eq(2).text());
      const silver = Number(tds.eq(3).text());
      const bronze = Number(tds.eq(4).text());
      const total_medals = Number(tds.eq(5).text());
      const total_rank = Number(tds.eq(6).text());
      console.log(country, gold, silver, bronze, total_medals, total_rank);
    });
  });
};

fetchData();
