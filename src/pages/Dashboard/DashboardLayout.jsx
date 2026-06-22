import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/SideBar';
import useUserStore from '../../stores/useUserStore';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, fetchProfile } = useUserStore();

  useEffect(() => {
    if (!user) fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Backdrop mobile — clique pour fermer la sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:relative z-30 h-screen bg-blue-950 transition-all duration-300
        ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 w-0 lg:w-20'}`}>
        <Sidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Bouton ouverture sidebar sur mobile */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-10">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <svg className="w-5 h-5 text-blue-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-black text-blue-950 text-sm uppercase tracking-wide">ARSTM Dashboard</span>
        </div>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
