import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { categoryName } = useParams();

  // 🔥 step (1–10)
  const [step, setStep] = useState(2); // default better → mid range

  // 🔥 rating
  const [rating, setRating] = useState("");

  const STEP_SIZE = 500;

  // ✅ FIXED RANGE LOGIC
  const minPrice = (step - 1) * STEP_SIZE;
  const maxPrice = step * STEP_SIZE;

  useEffect(() => {
    setStep(2);
    setRating("");
  }, [categoryName]);

  // 🔥 TEMP PRODUCTS
  const products = [
    { id: 1, name: "Product 1", price: 150, rating: 4 },
    { id: 2, name: "Product 2", price: 400, rating: 3 },
    { id: 3, name: "Product 3", price: 800, rating: 5 },
    { id: 4, name: "Product 4", price: 1200, rating: 2 },
    { id: 5, name: "Product 5", price: 3000, rating: 4 },
  ];

  // 🔥 FILTER
  const filteredProducts = products.filter((product) => {
    const priceMatch =
      product.price >= minPrice && product.price <= maxPrice;

    let ratingMatch = true;
    if (rating === "4+") ratingMatch = product.rating >= 4;
    if (rating === "3+") ratingMatch = product.rating >= 3;
    if (rating === "2+") ratingMatch = product.rating >= 2;

    return priceMatch && ratingMatch;
  });

  return (
    <div className="category-page">

      <div className="category-header">
        <h1>{categoryName} ({filteredProducts.length})</h1>
      </div>

      <div className="category-content">

        {/* FILTER */}
        <div className="filters">

          <h3>Filter by Price</h3>

          {/* ✅ ONLY ONE SLIDER */}
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            className="price-slider"
          />

          {/* ✅ RANGE DISPLAY */}
          <p className="price-value">
            ₹ {minPrice} - ₹ {maxPrice}
          </p>

          {/* RATING */}
          <h3 style={{ marginTop: "25px" }}>Filter by Rating</h3>

          <div className="rating-buttons">

            <div onClick={() => setRating("4+")} className="rating-row">
              <span className="rating-text">4★ & above</span>
              <span className="stars">
                <span className="filled">★★★★</span>☆
              </span>
            </div>

            <div onClick={() => setRating("3+")} className="rating-row">
              <span className="rating-text">3★ & above</span>
              <span className="stars">
                <span className="filled">★★★</span>☆☆
              </span>
            </div>

            <div onClick={() => setRating("2+")} className="rating-row">
              <span className="rating-text">2★ & above</span>
              <span className="stars">
                <span className="filled">★★</span>☆☆☆
              </span>
            </div>

            <button onClick={() => setRating("")} className="clear-btn">
              Clear
            </button>

          </div>

          <p className="rating-value">
            Selected: {rating ? rating : "None"}
          </p>

        </div>

        {/* PRODUCTS */}
        <div className="products">

          {filteredProducts.map((item) => (
            <div key={item.id} className="product-card">

              <div className="image-box"></div>

              <div className="product-rating">
                {"★".repeat(item.rating)}
                {"☆".repeat(5 - item.rating)}
              </div>

              <h3>{item.name}</h3>
              <p>{categoryName}</p>
              <span>₹{item.price}</span>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default CategoryPage;