const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long"
  }).toLowerCase();

  let data = {};

  if (fs.existsSync("jadwal.json")) {
    data = JSON.parse(fs.readFileSync("jadwal.json"));
  }

  const jadwalHariIni = data[today];

  if (!jadwalHariIni) {
    return res.json({
      fulfillmentText: `Tidak ada jadwal untuk hari ${today}`
    });
  }

  let hasil = `Hari ini (${today}):\n`;

  jadwalHariIni.forEach(j => {
    hasil += `- ${j.mapel} jam ${j.jam}\n`;
  });

  return res.json({
    fulfillmentText: hasil
  });

});

app.get("/", (req,res)=>{
  res.send("Webhook aktif");
});

app.listen(3000);
