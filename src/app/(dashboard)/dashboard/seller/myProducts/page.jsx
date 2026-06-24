import DashboardHeadding from '@/app/Component/Dashboard/DashboardHeadding';
import React from 'react';

const MyProductPage = () => {
    return (
         <section>
            <div className="container">
                <DashboardHeadding title=" My product" description=" See all your listing product" />
            </div>
        </section>
    );
};

export default MyProductPage;