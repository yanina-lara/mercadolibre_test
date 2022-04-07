import React from 'react';
import Search from '../pages/search/view';
import Result from '../pages/result/view';
import Product from '../pages/product/view'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Rutas = () => {
   return (
      <BrowserRouter>
         <Routes>       
           <Route path="/" element={<Search/>} />    
           <Route exact path="/items" element={<Result/>} />    
           <Route path="/items/:id" element={<Product/>} />    
         </Routes>
      </BrowserRouter>
   )
}

export default Rutas;