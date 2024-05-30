import logo from "../../../images/logo.png";
import PetsIcon from '@mui/icons-material/Pets';

const Logo = () => {
  return (
    <div className="logo__container">
      <a href="/">
        <PetsIcon sx={{ fontSize: "4vw", fill: '#9D0B0B' }} />
      </a>
    </div>
  );
};

export default Logo;
