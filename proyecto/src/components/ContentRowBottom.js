import React from 'react';
import LastProduct from './LastProduct.js';
import LastUser from './LastUser.js';
import CategoryList from './CategoryList.js';
import ProductList from './ProductList.js';


function ContentRowBottom(){
    return (
        <div className="row">
            
            <LastProduct />
            <LastUser />
            <CategoryList />
            <ProductList />

        </div>
    )
}

export default ContentRowBottom;