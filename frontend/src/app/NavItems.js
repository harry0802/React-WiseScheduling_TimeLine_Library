
import { Fragment, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HouseMode from 'features/houses/HouseMode';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import styles from './ProtectedLayout.module.scss';

import { useGetHousesQuery } from 'api/housesApi';


export function MainNavItems(props) {
  const { data: houses, isSuccess, isLoading, refetch } = useGetHousesQuery( null,{
    pollingInterval: 1000, // 设置轮询的间隔，单位毫秒 如果为0则表示不轮询
  });

    // console.log('houses',houses)
  const { isOpen } = props;
  const navItemClasses = isOpen ? styles.openNav : styles.closedNav;
  const mainNavItem = (route) => (
    <NavLink className={navItemClasses} to={route.path} key={route.path}>
      <ListItemButton>
        <ListItemIcon>{route.navItem.icon}</ListItemIcon>
        <ListItemText primary={route.navItem.text} />
      </ListItemButton>
    </NavLink>
  );
  const [protectedRoutes, setProtectedRoutes] = useState([
    {},
  ]);

  useEffect(() => {
    if (isSuccess) {
      const updateRoutes = () => {
        const updatedProtectedRoutes = houses.map((house) => {
          let iconColor;
          switch (house.status) {
            case 'NORMAL':
              iconColor = '#00FF94';
              break;
            case 'ABNORMAL':
              iconColor = '#E50123';
              break;
            case 'UNKNOWN':
              iconColor = '#8f8f8f';
              break;
            default:
              iconColor = '#8f8f8f';
          }
          return {
            path: `/houses/${house.id}`,
            element: <HouseMode />,
            navItem: {
              text: house.label,
              icon: <EmojiObjectsIcon style={{ color: iconColor, marginLeft: 56 }} />,
            },
          };
        });
        setProtectedRoutes(updatedProtectedRoutes);
      };

      updateRoutes();
    }
  }, [isSuccess, houses]);

  const navItems = protectedRoutes.map((route) => {
    if (!route.navItem) return null;
    return mainNavItem(route);
  });

  return <Fragment>{navItems}</Fragment>;
}