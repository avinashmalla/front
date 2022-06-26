import { Card, CardContent, CardMedia, Divider, Typography, CardActions, Chip, Avatar, IconButton, CssBaseline, Grid, Stack, Container, TextField } from '@mui/material'
import { green, red, yellow } from '@mui/material/colors'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveOutlinedIcon from '@mui/icons-material/Save';

import useProduct from '../hooks/useProduct'
import '../styles/pages/_SingleProduct.scss'
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/appHooks';

import { updateProduct } from '../redux/reducers/productReducer';

const SingleProduct = () => {
  const { productId } = useParams()
  const product = useProduct(productId)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [enableEdit, setEnableEdit] = useState(false)
  const [updatePackage, setUpdatePackage] = useState({})
  const [pTitle, setPTitle] = useState('')
  const [pPrice, setPPrice] = useState(0)
  const [pDescription, setPDescription] = useState('')

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

  return (
    <><CssBaseline />
      <Grid container spacing={2} padding={2} >
        <Grid item xs={12} ><Card>Top Bar</Card> </Grid>
        <Grid item xs={12} className='grid--main-content'>
          {
            product // OUTER IF:: if product is returned
              ?
              !enableEdit // INNER IF:: if enableEdit is FALSE
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
                    <Stack direction="row" spacing={50} justifyContent='space-between' alignItems='center'> {/* className = 'stack--buttons' */}
                      <Chip avatar={<Avatar sx={{ bgcolor: red[100] }}><IconButton aria-label="Go Back"><ArrowBackIcon /></IconButton></Avatar>} label="Go Back" variant="outlined" onClick={handleClick} />
                      <Chip avatar={<Avatar sx={{ bgcolor: yellow[100] }}><IconButton aria-label="Edit Button"><ModeEditIcon /></IconButton></Avatar>} label="Edit Product" variant="outlined" onClick={()=> setEnableEdit(true)} />
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
                    <Stack direction="row" spacing={49} justifyContent='space-between' alignItems='center' className='stack--buttons'> {/* className = 'stack--buttons' */}
                      <Chip avatar={<Avatar sx={{ bgcolor: red[100] }}><IconButton aria-label="Go Back"><ArrowBackIcon /></IconButton></Avatar>} label="Go Back" variant="outlined" onClick={handleClick} />
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