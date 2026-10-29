import { useState } from "react";
import "./HotelBooking.css";

export default function HotelBooking() {
  const [form, setForm] = useState({
    location: "Nashik",
    checkIn: "",
    checkOut: "",
    guests: "2",
    rooms: "1",
    budget: "Any Budget",
    hotelType: "Any Type",
    name: "",
  });

  const phone = "918805000425";
  const email = "kunj01596@gmail.com";

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleBooking = (event) => {
    event.preventDefault();

    const message = `
🏨 HOTEL BOOKING ENQUIRY

Travel Assistance: KN KUNJ TOURS AND TRAVELS

Customer: ${form.name}
Location: ${form.location}
Check-in: ${form.checkIn}
Check-out: ${form.checkOut}
Guests: ${form.guests}
Rooms: ${form.rooms}
Budget: ${form.budget}
Hotel Type: ${form.hotelType}

Please help me find a suitable hotel.
Please confirm availability and room rates.

Contact: 9270977468 / 8805000425
Email: ${email}
`;

    const url =
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const searchHotels = () => {
    const query = encodeURIComponent(
      `${form.hotelType === "Any Type" ? "" : form.hotelType + " "}hotels in ${form.location}`
    );

    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="hotel-booking" id="hotel-booking">
      <div className="hotel-container">

        <div className="hotel-heading">
          <span className="hotel-label">
            NASHIK DARSHAN
          </span>

          <h2>Find Your Perfect Stay 🏨</h2>

          <p>
            Find hotels for your Nashik trip and send a booking
            enquiry to KN KUNJ TOURS AND TRAVELS.
          </p>

          <span className="hotel-availability">
            ● Booking Enquiries Available 24×7
          </span>
        </div>

        <div className="hotel-layout">

          <div className="hotel-info">
            <div className="hotel-icon">🏨</div>

            <h3>Explore Hotels in Nashik</h3>

            <p>
              Search for budget stays, family hotels and premium
              accommodation near your preferred destination.
            </p>

            <div className="hotel-benefits">
              <div>✓ Hotel Search on Google Maps</div>
              <div>✓ Check-in and Check-out Dates</div>
              <div>✓ Room and Guest Selection</div>
              <div>✓ WhatsApp Booking Enquiry</div>
              <div>✓ Ertiga Cab Booking Available</div>
            </div>

            <button
              type="button"
              className="hotel-search-button"
              onClick={searchHotels}
            >
              📍 Explore Hotels on Maps
            </button>

            <div className="hotel-contact">
              <h4>KN KUNJ TOURS AND TRAVELS</h4>

              <a href="tel:+919270977468">
                📞 9270977468
              </a>

              <a href="tel:+918805000425">
                📞 8805000425
              </a>

              <a href={`mailto:${email}`}>
                ✉️ {email}
              </a>
            </div>
          </div>

          <form
            className="hotel-form"
            onSubmit={handleBooking}
          >
            <h3>Hotel Booking Enquiry</h3>

            <label htmlFor="hotel-name">
              Your Name
            </label>

            <input
              id="hotel-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />

            <label htmlFor="hotel-location">
              Preferred Location
            </label>

            <select
              id="hotel-location"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
            >
              <option value="Nashik">Nashik City</option>
              <option value="Trimbakeshwar">Trimbakeshwar</option>
              <option value="Panchavati Nashik">Panchavati</option>
              <option value="Nashik Road">Nashik Road</option>
              <option value="Igatpuri">Igatpuri</option>
              <option value="Sula Vineyards Nashik">
                Sula Vineyards Area
              </option>
            </select>

            <div className="hotel-form-row">
              <div>
                <label htmlFor="hotel-checkin">
                  Check-in
                </label>

                <input
                  id="hotel-checkin"
                  type="date"
                  name="checkIn"
                  min={new Date().toLocaleDateString("en-CA")}
                  value={form.checkIn}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="hotel-checkout">
                  Check-out
                </label>

                <input
                  id="hotel-checkout"
                  type="date"
                  name="checkOut"
                  min={form.checkIn || new Date().toLocaleDateString("en-CA")}
                  value={form.checkOut}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="hotel-form-row">
              <div>
                <label htmlFor="hotel-guests">
                  Guests
                </label>

                <select
                  id="hotel-guests"
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={String(n)}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="hotel-rooms">
                  Rooms
                </label>

                <select
                  id="hotel-rooms"
                  name="rooms"
                  value={form.rooms}
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={String(n)}>
                      {n} {n === 1 ? "Room" : "Rooms"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label htmlFor="hotel-budget">
              Budget per Night
            </label>

            <select
              id="hotel-budget"
              name="budget"
              value={form.budget}
              onChange={handleChange}
            >
              <option value="Any Budget">Any Budget</option>
              <option value="Below ₹1000">Below ₹1,000</option>
              <option value="₹1000–₹2000">₹1,000–₹2,000</option>
              <option value="₹2000–₹4000">₹2,000–₹4,000</option>
              <option value="Above ₹4000">Above ₹4,000</option>
            </select>

            <label htmlFor="hotel-type">
              Preferred Hotel Type
            </label>

            <select
              id="hotel-type"
              name="hotelType"
              value={form.hotelType}
              onChange={handleChange}
            >
              <option value="Any Type">Any Type</option>
              <option value="Budget">Budget Hotel</option>
              <option value="Family">Family Hotel</option>
              <option value="Premium">Premium Hotel</option>
              <option value="Business">Business Hotel</option>
            </select>

            <button
              type="submit"
              className="hotel-submit"
            >
              Send Enquiry on WhatsApp →
            </button>

            <p className="hotel-note">
              This form sends an enquiry, not a confirmed reservation.
              Hotel availability and final prices must be confirmed
              before booking.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}