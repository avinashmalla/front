import { Badge, Box, Drawer, IconButton, styled, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useAppSelector } from '../hooks/appHooks';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));


const CartDrawer = () => {
    const cart = useAppSelector(state => state.cartReducer.myCart)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const getCartQuantity = () => {
        let qty = 0
        cart.map((product) => {
            qty += product.quantity
        })
        return qty
    }

    return (
        <>
            <IconButton aria-label="cart" onClick={() => setIsDrawerOpen(true)} >
                <StyledBadge badgeContent={getCartQuantity()} color="secondary">
                    <ShoppingCartIcon />
                </StyledBadge>
            </IconButton>
            <Drawer anchor='right' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <Box p={2} width='250px' textAlign='left' role='presentation'>
                    <Typography variant='h6' component='div'>
                        Your Shopping Cart
                    </Typography>
                </Box>
            </Drawer>
        </>
    )
}

export default CartDrawer