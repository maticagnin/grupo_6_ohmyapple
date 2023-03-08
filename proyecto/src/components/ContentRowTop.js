import React from 'react';
import TotalProducts from './TotalProducts.js';
import TotalUsers from './TotalUsers.js';
import TotalCategories from './TotalCategories.js';


function ContentRowTop(){
    return (
		<React.Fragment>
				<div className="container-fluid">
					<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
					</div>
					<TotalProducts />
					<TotalUsers cantidadUsers = "35"/>
					<TotalCategories cantidadCategories = "35"/>
	
				</div>
		</React.Fragment>

    )
}
export default ContentRowTop;