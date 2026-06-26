import { Toaster } from "react-hot-toast";
import Sidebar from "../Component/Dashboard/Sidebar";

const DashbordLayoutPage = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main  className="w-full">
        {children}
         <Toaster />
      </main>
    </div>
  );
};

export default DashbordLayoutPage;