import React from 'react';
import ContentRowTop from './ContentRowTop.js';
import ContentRowBottom from './ContentRowBottom.js';

function ContentWrapper(){
    return (
        <React.Fragment>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <ContentRowTop />
                    <ContentRowBottom />
                </div>
            </div>    
        </React.Fragment>
    )
}
export default ContentWrapper;