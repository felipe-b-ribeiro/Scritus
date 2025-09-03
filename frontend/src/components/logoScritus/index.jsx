import LogoScritus from './styles';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <LogoScritus><Link to="/">{'ScRi'}<strong>{'tUS'}</strong></Link></LogoScritus>
  );
}

export default Logo;
