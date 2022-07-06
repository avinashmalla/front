import React from 'react'
import { Card, CardContent, CardMedia, Divider, Typography, CardActions, Chip, Avatar, IconButton, CssBaseline, Grid, Stack, Container, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { green, purple, red, yellow } from '@mui/material/colors'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveOutlinedIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/appHooks';
// import { useAlert } from 'react-alert'


import useProduct from '../hooks/useProduct'
import '../styles/pages/_SingleProduct.scss'
import { deleteProductASync, updateProduct } from '../redux/reducers/productReducer';
import { Product } from '../types/products';

const SingleProduct = () => {
  const { productId } = useParams()
  const product = useProduct(productId)
  const loggedInUser = useAppSelector(state => state.userReducer.currentUser)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [enableEdit, setEnableEdit] = useState(false)
  const [updatePackage, setUpdatePackage] = useState({})
  const [pTitle, setPTitle] = useState('')
  const [pPrice, setPPrice] = useState(0)
  const [pDescription, setPDescription] = useState('')
  const [open, setOpen] = React.useState(false)
  

  function handleClick() {
    navigate("../", { replace: true });
  }

  const pkg = () => {
    setUpdatePackage({
      id: productId,
      update: {
        title: pTitle,
        price: pPrice,
        description: pDescription
      }
    })
  }


  const handleEdit = () => {
    pkg()
    setEnableEdit(false)
    // console.log(updatePackage)
    dispatch(updateProduct(updatePackage))
  }

  const handleDeleteProduct = (productId: string) => {
    dispatch(deleteProductASync(productId))
    navigate("../", { replace: true })
  }

  const handleAddToCart = (product: Product) => {
    // dispatch(addProductToCart(productId))
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <><CssBaseline />
      <Grid container spacing={2} padding={2} >
        <Grid item xs={12} ><Card>Top Bar</Card> </Grid>
        <Grid item xs={12} className='grid--main-content'>
          {
            product // OUTER IF:: if product is returned
              ?
              !enableEdit // INNER IF:: if enableEdit is FALSE
                // loggedInUser && loggedInUser.role !== 'admin'
                ?
                <Card className='single-product--card'>{/* sx={{ maxWidth: 300 }}*/}
                  <CardContent >
                    <CardMedia component="img" image={product.images[0]} alt="Product Image" className='single-product--image' />
                    <Stack direction="row" justifyContent='space-between' alignItems='center'>
                      <Typography variant="h5" align='left'>{product.title}</Typography>
                      <Typography variant="h6" align='left'>{product.price}€ </Typography>
                    </Stack>
                    <Divider textAlign="right">.</Divider>
                    <Typography variant="body2" align='left'>{product.description}</Typography>
                    <Divider textAlign="left">.</Divider>
                  </CardContent>
                  <CardActions>
                    <Stack direction="row" justifyContent={"space-evenly"} spacing={14} className='stack--buttons--singleproduct'> {/* className = 'stack--buttons' */}
                      {
                        loggedInUser && loggedInUser.role === 'admin'
                          ?
                          <>
                            <Chip avatar={<Avatar sx={{ bgcolor: red[100] }}><IconButton aria-label="Go Back"><ArrowBackIcon /></IconButton></Avatar>} label="Go Back" variant="outlined" onClick={handleClick} />
                            <Chip avatar={<Avatar sx={{ bgcolor: purple[100] }}><IconButton aria-label="delete this product"><DeleteForeverIcon /></IconButton></Avatar>} label="Delete Product" variant="outlined" onClick={handleClickOpen} />
                            <Dialog
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description">
                              <DialogTitle id="alert-dialog-title">
                                {"Delete Product"}
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  Are you sure you want to delete this product?
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={() => handleDeleteProduct(product.id)} autoFocus>
                                  Delete
                                </Button>
                              </DialogActions>
                            </Dialog>
                            <Chip avatar={<Avatar sx={{ bgcolor: yellow[100] }}><IconButton aria-label="Edit Button"><ModeEditIcon /></IconButton></Avatar>} label="Edit Product" variant="outlined" onClick={() => setEnableEdit(true)} />
                          </>
                          :
                          <>
                            <Chip avatar={<Avatar sx={{ bgcolor: red[100] }}><IconButton aria-label="Go Back"><ArrowBackIcon /></IconButton></Avatar>} label="Go Back" variant="outlined" onClick={handleClick} />
                            <Chip avatar={<Avatar sx={{ bgcolor: purple[100] }}><IconButton aria-label="Add product to cart"><AddShoppingCartIcon /></IconButton></Avatar>} label="Add to Cart" variant="outlined" onClick={() => handleAddToCart(product)} />
                          </>
                      }
                    </Stack>
                  </CardActions>
                </Card>
                : <Card className='single-product--card'>{/* //* INNER ELSE::*/}
                  <CardContent >
                    <CardMedia component="img" image={product.images[0]} alt="Product Image" className='single-product--image' />
                    <Stack direction="row" justifyContent='space-between' spacing={2} alignItems='center'>
                      <TextField variant="filled" color="success" defaultValue={product.title} id='product-title' sx={{ width: '35ch' }} onChange={(e) => setPTitle(e.target.value)} />
                      <TextField variant="filled" color="success" defaultValue={product.price} id='product-price' onChange={(e) => setPPrice(parseInt(e.target.value))} />
                    </Stack>
                    <Divider textAlign="right">.</Divider>
                    <TextField fullWidth multiline variant="filled" color="success" defaultValue={product.description} id='product-description' onChange={(e) => setPDescription(e.target.value)} />
                    <Divider textAlign="left">.</Divider>
                  </CardContent>
                  <CardActions>
                    <Stack justifyContent='center' alignItems='center' className='stack--buttons--singleproduct'> {/* className = 'stack--buttons' */}
                      {/* <Chip avatar={<Avatar sx={{ bgcolor: red[100] }}><IconButton aria-label="Go Back"><ArrowBackIcon /></IconButton></Avatar>} label="Go Back" variant="outlined" onClick={handleClick} /> */}
                      <Chip avatar={<Avatar sx={{ bgcolor: green[100] }}><IconButton aria-label="Save Button"><SaveOutlinedIcon /></IconButton></Avatar>} label="Save Updates" variant="outlined" onClick={handleEdit} />
                    </Stack>
                  </CardActions>
                </Card>
              : <Typography variant="h6" align='left'>This product doesn't exist</Typography> //* OUTER ELSE::
          }
        </Grid>
      </Grid>
    </>
  )
}

export default SingleProduct