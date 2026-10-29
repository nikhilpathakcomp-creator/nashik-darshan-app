
import { useEffect, useState } from "react";
import "./ReviewsRatings.css";

const STORAGE_KEY = "nashik-darshan-reviews";

const initialReviews = [
  {
    id: 1,
    place: "त्र्यंबकेश्वर मंदिर",
    name: "Demo User",
    rating: 5,
    comment: "सुंदर आणि प्रसिद्ध धार्मिक स्थळ!",
    date: "2026-10-01",
  },
  {
    id: 2,
    place: "हरिहर किल्ला",
    name: "Demo User",
    rating: 4,
    comment: "ट्रेकिंगसाठी छान ठिकाण.",
    date: "2026-10-02",
  },
];

export default function ReviewsRatings() {
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  const [place, setPlace] = useState("त्र्यंबकेश्वर मंदिर");
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch (error) {
      console.error("Unable to save reviews:", error);
    }
  }, [reviews]);

  const submitReview = (event) => {
    event.preventDefault();

    if (!name.trim() || !comment.trim()) {
      setMessage("कृपया तुमचे नाव आणि Review लिहा.");
      return;
    }

    const newReview = {
      id: Date.now(),
      place,
      name: name.trim(),
      rating: Number(rating),
      comment: comment.trim(),
      date: new Date().toISOString().slice(0, 10),
    };

    setReviews((current) => [newReview, ...current]);
    setName("");
    setRating(5);
    setComment("");
    setMessage("तुमचा Review यशस्वीरीत्या जोडला गेला!");
  };

  const averageRating = (placeName) => {
    const selected = reviews.filter(
      (review) => review.place === placeName
    );

    if (selected.length === 0) return "0.0";

    const average =
      selected.reduce((sum, review) => sum + review.rating, 0) /
      selected.length;

    return average.toFixed(1);
  };

  return (
    <section className="reviews-section" id="reviews-ratings">
      <div className="reviews-container">
        <div className="reviews-heading">
          <span className="reviews-eyebrow">VISITOR EXPERIENCES</span>
          <h2>⭐ Reviews & Ratings</h2>
          <p>
            नाशिकमधील पर्यटनस्थळांना भेट दिल्यानंतर तुमचा अनुभव शेअर करा.
          </p>
        </div>

        <form className="review-form" onSubmit={submitReview}>
          <h3>✍️ तुमचा Review लिहा</h3>

          <label htmlFor="review-place">पर्यटनस्थळ निवडा</label>
          <select
            id="review-place"
            value={place}
            onChange={(event) => setPlace(event.target.value)}
          >
            <option>त्र्यंबकेश्वर मंदिर</option>
            <option>काळाराम मंदिर</option>
            <option>रामकुंड</option>
            <option>हरिहर किल्ला</option>
            <option>अंजनेरी किल्ला</option>
            <option>सोमेश्वर धबधबा</option>
            <option>पांडवलेणी</option>
            <option>सुला व्हाइनयार्ड्स</option>
          </select>

          <label htmlFor="review-name">तुमचे नाव</label>
          <input
            id="review-name"
            type="text"
            placeholder="नाव लिहा"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={60}
            required
          />

          <label htmlFor="review-rating">Rating द्या</label>
          <select
            id="review-rating"
            value={rating}
            onChange={(event) => setRating(Number(event.target.value))}
          >
            <option value={5}>⭐⭐⭐⭐⭐ - उत्कृष्ट</option>
            <option value={4}>⭐⭐⭐⭐ - खूप छान</option>
            <option value={3}>⭐⭐⭐ - चांगले</option>
            <option value={2}>⭐⭐ - ठीक</option>
            <option value={1}>⭐ - सुधारणा आवश्यक</option>
          </select>

          <label htmlFor="review-comment">तुमचा अनुभव</label>
          <textarea
            id="review-comment"
            placeholder="तुमचा अनुभव येथे लिहा..."
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            maxLength={500}
            rows={4}
            required
          />

          <button className="review-submit" type="submit">
            Submit Review
          </button>

          {message && (
            <p className="review-message" role="status">
              {message}
            </p>
          )}
        </form>

        <div className="reviews-list">
          <h3>💬 पर्यटकांचे Reviews</h3>

          {reviews.length === 0 ? (
            <p>अजून Reviews नाहीत. पहिला Review तुम्ही लिहा!</p>
          ) : (
            reviews.map((review) => (
              <article className="review-card" key={review.id}>
                <div className="review-card-top">
                  <div>
                    <h4>{review.place}</h4>
                    <p className="review-author">
                      👤 {review.name}
                    </p>
                  </div>

                  <span className="review-rating">
                    {"⭐".repeat(review.rating)}
                  </span>
                </div>

                <p className="review-comment">{review.comment}</p>

                <div className="review-card-bottom">
                  <span>📅 {review.date}</span>
                  <span>
                    Average: {averageRating(review.place)} / 5
                  </span>
                </div>
              </article>
            ))
          )}
        </div>

        <p className="review-disclaimer">
          टीप: Reviews सध्या या Browser मध्ये सेव्ह होतात.
          सर्व पर्यटकांचे Reviews एकत्र दाखवण्यासाठी Database जोडणे आवश्यक आहे.
        </p>
      </div>
    </section>
  );
}
