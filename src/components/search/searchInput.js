import React, { useState } from 'react';
import logo from "../../assets/images/logo.png";
import search_icon from "../../assets/images/search_icon.png";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./style.scss";

const SearchInput = ({ searchValueDefault = '' }) => {

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(searchValueDefault);
  const handleSearchInputChange = e => {
    const { value } = e.target;
    setSearchValue(value);
  }
  const handleOnSubmit = e => {
    e.preventDefault();
    if(searchValue) {
      navigate(`/items?search=${searchValue}`);
    } else {
      navigate('/');
    }
  }
  
  return (
    <div className="search">
      <div className="container">
        <form data-testid="search-form" onSubmit={e => handleOnSubmit(e)}>
          <div className="input_box">
            <Link to="/"><img alt="logo" className="logo" src={logo}/></Link>
            <input type="text" data-testid="search-input" className="" value={searchValue || ''} onChange={e => handleSearchInputChange(e)} placeholder="Nunca dejes de buscar"/>
            <button type="submit">
              <img alt="search icon" height="15px" width="15px" src={search_icon} />  
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

 export default SearchInput;
