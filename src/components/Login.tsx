import { Box, Button, Container, CssBaseline, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/appHooks';
import { loginAsync, loginByToken } from '../redux/reducers/userReducer';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()


  const boxStyle = {
    '& .MuiTextField-root': { m: 1, width: '25ch' },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
    height: 400,
    paddingTop: '2em',
    border: 1
  }

  function handleLoginSubmit() {
    const token = localStorage.getItem(`${email}`)
    if (token) {
      console.log("Login Page :: Token FOUND for", `${email}`)
      dispatch(loginByToken(token))
    }
    else {
      console.log("Login Page :: Token NOT FOUND")
      dispatch(loginAsync({ email, password }))
    }
  }


  return (
    <>
      <CssBaseline />
      <Container maxWidth='sm'>
        <Box sx={boxStyle}>
          <TextField id="outlined-secondary" label="Email" variant="outlined" onChange={e => setEmail(e.target.value)} />
          <TextField id="outlined-password-input" label="Password" type="password" variant="outlined" onChange={e => setPassword(e.target.value)} />
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleLoginSubmit} >Submit</Button>
            <Button variant="outlined" color="error" onClick={() => localStorage.clear()}>Clear Local Storage</Button>
          </Stack>
        </Box>
      </Container>
    </ >
  )
}

export default Login