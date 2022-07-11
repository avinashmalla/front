import { Grid, Typography, Box, Card, CardMedia, CardContent } from '@mui/material'
import React, { useEffect } from 'react'
import Login from '../components/Login'
import { useAppDispatch, useAppSelector } from '../hooks/appHooks'
import { fetchCategories } from '../redux/reducers/categoryReducer'


const Homepage = () => {
  const categories = useAppSelector(state => state.categoryReducer.categories)
  const productList = useAppSelector(state => state.categoryReducer.productList)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  return (
   
    <Grid container direction='column'>
        <Grid item xs={12}>
          banner
        </Grid>
        <Grid item container xs justifyContent='center'>
          products by category
        </Grid>
      </Grid>
    // </Box>
  )
}

export default Homepage