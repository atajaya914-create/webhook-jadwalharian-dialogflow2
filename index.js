const express = require("express");
const app = express();

app.use(express.json());

const jadwal = {
  senin: { 1: "Matematika", 2: "Bahasa Indonesia" },
  selasa: { 1: "IPS", 2: "Bahasa Inggris" }
};

app.post("/webhook", (req, res) => {
  const intent = req.body.queryResult.intent.displayName;
  const hari = req.body.queryResult.parameters.hari;
  const jam = req.body.queryResult.parameters.jam;

  if (intent === "TanyaJadwal") {
    if (jadwal[hari] && jadwal[hari][jam]) {
      return res.json({
        fulfillmentText: `Hari ${hari} jam ${jam} adalah ${jadwal[hari][jam]}`
      });
    } else {
      return res.json({
        fulfillmentText: "Jadwal tidak ditemukan."
      });
    }
  }
});

app.listen(3000, () => console.log("Server berjalan"));
