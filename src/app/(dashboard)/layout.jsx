import Sidebar from "../Component/Dashboard/Sidebar";

const DashbordLayoutPage = ({children}) => {
    return (
        <>
        <Sidebar/>
        <main>
            {children}
        </main>
        </>
    );
};

export default DashbordLayoutPage;