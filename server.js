const express = require("express");

const app = express();

app.get("/check/:code", async (req, res) => {

  const code = req.params.code;

  let status = "🚚 ĐANG GỬI";

  /*
  ========================================
  DEMO TEST THẬT
  ========================================
  */

  const deliveredCodes = [

    "EO793894515VN"

  ];

  const shippingCodes = [

    "EO793893917VN"

  ];

  if (
    deliveredCodes.includes(code)
  ) {

    status =
      "✅ ĐÃ PHÁT THÀNH CÔNG";
  }

  else if (
    shippingCodes.includes(code)
  ) {

    status =
      "🚚 ĐANG GỬI";
  }

  res.json({

    success: true,

    code: code,

    status: status

  });

});

const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log("Server running");
});
