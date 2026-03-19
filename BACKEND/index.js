const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'https://vasavi-traders-website-3gpu.vercel.app',
    'http://localhost:5173',
  ],
  credentials: true,
}));
app.use(express.json());

// Basic health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Vasavi Traders API is running" });
});

// Products endpoint
app.get("/api/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        brand: true,
      },
    });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Reservation endpoint
app.post("/api/reservations", async (req, res) => {
  const { name, phone, productId, quantity, pickupDate } = req.body;
  try {
    const reservation = await prisma.reservation.create({
      data: {
        name,
        phone,
        productId,
        quantity,
        pickupDate: new Date(pickupDate),
      },
    });
    res.json({ message: "Your reservation request has been received. Our team will contact you shortly.", reservation });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ error: "Failed to create reservation" });
  }
});

// Start Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
