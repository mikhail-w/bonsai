import { Box, Image } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import logo_white from '../../assets/images/logo_white.png';

const Logo = ({ pathname, scrolled }) => {
  const logoSrc = pathname === '/' && !scrolled ? logo_white : logo;

  return (
    <RouterLink to="/">
      <Box position="fixed" top={9} left={8} zIndex="10">
        <Image src={logoSrc} alt="Logo" boxSize="50px" />
      </Box>
    </RouterLink>
  );
};

export default Logo;
