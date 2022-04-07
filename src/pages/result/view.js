import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router';
import shipping_icon from "../../assets/images/shipping.png";
import SearchInput from '../../components/search/searchInput';
import "./style.scss";
import { searchProducts } from '../../helpers/requestAxios';
import ListCategories from '../../components/category/category'

const Result = () => {

  let location = useLocation();
  const [products, setProducts] = useState([]); 
  const [categories, setCategories] = useState([]); 
  const [search, setSearch] = useState(location.search.replace("?search=", ""));
  
  useEffect(
    () => {
      setSearch(location.search.replace("?search=", ""));
      searchProducts(search).then(({ items, categories}) => {
        setProducts(items);
        setCategories(categories);
      })
    },
    [location]
  )

  return(
      <div>
        <SearchInput searchValueDefault={search} />
        <ListCategories categories={categories} />
        {
          products.map( pro => (
            <div className="container result" key={pro.id}>
              <Link to={`/items/${pro.id}`} >
                <div className="result_box">
                  <div className="image">
                    <img alt="Product" className="image_product" src={pro.picture}></img>
                  </div>
                  <div className="detail_product">
                    <h3>${Number(pro.price?.amount + pro.price?.decimals).toLocaleString('de-DE') }
                    {
                      pro.free_shipping && <img alt="shipping icon" className="image_shipping" src={shipping_icon}></img>
                    }
                    </h3>
                    <h4>{pro.title}</h4>
                    <h4>{pro.condition ? "Completo Unico!" : "Completo Usado!"}</h4>
                  </div>
                  <div className="origin">
                    <p>{pro.origin}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        }
      </div>
  )
}

export default Result;
