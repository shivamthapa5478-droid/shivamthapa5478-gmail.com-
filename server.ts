import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Booking/Enquiry
  app.post("/api/enquiry", async (req, res) => {
    const { pickup, drop, date, time, mobile, email, vehicle, source } = req.body;

    console.log("Received enquiry:", req.body);

    // Validate required fields
    if (!pickup || !drop || !mobile || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Configure mail transporter
      // Note: User will need to provide EMAIL_USER and EMAIL_PASS in .env
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS, // Use App Password for Gmail
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "nyravtoursandtravels.com", // Target email mentioned by user
        subject: `New Booking Enquiry from ${source || 'Website'}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #059669;">New Travel Enquiry</h2>
            <p><strong>From:</strong> ${source || 'General Form'}</p>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0;"><strong>Pickup:</strong></td><td>${pickup}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Drop:</strong></td><td>${drop}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Date:</strong></td><td>${date || 'Not specified'}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Time:</strong></td><td>${time || 'Not specified'}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Mobile:</strong></td><td>${mobile}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Email:</strong></td><td>${email}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Vehicle:</strong></td><td>${vehicle || 'Any'}</td></tr>
            </table>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">
              This enquiry was sent from the NYRAV TOURS AND TRAVELS website.
            </p>
          </div>
        `,
      };

      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        res.json({ message: "Enquiry sent successfully via email" });
      } else {
        console.warn("EMAIL_USER or EMAIL_PASS not set. Email not sent.");
        // We still return success to the client in Dev if keys are missing but log it
        res.json({ message: "Enquiry received (Simulation: Setup keys to send real email)" });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send enquiry" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
