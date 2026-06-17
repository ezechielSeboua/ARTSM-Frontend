import { useState } from 'react';
import { Outlet } from 'react-router-dom'; // Nécessite react-router-dom
import Sidebar from '../../components/SideBar';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar : Fixe sur desktop, overlay sur mobile */}
      <aside className={`fixed lg:relative z-30 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0 lg:w-20'} h-screen bg-blue-950`}>
        <Sidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      </aside>

      {/* Contenu Principal */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Zone de chargement dynamique des pages */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* L'Outlet chargera tes pages enfants ici */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;