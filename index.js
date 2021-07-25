const axios = require("axios");
const cheerio = require("cheerio");

const fetchData = () => {
  const url =
    "https://olympics.com/tokyo-2020/olympic-games/en/results/all-sports/medal-standings.htm";

  axios.get(url).then(response => {
    const $ = cheerio.load(response.data);

    const trs = $("#medal-standing > table > tbody > tr");
    const td = $(trs[0]).find('td')
    console.log(td.toString());
  });
};

fetchData();
