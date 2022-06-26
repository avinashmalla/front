import { Chip, Avatar, IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GoogleGLogo from '../media/GoogleGLogo.svg'
import { red } from '@mui/material/colors';
import React from 'react'
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'

const LoginButton = () => {
  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline | any) => {
    console.log(response);
  }
  return (
    <div>
      <GoogleLogin
        clientId="569253835978-ap2p9kadv721sder4afi9bluqo50jqqb.apps.googleusercontent.com"
        render={renderProps => (
          <Chip avatar={<Avatar sx={{ bgcolor: 'inherit' }}><img src={GoogleGLogo} /></Avatar>} label="Login" variant="outlined" onClick={renderProps.onClick} />
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}

export default LoginButton