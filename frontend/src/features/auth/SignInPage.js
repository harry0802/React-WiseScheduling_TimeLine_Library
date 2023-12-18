import { useState, useReducer, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ErrorIcon from '@mui/icons-material/Error';
import TSSnackbar from 'components/TSSnackbar';
import myImage from '../../assets/logo.png';
import './SignInPage.scss';
import { styled } from '@mui/material/styles';

import { userLogin } from 'api/authSlice';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#FFFFFF',
  },
  '& label': {
    color: '#FFFFFF',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#B2BAC2',
    },
  },
});

export default function SignInSide() {
  const navigate = useNavigate();
  const location = useLocation();
  const [rememberme, setRememberme] = useState(true);
  const { userToken, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      username: '',
      password: '',
    }
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showMessage, setShowMessage] = useState({
    open: false,
    message: '',
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (userToken) {
      const { from } = location.state || {};
      if (from) {
        return navigate(from, { replace: true });
      } else {
        return navigate('/houses/1/deviceMonitoring', { replace: true });
      }
    }
    if (error) {
      // console.log(error);
      setShowMessage({
        open: true,
        message: '不正確的帳號或密碼',
      });
    }
  }, [navigate, location, userToken, error]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(
      userLogin({
        username: formInput.username,
        password: formInput.password,
        rememberme,
      })
    );
  };

  const handleChangeRememberMe = (event) => {
    setRememberme(event.target.checked);
  };

  const handleInput = (event) => {
    const name = event.target.name;
    const newValue = event.target.value.trim();
    setFormInput({ [name]: newValue });
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', // Add this line
        backgroundColor: '#0C1421 !important',
        height: '100vh', // Modify this if needed
        textAlign: 'center',
      }}
      autoComplete="off"
    >
      <img
        style={{ width: '179px', height: '179px' }}
        src={myImage}
        alt="一張圖片"
      />
      {/* 帳號 */}
      <CssTextField
        sx={{
          width: '350px',
          // backgroundColor: '#d3d3d3',
          borderRadius: '5px',
        }}
        id="username"
        label="輸入帳號"
        name="username"
        autoComplete="username"
        onChange={handleInput}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      {/* 密碼 */}
      <CssTextField
        sx={{
          width: '350px',
          // backgroundColor: '#d3d3d3',
          borderRadius: '5px',
        }}
        name="password"
        label="輸入密碼"
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="current-password"
        onChange={handleInput}
        InputProps={{
          // this is where the toggle button is added
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                sx={{ color: '#d3d3d3' }}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <FormControlLabel
        sx={{ width: '350px' }}
        control={
          <Box sx={{ width: '100%', textAlign: 'end' }}>
            <Checkbox
              checked={rememberme}
              onChange={handleChangeRememberMe}
              color="primary"
              sx={{ color: '#FFFFFF' }}
            />
            <span>保持登入</span>
          </Box>
        }
      />

      <Button
        className="sub"
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, textAlign: 'center', width: '350px' }}
      >
        登入
      </Button>
      <TSSnackbar
        open={showMessage.open}
        autoHideDuration={1000}
        onClose={() => {
          setShowMessage({ open: false, message: '' });
        }}
        message={showMessage.message}
        action={<ErrorIcon color="error" />}
      />
    </Box>
  );
}
