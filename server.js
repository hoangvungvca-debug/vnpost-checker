const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.get("/check/:code", async (req, res) => {

  const code = req.params.code;

  try {

    const url =
      `https://ems.com.vn/tra-cuu/tra-cuu-buu-gui?barcode=${code}`;

    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const html = response.data;

    const $ = cheerio.load(html);

    const bodyText = $("body").text();

    let status = "🚚 ĐANG GỬI";

    // ƯU TIÊN ĐÃ PHÁT
    if (
      bodyText.includes("Đã phát thành công") ||
      bodyText.includes("Đã phát hoàn thành công")
    ) {

      status = "✅ ĐÃ PHÁT THÀNH CÔNG";
    }

    // HOÀN THƯ
    else if (
      bodyText.includes("Hoàn về người gửi") ||
      bodyText.includes("Bưu gửi đã chuyển hoàn")
    ) {

      status = "❌ HOÀN THƯ";
    }

    // CÒN LẠI
    else {

      status = "🚚 ĐANG GỬI";
    }

    res.json({
      success: true,
      code: code,
      status: status
    });

  }

  catch(err) {

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