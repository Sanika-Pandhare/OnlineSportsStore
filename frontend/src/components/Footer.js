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
          <h3 className="footer-heading">Shop</h3>

          <ul className="footer-shop">
            <li>Cricket</li>
            <li>Team Sports</li>
            <li>Athletics</li>
            <li>Boxing</li>
            <li>Fitness</li>
            <li>Training</li>
            <li>Indoor Games</li>
            <li>Accessories</li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="footer-heading">Company</h3>

          <ul className="footer-links">
            <li>
              <Link to="/about" className="footer-link">
                About Us
              </Link>
            </li>
            <li>Careers</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
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