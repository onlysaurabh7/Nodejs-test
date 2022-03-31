const jwt = require("jsonwebtoken");
const tokenLength = 2;
module.exports = {
  VerifyToken: async (req, res, next) => {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return res.sendStatus(401);
    } else {
      let token = authorization.split(" ");
      if (token == null) return res.sendStatus(401);
      let length = token.length;
      if (length == tokenLength && token[0].toLowerCase() == "bearer") {
        let accessToken = token[1];

        await jwt.verify(accessToken, "secret", async (err, data) => {
          if (err) return res.status(403).json({ message: "invalid token" });
          if (data) {
            req.user = data;
            next();
          }
        });
      } else {
        req.user = undefined;
        next();
      }
    }
  },
};