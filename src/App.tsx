import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './App.scss';
// import './styles/App.scss'

import { useAppDispatch } from './hooks/appHooks';
import {fetchProducts} from './redux/reducers/productReducer'
import NavBar from './components/NavBar'
import Homepage from './pages/Homepage'
import Products from './pages/Products'
import SingleProduct from './pages/SingleProduct'
import Profile from './pages/Profile'

function App() {

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchProducts({offset: 0, limit: 30}))
  }, [])
  
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  })
  

  return (
    <ThemeProvider theme={lightTheme}>
    <div className="App">
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path='' element= {<Homepage />} />
          <Route path='products' >
            <Route path='' element = {<Products />}/>
            <Route path=':productId' element = {<SingleProduct />}/>
          </Route>
          <Route path = 'profile' element = {<Profile />} />

        </Routes>
      </BrowserRouter>
    </div>
    </ThemeProvider>
  );
}

export default App;
