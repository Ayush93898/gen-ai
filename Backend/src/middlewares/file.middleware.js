const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(), // resume ko temp rakh lege
  limits: {
    fileSize: 3 * 1024 * 1024, // 3mb
  },
});

module.exports = upload