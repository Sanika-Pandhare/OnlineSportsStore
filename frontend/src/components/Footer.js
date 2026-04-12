import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}
        <div>
          <h2 className="footer-title">Vijay Sport Store</h2>
          <p className="footer-text">
            Premium sports products for champions.  
            Best quality shoes, bats, kits & accessories.
          </p>

          <div className="footer-contact">
            <p>📧 vijaypandhare45@gmail.com</p>
            <p>📞 +91 8554083358</p>
          </div>
        </div>

        {/* SHOP */}
        <div>
          <h3 className="footer-heading">    Shop</h3>

          <ul className="footer-shop">
            <li>
              <Link to="product-category" className="footer-link">Cricket</Link>
              </li>
            <li>
              <Link to="product-category" className="footer-link">Team Sports
              </Link>
              </li>
            <li>
              <Link to="product-category" className="footer-link">
              Athletics
              
              </Link>
              </li>


            <li>
              <Link to="product-category" className="footer-link">Boxing</Link>
            </li>
            <li><Link to="product-category" className="footer-link">Fitness</Link></li>
            
            <li><Link to="product-category" className="footer-link">
                Training
              </Link></li>


            <li><Link to="product-category" className="footer-link">
                Indoor Games
              </Link></li>
            <li><Link to="product-category" className="footer-link">
                Accessories
              </Link></li>

              <li><Link to="product-category" className="footer-link">
                Boys Clothes
              </Link></li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="footer-heading">Company</h3>

          <ul className="footer-links">
            <li>
              <Link to="/aboutus" className="footer-link">
                aboutus
              </Link>
            </li>
        
            <li>
              <Link to="/contact" className="footer-link">
                Contact
              </Link>
              </li>
            
          
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="footer-heading">Follow Us On</h3>

          <div className="footer-social">
            <span>🌐</span>
            <span>📸</span>
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © 2026 Vijay Sport Store. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;