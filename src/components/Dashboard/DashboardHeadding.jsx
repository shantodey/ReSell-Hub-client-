import React from 'react';

const DashboardHeadding = ({title,description}) => {
    return (
        <div>
            <div className='border-b border-black/5 p-5'>
                <h1 className='text-3xl font-extrabold capitalize'>{title}</h1>
                <p> {description} </p>
            </div>
        </div>
    );
};

export default DashboardHeadding;