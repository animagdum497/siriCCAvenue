const crypto = require("crypto");

function encrypt(plainText, workingKey) {
  const iv = Buffer.from([
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
    0x0c, 0x0d, 0x0e, 0x0f,
  ]);

  const key = Buffer.from(workingKey.substr(0, 16));

  const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);

  let enc = cipher.update(plainText, "utf8", "hex");
  enc += cipher.final("hex");

  return enc;
}

module.exports = { encrypt };
