import { Avatar, Box, Button, Container, CssBaseline, Stack, TextField, IconButton, Menu, MenuItem, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/appHooks';
import { loginAsync, loginByToken, logOut } from '../redux/reducers/userReducer';
import PersonPinRoundedIcon from '@mui/icons-material/PersonPinRounded';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loggedInUser = useAppSelector(state => state.userReducer).currentUser
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [modalOpen, setModalOpen] = useState(false)
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleClickOnProfile = (event: any | undefined) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const boxStyle = {
    '& .MuiTextField-root': { m: 1, width: '25ch' },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
    height: 400,
    paddingTop: '2em',
    positon: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(100%, 50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24
  }

  function handleLoginSubmit() {
    handleMenuClose()
    const token = localStorage.getItem(`${email}`)
    if (token) {
      console.log("Login Page :: Token FOUND for", `${email}`)
      dispatch(loginByToken(token))
    }
    else {
      console.log("Login Page :: Token NOT FOUND")
      dispatch(loginAsync({ email, password }))
    }
    handleModalClose()
  }

  
  return (
    <>
      <CssBaseline />
      {
        loggedInUser
        ? <IconButton size='medium' edge='start' color='inherit' aria-label='Profile' onClick={(e) => handleClickOnProfile(e)}>
            <Avatar alt={loggedInUser.name} src={loggedInUser.avatar} />
          </IconButton>
        : <IconButton size='medium' edge='start' color='inherit' aria-label='Profile' onClick={(e) => handleClickOnProfile(e)}>
            <PersonPinRoundedIcon />
            <Typography>
              Login
            </Typography>
          </IconButton>
      }
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}>
          <MenuItem onClick={handleModalOpen}>Login</MenuItem>
          <MenuItem onClick={() => navigate("../profile", { replace: true })}>Profile</MenuItem>
          <MenuItem onClick={() => dispatch(logOut)}>Logout</MenuItem>
        </Menu>
      <Container maxWidth='sm'>
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={boxStyle}>
            <TextField id="outlined-secondary" label="Email" variant="outlined" onChange={e => setEmail(e.target.value)} />
            <TextField id="outlined-password-input" label="Password" type="password" variant="outlined" onChange={e => setPassword(e.target.value)} />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleLoginSubmit}>Submit</Button>
              {/* <Button variant="outlined" color="error" onClick={() => localStorage.clear()}>Clear Local Storage</Button> */}
            </Stack>
          </Box>
        </Modal>
      </Container>
    </>
  )
}

export default Login