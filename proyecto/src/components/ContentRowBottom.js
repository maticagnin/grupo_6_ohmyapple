import React from 'react';
import LastProduct from './LastProduct.js';
import LastUser from './LastUser.js';
import CategoryList from './CategoryList.js';
import ProductList from './ProductList.js';


function ContentRowBottom(){
    return (
        <div className="row">
            
            <LastProduct lastProduct = "35"/>
            <LastUser lastUser = "35"/>
            <CategoryList categoryList = "35"/>
            <ProductList productList = "35"/>

        </div>
    )
}

export default ContentRowBottom;