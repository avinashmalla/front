import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, CssBaseline, Divider, Grid, IconButton, Stack, Typography, TextField } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useAppDispatch, useAppSelector } from '../hooks/appHooks'
import purple from '@mui/material/colors/purple';
import { useNavigate } from 'react-router-dom';

import '../styles/pages/_Products.scss'
import { deleteProductASync, fetchProducts } from '../redux/reducers/productReducer';
import { useState } from 'react';

const Products = () => {
  const products = useAppSelector(state => state.productReducer)
  const [pageNum, setPageNum] = useState(0)
  const [perPage, setPerPage] = useState(12)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const deleteProduct = (productId: string) => {
    dispatch(deleteProductASync(productId))
  }

  const onChangePage = (input: 'left' | 'right') => {
    if (pageNum > 0 && input === 'left') {
      setPageNum(pageNum - 1)
    } else {
      setPageNum(pageNum + 1)
    }
    dispatch(fetchProducts({
      offset: pageNum,
      limit: 12
    }))
  }

  return (
    <>
      <CssBaseline />
      <Grid container spacing={2} padding={2} >
        <Grid item xs={12} justifyContent="space-between" >
          <IconButton aria-label="Pagination Left" onClick={() => onChangePage('left')}><KeyboardArrowLeftIcon /></IconButton>
          {/* <TextField hiddenLabel variant = "filled" defaultValue={30} onChange = {(e) => setPerPage(Number(e.target.value))} /> */}
          <IconButton aria-label="Pagination Right" onClick={() => onChangePage('right')}><KeyboardArrowRightIcon /></IconButton>
        </Grid>
        <Grid item xs={12} className='grid--products' >
          <Grid container direction='row' maxWidth='md' rowSpacing={2} columnSpacing={3} className='grid--products--container' >
            {products && products.map(product => (
              <Grid item key={product.id}>
                <Card className='products--card'>
                  <CardContent>
                    <Typography variant="body2" align='left'>ID: {product.id}</Typography>
                    <CardMedia component="img" className='products--main-image' image={product.images[0]} alt="Product Image" onClick={() => navigate(`${product.id}`)} />
                    <Divider textAlign="left">.</Divider>
                    <Typography variant="subtitle2" align='left'>{product.title}</Typography>
                    <Typography variant="h6" align='left'>{product.price}€ </Typography>
                    <Divider textAlign="left">.</Divider>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Chip avatar={<Avatar sx={{ bgcolor: purple[100] }}><IconButton aria-label="delete this item"><DeleteForeverIcon /></IconButton></Avatar>} label="Remove this item" variant="outlined" onClick={() => deleteProduct(product.id)} />
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