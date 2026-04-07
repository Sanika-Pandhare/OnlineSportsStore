import menuData from "./menuData";
import { useNavigate } from "react-router-dom"; 

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

  const columnCount = groupedData
    ? Object.keys(groupedData).length
    : 0;

  return (
    <div>

      {groupedData && (
        <div style={styles.dropdown}>
          <div
            style={{
              ...styles.container,
              gridTemplateColumns: `repeat(${columnCount}, 1fr)`
            }}
          >
            {Object.entries(groupedData).map(([subCat, items]) => (
              <div key={subCat}>
                <h4
  style={{ cursor: "pointer" }}
  onClick={() =>
    navigate(`/category/${encodeURIComponent(subCat)}`)
  }
>
  {subCat}
</h4>
                {items.map((item, i) => (
  <p
    key={i}
    style={{ cursor: "pointer" }}
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
      )}
    </div>
  );
};

const styles = {
  dropdown: {
    position: "absolute",
    width: "100%",
    background: "#fff",
    padding: "40px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    zIndex: 9999
  },
  container: {
    display: "grid",
    gap: "40px",
    maxWidth: "1200px",
    margin: "auto"
  }
};

export default MegaMenu;