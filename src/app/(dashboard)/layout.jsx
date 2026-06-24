import Sidebar from "../Component/Dashboard/Sidebar";

const DashbordLayoutPage = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main  className="w-full">
        {children}
      </main>
    </div>
  );
};

export default DashbordLayoutPage;