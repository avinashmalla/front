import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, CssBaseline, Divider, Grid, IconButton, Stack, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import React from 'react'
import { useAppSelector } from '../hooks/appHooks'
import '../styles/pages/_Products.scss'
import purple from '@mui/material/colors/purple';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const products = useAppSelector(state => state.productReducer)
  const cleanProducts = products.filter(product => !product.title.toLowerCase().includes('nuevo') && !product.title.toLowerCase().includes('new') && product.images[0].includes("https://"))
  const navigate = useNavigate()

  return (
    <>Products
      <CssBaseline />
      <Grid container spacing={2} padding={2} >
        <Grid item xs={2} md={2}>Sidebar</Grid>
        <Grid item xs={2} md={10}>
          <Grid container direction='row' maxWidth='md' rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
            {cleanProducts && cleanProducts.map(product => (
              <Grid item key={product.id}>
                <Card sx={{ maxWidth: 300 }}>
                  <CardContent>
                    {/* <CardHeader title={product.title} subheader={product.price + "€"} /> */}
                    <CardMedia component="img" height="175em" width='175em' image={product.images[0]} alt="Product Image" onClick={() => navigate(`${product.id}`)}/>
                    <Divider textAlign="left">.</Divider>
                    <Typography variant="subtitle2" align='left'>{product.title}</Typography>
                    {/* <Divider textAlign="right">.</Divider> */}
                    <Typography variant="h6" align='left'>{product.price}€ </Typography>
                    <Divider textAlign="left">.</Divider>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Chip avatar={<Avatar sx={{ bgcolor: purple[100] }}><IconButton aria-label="delete this item"><DeleteForeverIcon /></IconButton></Avatar>} label="Remove this item" variant="outlined" />
                  </CardActions>
                </Card>
              </Grid>
            ))
            }
          </Grid>
        </Grid>
      </Grid>

    </>
  )
}

export default Products