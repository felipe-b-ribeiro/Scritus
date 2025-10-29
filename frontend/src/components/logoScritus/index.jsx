import LogoScritus from './styles';
import { Link } from 'react-router-dom';

function Logo({goTo}) {
  return (
    <LogoScritus><Link to={ goTo || '/'}>ScRi<strong>tUS</strong></Link></LogoScritus>
  );
}

export default Logo;
