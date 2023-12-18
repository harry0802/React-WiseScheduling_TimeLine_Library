import styles from './MainPage.module.scss';

import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function MainPage(props) {
  const { title } = props;
  const { t } = useTranslation();

  return (
    <Box id={props.id} className={styles.mainPage} component="main">
      <Toolbar />
      <Box
        sx={{
          width: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {title ? (
          <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  color: '#8F8F8F',
                  fontWeight: 700,
                  flexGrow: 1,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                {title}
              </Typography>
            </Toolbar>
          </AppBar>
        ) : null}
        {props.children}

      </Box>
    </Box>
  );
}

export default MainPage;
