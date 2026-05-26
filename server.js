const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.get("/check/:code", async (req, res) => {

  const code = req.params.code;

  try {

    const url =
      `https://viettelpost.com.vn/tra-cuu-hanh-trinh-don/?billcode=${code}`;

    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const html = response.data;

    const $ = cheerio.load(html);

    const bodyText = $("body").text();

    let status = "🚚 ĐANG GỬI";

    if (bodyText.includes("Phát thành công")) {
      status = "✅ ĐÃ PHÁT THÀNH CÔNG";
    }

    else if (bodyText.includes("Hoàn")) {
      status = "❌ HOÀN THƯ";
    }

    else if (bodyText.includes("Đã nhận")) {
      status = "📦 NGƯỜI NHẬN ĐÃ NHẬN";
    }

    res.json({
      success: true,
      code: code,
      status: status
    });

  } catch(err) {

    res.json({
      success: false,
      error: err.toString()
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running");
});