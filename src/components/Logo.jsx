// Banner.jsx
const Logo = ({ size = 200 }) => {
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <img
        src="/artsm_logo.png"
        alt="Logo"
        style={{
          width: size,
          height: "auto",
          maxWidth: "100%",
        }}
      />
    </div>
  );
};

export default Logo;