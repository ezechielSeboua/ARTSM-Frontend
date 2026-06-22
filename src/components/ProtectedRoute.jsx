import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useUserStore from '../stores/useUserStore';

const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, user, loading, logout, fetchProfile } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthLogout = () => {
      logout();
      navigate('/connexion', { replace: true });
    };
    window.addEventListener('auth:logout', handleAuthLogout);
    return () => window.removeEventListener('auth:logout', handleAuthLogout);
  }, [logout, navigate]);

  // Charger le profil si un filtre de rôle est requis et que l'user n'est pas encore chargé
  useEffect(() => {
    if (isAuthenticated && !user && roles) fetchProfile();
  }, [isAuthenticated, user, roles]);

  if (!isAuthenticated) return <Navigate to="/connexion" replace />;

  if (roles) {
    // Attendre le chargement du profil avant de vérifier le rôle
    if (!user && loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <span className="w-8 h-8 border-2 border-blue-900/20 border-t-blue-900 rounded-full animate-spin" />
        </div>
      );
    }
    // Rôle non autorisé → redirection vers l'accueil
    if (user && !roles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
