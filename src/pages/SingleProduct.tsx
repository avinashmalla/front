import { Card, CardContent, CardMedia, Divider, Typography, CardActions, Chip, Avatar, IconButton, CssBaseline, Grid } from '@mui/material'
import { red } from '@mui/material/colors'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import useProduct from '../hooks/useProduct'
import '../styles/pages/_SingleProduct.scss'

const SingleProduct = () => {
    const {productId} = useParams()
    const product = useProduct(productId)
    const navigate = useNavigate()

    function handleClick() {
      navigate("../", { replace: true });
    }
    

  return (
    <><CssBaseline />
    <Grid container spacing={2} padding={2} >
      <Grid item xs={2} md={2}>Sidebar</Grid>
      <Grid item xs={2} md={8} >
      {
      product 
      ? <Card sx={{ maxWidth: 600 }}>{/* sx={{ maxWidth: 300 }}*/}
                  <CardContent>
                    {/* <CardHeader title={product.title} subheader={product.price + "€"} /> */}
                    <CardMedia component="img" image={product.images[0]} alt="Product Image" className='products--single-image'/>
                    <Divider textAlign="left">.</Divider>
                    <Typography variant="subtitle2" align='left'>{product.title}</Typography>
                    {/* <Divider textAlign="right">.</Divider> */}
                    <Typography variant="h6" align='left'>{product.price}€ </Typography>
                    <Divider textAlign="left">.</Divider>
                    <Typography variant="body2" align='left'>{product.description}</Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Chip avatar={<Avatar sx={{ bgcolor: red[100] }}><IconButton aria-label="Go Back"><ArrowBackIcon /></IconButton></Avatar>} label="Go Back" variant="outlined"  onClick = {handleClick}/>
                  </CardActions>
                </Card>
      : <Typography variant="h6" align='left'>This product doesn't exist</Typography>
      }
      </Grid>
    </Grid>
    </>
  )
}

export default SingleProduct