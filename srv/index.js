const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/api/restaurant-data", async (req, res) => {
  console.log("api-restaurant-data-tuka");
  try {
    const apiEndpoint =
      "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/";
    const apiKey = "a3f373377f111532";
    const params = {
      key: apiKey,
      lat: req.query.lat,
      lng: req.query.lng,
      range: req.query.range,
      genre: req.query.genre,
      start: req.query.start,
      format: "json",
    };
    console.log("restaurant-qpi-tuka");
    const response = await axios.get(apiEndpoint, { params });
    res.json(response.data);
  } catch (error) {
    console.error("Error while fetching HotPepper API:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/hotel-data", async (req, res) => {
  console.log("api-hotel-data-tuka");
  try {
    const apiEndpoint =
      "https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426";
    const apiKey = "1096600551356603387";
    const params = {
      applicationId: apiKey,
      latitude: req.query.latitude,
      longitude: req.query.longitude,
      searchRadius: req.query.searchRadius,
      datumType: "1",
      format: "json",
    };
    const response = await axios.get(apiEndpoint, { params });
    console.log("hotel-qpi-tuka");
    res.json(response.data);
  } catch (error) {
    console.error("Error while fetching HotPepper API:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});