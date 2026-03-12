const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { encrypt } = require("./ccavutil");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 10000;

/* YOUR CCAvenue LIVE CREDENTIALS */

const ACCESS_CODE = "AVNL88NB75BW20LNWB";
const WORKING_KEY = "E7A71DCB36FF62900E5FC1890B75E764";
const MERCHANT_ID = "4421290";

/* API matching your ASP.NET endpoint */

app.post("/Services/Billing_Service.svc/ccavRequestMobileApp", (req, res) => {
  try {
    const data = req.body;

    const orderId = "ORD_" + Date.now();

    const redirectUrl =
      "https://www.elabassist.com/Administration/Masters/ccavResponseHandler.aspx";

    const cancelUrl =
      "https://www.elabassist.com/Administration/Masters/ccavResponseHandler.aspx";

    const requestData =
      "merchant_id=" +
      MERCHANT_ID +
      "&order_id=" +
      orderId +
      "&currency=INR" +
      "&amount=" +
      data.Amount +
      "&redirect_url=" +
      redirectUrl +
      "&cancel_url=" +
      cancelUrl +
      "&billing_tel=" +
      data.mobileNumber;

    const encRequest = encrypt(requestData, WORKING_KEY);

    res.json({
      d: {
        __type: "PaymentRequestObject:#PearlSolution.Business.Entities",
        access_code: ACCESS_CODE,
        cancel_url: cancelUrl,
        enc_val: encRequest,
        order_id: orderId,
        redirect_url: redirectUrl,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
