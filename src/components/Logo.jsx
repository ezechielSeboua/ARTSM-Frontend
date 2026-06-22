import { Link } from "react-router-dom";

// Logo.jsx
const Logo = ({ size = 200 }) => {
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <Link to="/accueil">
        <img
          src="/artsm_logo.png"
          alt="Logo"
          style={{
            width: size,
            height: "auto",
            maxWidth: "100%",
          }}
        />
      </Link>
    </div>
  );
};

export default Logo;
