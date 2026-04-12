const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://saniprath123_db_user:cLa86Pn53qjI6Dea@ac-cchboh5-shard-00-00.tkin7eb.mongodb.net:27017,ac-cchboh5-shard-00-01.tkin7eb.mongodb.net:27017,ac-cchboh5-shard-00-02.tkin7eb.mongodb.net:27017/?ssl=true&replicaSet=atlas-8edkoq-shard-0&authSource=admin&appName=Cluster0");
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Error:", err);
    process.exit(1); // STOP server if DB fails
  }
  
}

module.exports = connectDB;