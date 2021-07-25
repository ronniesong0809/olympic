const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const stringify = require("csv-stringify");

const fetchData = () => {
  const url =
    "https://olympics.com/tokyo-2020/olympic-games/en/results/all-sports/medal-standings.htm";
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36"
  };

  return axios.get(url, headers).then(response => {
    const $ = cheerio.load(response.data);
    const data = [];

    $("#medal-standing > table > tbody > tr").each((_, tr) => {
      const tds = $(tr).find("td");
      const last_updated = Date.now();

      data.push({
        country: tds.eq(1).text().trim(),
        gold: Number(tds.eq(2).text()),
        silver: Number(tds.eq(3).text()),
        bronze: Number(tds.eq(4).text()),
        total_medals: Number(tds.eq(5).text()),
        total_rank: Number(tds.eq(6).text()),
        last_updated
      });
    });
    return data;
  });
};

const saveToFile = data => {
  fs.writeFileSync("./data/data.json", JSON.stringify(data, null, 2));

  stringify(data, (_, output) => {
    fs.writeFileSync("./data/data.csv", output);
  });
};

fetchData().then(data => {
  saveToFile(data);
});
