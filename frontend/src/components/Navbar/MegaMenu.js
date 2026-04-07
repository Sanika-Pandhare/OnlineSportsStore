import React from "react";
import { useNavigate } from "react-router-dom";
import menuData from "./menuData";

const MegaMenu = ({ activeCategory, setActiveCategory }) => {
  const navigate = useNavigate();

  const groupBySubCategory = (products) => {
    return products.reduce((acc, product) => {
      if (!acc[product.subCategory]) {
        acc[product.subCategory] = [];
      }
      acc[product.subCategory].push(product.name);
      return acc;
    }, {});
  };

  const groupedData =
    activeCategory && menuData[activeCategory]
      ? groupBySubCategory(menuData[activeCategory])
      : null;

  if (!groupedData) return null;

  return (
    <div
      style={styles.dropdown}
      onMouseEnter={() => setActiveCategory(activeCategory)}
      onMouseLeave={() => setActiveCategory(null)}
    >
      <div style={styles.container}>
        {Object.entries(groupedData).map(([subCat, items]) => (
          <div key={subCat}>
            <h4
              style={styles.heading}
              onClick={() =>
                navigate(`/category/${encodeURIComponent(subCat)}`)
              }
            >
              {subCat}
            </h4>

            {items.map((item, i) => (
              <p
                key={i}
                style={styles.item}
                onClick={() =>
                  navigate(`/category/${encodeURIComponent(item)}`)
                }
              >
                {item}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  dropdown: {
    position: "absolute",
    width: "100%",
    background: "#fff",
    padding: "30px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    zIndex: 999
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "30px",
    maxWidth: "1200px",
    margin: "auto"
  },
  heading: {
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "10px"
  },
  item: {
    cursor: "pointer",
    margin: "5px 0",
    color: "#555"
  }
};

export default MegaMenu;