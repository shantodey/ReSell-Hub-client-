import DashboardHeadding from '@/app/Component/Dashboard/DashboardHeadding';
import React from 'react';

const ManageOrdersPage = () => {
    return (
        <section>
            <div className="container">
                <DashboardHeadding title="Buyers Orders" description=" See all the products ordered from buyer" />
            </div>
        </section>
    );
};

export default ManageOrdersPage;