import { Card, CardContent, CardMedia, Divider, Typography, CardActions, Chip, Avatar, IconButton } from '@mui/material'
import { purple } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../hooks/appHooks'
import useProduct from '../hooks/useProduct'
import { Product } from '../types/products'

const SingleProduct = () => {
    const {productId} = useParams()
    const product = useProduct(productId)
    // console.log(product)
  return (
    <div>
      {
      product 
      ? <Card sx={{ maxWidth: 300 }}>
                  <CardContent>
                    {/* <CardHeader title={product.title} subheader={product.price + "€"} /> */}
                    <CardMedia component="img" height="175em" width='175em' image={product.images[0]} alt="Product Image" />
                    <Divider textAlign="left">.</Divider>
                    <Typography variant="subtitle2" align='left'>{product.title}</Typography>
                    {/* <Divider textAlign="right">.</Divider> */}
                    <Typography variant="h6" align='left'>{product.price}€ </Typography>
                    <Divider textAlign="left">.</Divider>
                    <Typography variant="body2" align='left'>{product.description}</Typography>
                  </CardContent>
                  {/* <CardActions disableSpacing>
                    <Chip avatar={<Avatar sx={{ bgcolor: purple[100] }}><IconButton aria-label="delete this item"><DeleteForeverIcon /></IconButton></Avatar>} label="Remove this item" variant="outlined" />
                  </CardActions> */}
                </Card>
      : <div>product does not exist</div>}
    </div>
  )
}

export default SingleProduct