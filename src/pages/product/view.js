import React, {useEffect, useState} from 'react';
import SearchInput from '../../components/search/searchInput';
import { useLocation } from 'react-router';
import "./style.scss";
import { productDetails } from '../../helpers/requestAxios';
import ListCategories from '../../components/category/category'

const Products = () => {

  let location = useLocation();
  const [product, setProduct] = useState(''); 
  const [categories, setCategories] = useState([]);

  useEffect(
    () => {
      const search = location.pathname.replace("/items/", "");
      productDetails(search).then(({ item }) => {
        setProduct(item);
        setCategories(item.categories);
      })
    },
    [location]
  )

  return(
    <>
      <SearchInput/>
      <ListCategories categories={categories} />
      <div className="container">
        <div className="product">
          <div className="image">
            <img className="image_product" alt="product" src={product.picture?.replace('com/D','com/D_NQ_NP').replace("I.jpg", "O.webp")}></img>
          </div>
          <div className="details">
            <p>{ product.condition === "new" ? "Nuevo" : "Usado"} - {product.sold_quantity} Vendidos</p>
            <h4>{product.title}</h4>
            <h3>$ {Number(product.price?.amount).toLocaleString('de-DE') }<sup>{product.price?.decimals}</sup></h3>
            <button>Comprar</button>
          </div>
        </div>
        <div className="description">
          <h3>Descripcion del producto</h3>
          <p>{product.description}</p>
        </div>
      </div>
    </>
  )
}

export default Products;