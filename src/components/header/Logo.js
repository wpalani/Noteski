import logo from '../../assests/svg/Noteski.svg';

/**
 * App logo
 * 
 * @returns {JSX} The rendered JSX element.
 */
const Logo = () => {
    return (
        <img src={logo} alt="Noteski Logo" className="noteski-logo" />
    );
}

export default Logo;