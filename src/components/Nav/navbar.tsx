import React from 'react';
import styles from './Navbar.module.css';
import { Button, Image } from '@chakra-ui/react';
import logo from '@/components/static/logo.png';
import logoutIcon from '@/components/static/IoLogOutOutline.png';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Image src={logo} alt="Login Logo" className={styles.logo} />
      </div>
      <div className={styles.right}>
        <Button onClick={onLogout} className={styles.logoutButton}>
          <Image src={logoutIcon} alt="Logout Logo" className={styles.logout} />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
