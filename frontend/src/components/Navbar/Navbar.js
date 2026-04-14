// import React, { useState } from "react";
// import MegaMenu from "./MegaMenu";
// import menuData from "./menuData";

// const Navbar = () => {
//   const [activeCategory, setActiveCategory] = useState(null);

//   return (
//     <div className=" z-10" style={styles.wrapper} onMouseLeave={() => setActiveCategory(null)}>
      
//       {/* NAV ITEMS */}
//       <div style={styles.navbar}>
//         {Object.keys(menuData).map((category) => (
//           <div
//             key={category}
//             style={styles.navItem}
//             onMouseEnter={() => setActiveCategory(category)}
//           >
//             {category}
//           </div>
//         ))}
//       </div>

//       {/* MEGA MENU */}
//       <MegaMenu
//         activeCategory={activeCategory}
//         setActiveCategory={setActiveCategory}
//       />
//     </div>
//   );
// };

// const styles = {
//   wrapper: {
//     position: "relative",
//     borderBottom: "1px solid #eee",
//     background: "#fff"
//   },
//   navbar: {
//     display: "flex",
//     gap: "30px",
//     padding: "15px 40px",
//     maxWidth: "1200px",
//     margin: "auto"
//   },
//   navItem: {
//     cursor: "pointer",
//     fontWeight: "500"
//   }
// };

// export default Navbar;


import React from "react";
import menuData from "./menuData";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="z-10" style={styles.wrapper}>
      <div style={styles.navbar}>
        {Object.keys(menuData).map((category) => (
          <div
            key={category}
            style={styles.navItem}
            onClick={() =>
              navigate(`/category/${encodeURIComponent(category)}`)
            }
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    position: "relative",
    borderBottom: "1px solid #eee",
    background: "#fff"
  },
  navbar: {
    display: "flex",
    gap: "30px",
    padding: "15px 40px",
    maxWidth: "1200px",
    margin: "auto"
  },
  navItem: {
    cursor: "pointer",
    fontWeight: "500"
  }
};

export default Navbar;