// const express = require("express");
import axios from 'axios';
// const cors = require("cors");
// const app = express();
// const port = process.env.PORT || 3000;

// app.use(cors());

exports.handler = async (event) => {
  try {
    const apiEndpoint =
      "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/";
    const apiKey = "a3f373377f111532";
    const params = {
      key: apiKey,
      lat: event.queryStringParameters.lat,
      lng: event.queryStringParameters.lng,
      range: event.queryStringParameters.range,
      genre: event.queryStringParameters.genre,
      start: event.queryStringParameters.start,
      format: "json",
    };
    const response = await axios.get(apiEndpoint, { params });
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error("Error while fetching HotPepper API:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({error: 'Internal Server Error'})
    };
  }
};


// // 以下のコマンドを打つ
// // $env:NODE_OPTIONS="--openssl-legacy-provider"


// app.get("/api/restaurant-data", async (req, res) => {
//   console.log("api-restaurant-data-tuka");
//   try {
//     const apiEndpoint =
//       "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/";
//     const apiKey = "a3f373377f111532";
//     const params = {
//       key: apiKey,
//       lat: req.query.lat,
//       lng: req.query.lng,
//       range: req.query.range,
//       genre: req.query.genre,
//       start: req.query.start,
//       format: "json",
//     };
//     console.log("restaurant-qpi-tuka");
//     const response = await axios.get(apiEndpoint, { params });
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error while fetching HotPepper API:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });