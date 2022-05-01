;
const crypto = require("crypto");

function generateSalt() {
    const salt = crypto.randomBytes(128).toString("base64");

    return salt;
}

function hashPassword(password, salt) {
    const passwordHash = crypto.createHmac("sha256", salt).update(password).digest("hex");

    return passwordHash;
}

module.exports = { generateSalt, hashPassword };