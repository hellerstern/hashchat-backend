// ============================
//  Port
// ============================
process.env.PORT = process.env.PORT || 5000;

// ============================
//  Enviroment
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// ============================
//  Token expiration
// ============================
// 60 sec * 60 min * 24 hours * 30 days
process.env.TOKEN_EXPIRATION = 60 * 60 * 24 * 30;

// ============================
//  Authentication seed
// ============================
process.env.SEED = process.env.SEED || "dev-secret-seed";

// ============================
//  Data base
// ============================
let urlDB;
if (process.env.NODE_ENV === "dev") {
  urlDB =
    "mongodb+srv://jakussuperdev:123@monsternft-database.fl1qedg.mongodb.net/"
} else {
  urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;
