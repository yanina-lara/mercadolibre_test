import React from 'react';
import "./style.scss";

const ListCategories = ({ categories }) => {

  return (
    <div className="container">
      <div className="categories">
        {categories.map((categorie, index) => index < categories.length - 1 ?
          <span>{`${categorie} > `}</span> :
          <span><b>{`${categorie}`}</b></span>
        )}
      </div>
    </div>
  );
};

export default ListCategories;
