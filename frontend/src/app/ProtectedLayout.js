import styles from './ProtectedLayout.module.scss';
import logo from 'assets/logo.png';

/* Imports for NPM libraries */
import { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

/* Imports for local files */
import { userLogged, userLogout } from 'api/authSlice';
import { useChangePasswordMutation, useLazyMeQuery } from 'api/authApi';
import { MainNavItems } from './NavItems';
// import { useGetDevicesQuery } from 'api/deviceApi';
import { useGetHousesDeviceByIdQuery } from 'api/housesApi';
import { useParams } from 'react-router-dom';


let drawerWidth = window.innerWidth * 0.3; // Change this to whatever percentage you want.
if (drawerWidth > 315) {
  drawerWidth = 315;
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function ChangePasswordDialog(props) {
  const { onClose, open } = props;
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      password: '',
      passwordAgain: '',
    }
  );
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleClose = () => {
    onClose();
  };

  const handleChangePassword = async () => {
    // console.log(formInput);
    const { password, passwordAgain } = formInput;
    if (!password || password.length < 8) {
      setError('密碼需 8 個字元以上');

      return;
    }
    if (password !== passwordAgain) {
      setError('密碼不相符');

      return;
    }

    if (!isLoading) {
      try {
        await changePassword(password).unwrap();

        onClose();
        dispatch(userLogout());
      } catch (error) {
        console.error('Failed to change password: ', error);
      }
    }
  };

  const handleInput = (event) => {
    setError(null);
    const name = event.target.name;
    const newValue = event.target.value.trim();
    setFormInput({ [name]: newValue });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>變更密碼</DialogTitle>
      <DialogContent>
        <TextField
          error={!!error}
          autoFocus
          name="password"
          label="輸入新密碼"
          type="password"
          autoComplete="current-password"
          onChange={handleInput}
          variant="outlined"
          margin="normal"
          fullWidth
          helperText={error}
        />
        <TextField
          name="passwordAgain"
          label="再次輸入新密碼"
          type="password"
          autoComplete="current-password"
          onChange={handleInput}
          variant="outlined"
          margin="normal"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>取消</Button>
        <Button onClick={handleChangePassword}>確認</Button>
      </DialogActions>
    </Dialog>
  );
}

function ProtectedLayout() {

  const params = useParams();


  // console.log(params)

  const { id } = params;


  const result = useGetHousesDeviceByIdQuery(id);

  const { data: device, isSuccess, isLoading, refetch } = result; // 调用Api中的钩子查询数据
  // console.log("deviceMode", device);


  const [currentTime, setCurrentTime] = useState(new Date());


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);


  const formattedTime = currentTime.toLocaleString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  const modifiedFormattedTime = formattedTime
    .replace(/\//g, '-')
    .replace(/年|月/g, '/')
    .replace(/日/g, '');

  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const accountMenuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  const [trigger] = useLazyMeQuery();
  const [me, setMe] = useState(null);

  useEffect(() => {
    async function fetchMe() {
      try {
        const result = await trigger().unwrap();

        dispatch(userLogged(result.data));
        setMe(result.data);
      } catch (error) {
        console.error(error);
        // Failed to fetch "me" means no current logged user
        dispatch(userLogout());
        setMe(null);
        return navigate('/signin', { replace: true });
      }
    }
    fetchMe();
  }, [userToken]);
  const location = useLocation();
  //重定向 
  useEffect(() => {
    if (location.pathname === '/') {
      navigate(`/houses/1/deviceMonitoring`, { replace: true });
    }


  }, [navigate]);

  if (!me) {
    return <></>;
  }

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleAccountMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = (event) => {
    setAnchorEl(null);
  };

  const handleOpenChangePassword = () => {
    setOpenChangePassword(true);
    setAnchorEl(null);
  };

  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      // Redirect to SignIn page
      dispatch(userLogout());

      navigate('/signin', { replace: true });
    } catch (error) {
      console.error('Failed to logout: ', error);
    }
  };

  // console.log('me666666',me)
  if (!isSuccess || isLoading || !device) {
    console.log('Loading or no device data yet.');
    return <div>Loading...</div>; // 或其他處理載入中的方法
  }

  const FIELD_SWITCH = device.filter(item => item.name === 'FIELD_SWITCH');
  const MODE = FIELD_SWITCH[0].values[0].value;
  // console.log('MODE',MODE)

  return (
    <Box className={styles.protectedLayout} sx={{ display: 'flex' }}>
      <AppBar className={styles.appBar} position="absolute" open={open}>
        <Toolbar sx={{ pr: '24px', color: '#E1E7F5' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <div style={{ display: 'flex' }}>
              <div>
                <img
                  className={styles.logo}
                  src={logo}
                  alt="Logo"
                  style={{
                    paddingRight: '10px',
                    width: '60px',
                    height: '50px',
                  }}
                />
              </div>
              <div className={styles.title} >
                畜試所棟舍監控系統
              </div>
            </div>
            <div className={styles.right} style={{ display: 'flex' }}>
              {isSuccess &&


                <div className={styles.mode} style={{ paddingRight: '10px' }}>
                  {!FIELD_SWITCH
                    ? ''
                    : MODE
                      ? '自動模式'
                      : '手動模式'}
                </div>
              }
              {/* 現在時間 */}
              <div className="now-time">{modifiedFormattedTime}</div>
            </div>
          </Box>
          <IconButton
            id="account-button"
            aria-controls={accountMenuOpen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={accountMenuOpen ? 'true' : undefined}
            color="inherit"
            onClick={handleAccountMenuOpen}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={accountMenuOpen}
            onClose={handleAccountMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleOpenChangePassword}>變更密碼</MenuItem>
            <MenuItem onClick={handleLogout}>登出</MenuItem>
          </Menu>
          <ChangePasswordDialog
            open={openChangePassword}
            onClose={handleCloseChangePassword}
          />
        </Toolbar>
      </AppBar>
      <Drawer className={styles.drawer} variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav" sx={{height:'100vh'}}>
          <MainNavItems isOpen={open} />
        </List>
      </Drawer>
      <Outlet />
    </Box>
  );
}

export default ProtectedLayout;
