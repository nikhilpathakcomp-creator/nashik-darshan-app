
import { useState } from "react";
import "./CabBooking.css";

export default function CabBooking() {
  const [form, setForm] = useState({
    pickup: "",
    destination: "",
    date: "",
    time: "",
    passengers: "4",
    name: "",
  });

  const phone = "918805000425";
  const phone2 = "919270977468";
  const businessName = "KN KUNJ TOURS AND TRAVELS";
  const businessEmail = "kunj01596@gmail.com";

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleBooking = (event) => {
    event.preventDefault();

    const message = `
🚕 ${businessName}
NASHIK DARSHAN - ERTIGA CAB BOOKING

👤 Customer: ${form.name}
🚘 Car: Maruti Suzuki Ertiga
📍 Pickup: ${form.pickup}
🛕 Destination: ${form.destination}
📅 Travel Date: ${form.date}
🕒 Pickup Time: ${form.time}
👥 Passengers: ${form.passengers}

Please confirm availability and fare.

Contact: 9270977468 / 8805000425
Email: ${businessEmail}
    `;

    const whatsappURL =
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="cab-booking" id="cab-booking">
      <div className="cab-container">
        <div className="cab-heading">
          <span className="cab-label">{businessName}</span>

          <h2>Book Your Ertiga Cab 🚕</h2>

          <p>
            Explore Nashik, Trimbakeshwar, Panchavati and nearby
            tourist destinations comfortably with us.
          </p>

          <span className="cab-availability">
            ● Booking Enquiries Available 24×7
          </span>
        </div>

        <div className="cab-card">
          <div className="cab-car">
            <div className="cab-car-icon">🚙</div>

            <h3>Maruti Suzuki Ertiga</h3>

            <p>Comfortable family and group travel</p>

            <div className="cab-features">
              <span>✓ Family Trips</span>
              <span>✓ Nashik Darshan</span>
              <span>✓ Outstation Trips</span>
            </div>

            <div className="cab-contact-buttons">
              <a className="cab-call" href={`tel:+${phone}`}>
                📞 Call 8805000425
              </a>

              <a className="cab-call" href={`tel:+${phone2}`}>
                📞 Call 9270977468
              </a>

              <a
                className="cab-call"
                href={`mailto:${businessEmail}`}
              >
                ✉️ Email Us
              </a>

              <a
                className="cab-call"
                href={`https://wa.me/${phone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 WhatsApp Us
              </a>
            </div>

            <p className="cab-note">
              Business Email: {businessEmail}
            </p>
          </div>

          <form className="cab-form" onSubmit={handleBooking}>
            <h3>Cab Booking Enquiry</h3>

            <label htmlFor="cab-name">Your Name</label>
            <input
              id="cab-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              autoComplete="name"
              required
            />

            <label htmlFor="cab-pickup">Pickup Location</label>
            <input
              id="cab-pickup"
              name="pickup"
              type="text"
              value={form.pickup}
              onChange={handleChange}
              placeholder="e.g. Nashik Road Railway Station"
              required
            />

            <label htmlFor="cab-destination">Destination</label>
            <select
              id="cab-destination"
              name="destination"
              value={form.destination}
              onChange={handleChange}
              required
            >
              <option value="">Select destination</option>
              <option value="Trimbakeshwar Temple">
                Trimbakeshwar Temple
              </option>
              <option value="Panchavati and Ramkund">
                Panchavati and Ramkund
              </option>
              <option value="Pandav Leni">Pandav Leni</option>
              <option value="Sula Vineyards">Sula Vineyards</option>
              <option value="Harihar Fort">Harihar Fort</option>
              <option value="Nashik Full Darshan">
                Nashik Full Darshan
              </option>
              <option value="Other Destination">
                Other Destination
              </option>
            </select>

            <div className="cab-row">
              <div>
                <label htmlFor="cab-date">Travel Date</label>
                <input
                  id="cab-date"
                  type="date"
                  name="date"
                  min={new Date().toLocaleDateString("en-CA")}
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="cab-time">Pickup Time</label>
                <input
                  id="cab-time"
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <label htmlFor="cab-passengers">
              Number of Passengers
            </label>
            <select
              id="cab-passengers"
              name="passengers"
              value={form.passengers}
              onChange={handleChange}
            >
              <option value="1">1 Passenger</option>
              <option value="2">2 Passengers</option>
              <option value="3">3 Passengers</option>
              <option value="4">4 Passengers</option>
              <option value="5">5 Passengers</option>
              <option value="6">6 Passengers</option>
              <option value="7">7 Passengers</option>
            </select>

            <button className="cab-submit" type="submit">
              Book Ertiga on WhatsApp →
            </button>

            <p className="cab-note">
              Your booking details will be sent to WhatsApp
              on 8805000425. Your booking is confirmed only
              after availability and fare are verified.
            </p>
          </form>
        </div>

        <div className="cab-business-footer">
          <h3>{businessName}</h3>

          <p>
            Contact:{" "}
            <a href={`tel:+${phone2}`}>9270977468</a>
            {" / "}
            <a href={`tel:+${phone}`}>8805000425</a>
          </p>

          <p>
            Email:{" "}
            <a href={`mailto:${businessEmail}`}>
              {businessEmail}
            </a>
          </p>

          <p>Booking Enquiries Available 24×7</p>
        </div>
      </div>
    </section>
  );
}
