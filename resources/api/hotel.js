// const express = require("express");
import axios from 'axios';
// const cors = require("cors");
// const app = express();
// const port = process.env.PORT || 3000;

// app.use(cors());

// // 以下のコマンドを打つ
// // $env:NODE_OPTIONS="--openssl-legacy-provider"

exports.handler = async (event) => {
  try {
    const apiEndpoint =
      "https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426";
    const apiKey = "1096600551356603387";
    const params = {
      applicationId: apiKey,
      latitude: event.queryStringParameters.latitude,
      longitude: event.queryStringParameters.longitude,
      searchRadius: event.queryStringParameters.searchRadius,
      datumType: "1",
      format: "json",
    };
    const response = await axios.get(apiEndpoint, { params });
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Error while fetching HotPepper API:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};

// app.get("/api/hotel-data", async (req, res) => {
//   console.log("api-hotel-data-tuka");
//   try {
//     const apiEndpoint =
//       "https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426";
//     const apiKey = "1096600551356603387";
//     const params = {
//       applicationId: apiKey,
//       latitude: req.query.latitude,
//       longitude: req.query.longitude,
//       searchRadius: req.query.searchRadius,
//       datumType: "1",
//       format: "json",
//     };
//     const response = await axios.get(apiEndpoint, { params });
//     console.log("hotel-qpi-tuka");
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error while fetching HotPepper API:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// exports.handler = async (event) => {

// }
