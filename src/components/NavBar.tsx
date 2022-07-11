import React, { useState } from "react";
import { Link } from "react-router-dom";

import '../styles/components/_NavBar.scss'
import CartDrawer from "./CartDrawer";

import { AppBar, Badge, Box, Divider, Drawer, IconButton, Stack, Toolbar, Typography } from "@mui/material"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Login from "./Login";


const NavBar = () => {
    
    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                    <ShoppingCartOutlinedIcon />
                </IconButton>
                <Typography variant='h6' component='div' paddingRight = '2em'>
                    My Shop
                </Typography>
                {/* <Divider orientation="vertical" flexItem /> */}
                <Login />
                {/* <Divider orientation="vertical" flexItem /> */}
                <Stack direction='row' spacing={1} justifyContent='flex-end' alignItems='center' divider={<Divider orientation="vertical" flexItem />} sx={{ flexGrow: 1 }}>
                    <Link to='/'> Home </Link>
                    <Link to='/products'>Products</Link>
                    {/* <Login /> */}
                    <CartDrawer />
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar