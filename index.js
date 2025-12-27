const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const ServiceSchema = new mongoose.Schema({
  name: String,
  category: String,
  address: String,
  latitude: Number,
  longitude: Number
});

const Service = mongoose.model("Service", ServiceSchema);

// Get all services
app.get("/services", async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

// Add service
app.post("/services", async (req, res) => {
  const service = new Service(req.body);
  await service.save();
  res.json(service);
});

// Delete service
app.delete("/services/:id", async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});


