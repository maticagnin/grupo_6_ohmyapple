import React from 'react';
import TotalProducts from './TotalProducts.js';
import TotalUsers from './TotalUsers.js';
import TotalCategories from './TotalCategories.js';


function ContentRowTop(){
    return (
				<div className="container-fluid">
					<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
					</div>
					<TotalProducts cantidadProducts = "35" />
					<TotalUsers cantidadUsers = "35"/>
					<TotalCategories cantidadCategories = "35"/>
	
				</div>
    )
}
export default ContentRowTop;