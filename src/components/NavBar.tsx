import React from "react";
import { Link } from "react-router-dom";

import '../styles/components/_NavBar.scss'

import { AppBar, Divider, IconButton, Stack, Toolbar, Typography } from "@mui/material"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LoginButton from "./LoginButton";

const NavBar = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton size = 'large' edge = 'start' color = 'inherit' aria-label='logo'>
                    <ShoppingCartOutlinedIcon />
                </IconButton>
                <Typography variant = 'h6' component = 'div' >
                    My Shop
                </Typography>
                <Stack direction='row' spacing={2} justifyContent = 'flex-end' alignItems='center' divider={<Divider orientation="vertical" flexItem />} sx = {{ flexGrow: 1 }}>
                    <Link to='/'> Home </Link>
                    <Link to='/products'>Products</Link>
                    <Link to='/profile'>Profile</Link>
                    <LoginButton />
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar