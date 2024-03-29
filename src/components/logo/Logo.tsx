import logo from "../../images/logo.png";

const Logo = () => {
  return (
    <div className="logo__container">
      <a href="/">
        <img src={logo} alt="logo" className="logo__image"></img>
      </a>
    </div>
  );
};

export default Logo;
