
import { useState } from "react";
import "./TripCostCalculator.css";

export default function TripCostCalculator() {
  const [days, setDays] = useState(2);
  const [people, setPeople] = useState(4);
  const [rooms, setRooms] = useState(1);
  const [hotelPerNight, setHotelPerNight] = useState(2000);
  const [cabPerDay, setCabPerDay] = useState(2500);
  const [foodPerPerson, setFoodPerPerson] = useState(500);
  const [includeCab, setIncludeCab] = useState(true);
  const [includeHotel, setIncludeHotel] = useState(true);
  const [includeFood, setIncludeFood] = useState(true);

  const tripDays = Math.max(1, Number(days) || 1);
  const travelers = Math.max(1, Number(people) || 1);
  const roomCount = Math.max(1, Number(rooms) || 1);

  const hotelCost = includeHotel
    ? roomCount * Math.max(0, Number(hotelPerNight) || 0) * tripDays
    : 0;

  const cabCost = includeCab
    ? Math.max(0, Number(cabPerDay) || 0) * tripDays
    : 0;

  const foodCost = includeFood
    ? travelers * Math.max(0, Number(foodPerPerson) || 0) * tripDays
    : 0;

  const total = hotelCost + cabCost + foodCost;
  const perPerson = total / travelers;

  const money = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const handleEnquiry = () => {
    const message = `
💰 NASHIK DARSHAN - TRIP COST ENQUIRY

Trip Duration: ${tripDays} day(s)
Travelers: ${travelers}
Rooms: ${includeHotel ? roomCount : "Not required"}

Hotel Estimate: ${money(hotelCost)}
Ertiga Cab Estimate: ${money(cabCost)}
Food Estimate: ${money(foodCost)}

Estimated Total: ${money(total)}
Estimated Per Person: ${money(perPerson)}

Please confirm availability and final prices.

KN KUNJ TOURS AND TRAVELS
Contact: 9270977468 / 8805000425
Email: kunj01596@gmail.com
`;

    const url =
      "https://wa.me/918805000425?text=" +
      encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="trip-calculator" id="trip-cost-calculator">
      <div className="trip-calculator-container">
        <div className="trip-calculator-heading">
          <span className="trip-calculator-label">
            PLAN YOUR NASHIK TRIP
          </span>

          <h2>Trip Cost Calculator 💰</h2>

          <p>
            Estimate your hotel, cab and food expenses before
            exploring Nashik.
          </p>
        </div>

        <div className="trip-calculator-grid">
          <div className="trip-calculator-form">
            <h3>Customize Your Trip</h3>

            <label htmlFor="trip-days">
              Trip Duration (Days)
            </label>
            <input
              id="trip-days"
              type="number"
              min="1"
              max="30"
              value={days}
              onChange={(e) =>
                setDays(Math.min(30, Math.max(1, Number(e.target.value) || 1)))
              }
            />

            <label htmlFor="trip-people">
              Number of Travelers
            </label>
            <input
              id="trip-people"
              type="number"
              min="1"
              max="50"
              value={people}
              onChange={(e) =>
                setPeople(Math.min(50, Math.max(1, Number(e.target.value) || 1)))
              }
            />

            <div className="trip-calculator-option">
              <input
                id="include-hotel"
                type="checkbox"
                checked={includeHotel}
                onChange={(e) => setIncludeHotel(e.target.checked)}
              />
              <label htmlFor="include-hotel">Include Hotel</label>
            </div>

            {includeHotel && (
              <>
                <label htmlFor="trip-rooms">Number of Rooms</label>
                <input
                  id="trip-rooms"
                  type="number"
                  min="1"
                  max="20"
                  value={rooms}
                  onChange={(e) =>
                    setRooms(Math.min(20, Math.max(1, Number(e.target.value) || 1)))
                  }
                />

                <label htmlFor="hotel-price">
                  Hotel Price per Room / Night (₹)
                </label>
                <input
                  id="hotel-price"
                  type="number"
                  min="0"
                  value={hotelPerNight}
                  onChange={(e) =>
                    setHotelPerNight(Math.max(0, Number(e.target.value) || 0))
                  }
                />
              </>
            )}

            <div className="trip-calculator-option">
              <input
                id="include-cab"
                type="checkbox"
                checked={includeCab}
                onChange={(e) => setIncludeCab(e.target.checked)}
              />
              <label htmlFor="include-cab">
                Include Ertiga Cab
              </label>
            </div>

            {includeCab && (
              <>
                <label htmlFor="cab-price">
                  Cab Price per Day (₹)
                </label>
                <input
                  id="cab-price"
                  type="number"
                  min="0"
                  value={cabPerDay}
                  onChange={(e) =>
                    setCabPerDay(Math.max(0, Number(e.target.value) || 0))
                  }
                />
              </>
            )}

            <div className="trip-calculator-option">
              <input
                id="include-food"
                type="checkbox"
                checked={includeFood}
                onChange={(e) => setIncludeFood(e.target.checked)}
              />
              <label htmlFor="include-food">Include Food</label>
            </div>

            {includeFood && (
              <>
                <label htmlFor="food-price">
                  Food Budget per Person / Day (₹)
                </label>
                <input
                  id="food-price"
                  type="number"
                  min="0"
                  value={foodPerPerson}
                  onChange={(e) =>
                    setFoodPerPerson(Math.max(0, Number(e.target.value) || 0))
                  }
                />
              </>
            )}
          </div>

          <div className="trip-calculator-result" aria-live="polite">
            <span className="trip-calculator-result-label">
              ESTIMATED TRIP COST
            </span>

            <h3>{money(total)}</h3>

            <p>
              Approximately {money(perPerson)} per person
            </p>

            <div className="trip-cost-breakdown">
              <div>
                <span>🏨 Hotel</span>
                <strong>{money(hotelCost)}</strong>
              </div>

              <div>
                <span>🚕 Ertiga Cab</span>
                <strong>{money(cabCost)}</strong>
              </div>

              <div>
                <span>🍽️ Food</span>
                <strong>{money(foodCost)}</strong>
              </div>
            </div>

            <div className="trip-cost-summary">
              <span>Duration</span>
              <strong>{tripDays} day(s)</strong>
            </div>

            <div className="trip-cost-summary">
              <span>Travelers</span>
              <strong>{travelers}</strong>
            </div>

            <button
              type="button"
              className="trip-calculator-button"
              onClick={handleEnquiry}
            >
              Send Enquiry on WhatsApp →
            </button>

            <p className="trip-calculator-note">
              This is an estimate based on the prices you enter.
              Actual hotel rates, cab fares, tolls and other expenses
              may vary. Confirm final prices before booking.
            </p>

            <div className="trip-calculator-contact">
              <strong>KN KUNJ TOURS AND TRAVELS</strong>
              <a href="tel:+919270977468">9270977468</a>
              <a href="tel:+918805000425">8805000425</a>
              <a href="mailto:kunj01596@gmail.com">
                kunj01596@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
