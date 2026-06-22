import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PreviewNotFound from "./components/Errors/NotFound";
import InstitutionsPage from "./pages/Institutions/InstitutionsPage";
import MediaLibraryPage from "./pages/Media Library/MediaLibraryPage";
import SeminarPage from "./pages/Seminar/SeminarPage";
import NewsPage from "./pages/News/NewsPage";
import TrainingPage from "./pages/Training/TrainingPage";
import SchoolsPage from "./pages/Schools/SchoolsPage";
import ProfileSelectionPage from "./pages/Profil/ProfileSelectionPage";
import CompanyRegisterForm from "./pages/Auth/Register/CompanyRegisterForm";
import ProfessionalRegisterForm from "./pages/Auth/Register/ProfessionalRegisterForm";
import CandidateRegisterForm from "./pages/Auth/Register/CandidateRegisterForm";
import ResearcherRegisterForm from "./pages/Auth/Register/ResearcherRegisterForm";
import DonorRegisterForm from "./pages/Auth/Register/DonorRegisterForm";
import LoginPage from "./pages/Auth/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import UtilisateursPage from "./pages/Dashboard/UtilisateursPage";
import FormationsPage from "./pages/Dashboard/FormationsPage";
import EcolesPage from "./pages/Dashboard/EcolesPage";
import SchoolDetailPage from "./pages/Schools/SchoolDetailPage";
import DomainesPage from "./pages/Dashboard/DomainesPage";
import AdmissionsPage from "./pages/Admissions/AdmissionsPage";
import ReferencesPage from "./pages/References/ReferencesPage";
import UserSpaceLayout from "./pages/UserSpace/UserSpaceLayout";
import UserSpaceHome from "./pages/UserSpace/UserSpaceHome";
import SecuritePage from "./pages/UserSpace/SecuritePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages publiques */}
        <Route path="/" element={<HomePage />} />
        <Route path="/accueil" element={<HomePage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/institution" element={<InstitutionsPage />} />
        <Route path="/ecoles" element={<SchoolsPage />} />
        <Route path="/ecoles/:slug" element={<SchoolDetailPage />} />
        <Route path="/formation-continue" element={<TrainingPage />} />
        <Route path="/seminaires" element={<SeminarPage />} />
        <Route path="/actualites" element={<NewsPage />} />
        <Route path="/mediatheque" element={<MediaLibraryPage />} />
        <Route path="/admissions" element={<AdmissionsPage />} />
        <Route path="/references" element={<ReferencesPage />} />

        {/* Authentification */}
        <Route path="/choix-profil" element={<ProfileSelectionPage />} />
        <Route path="/connexion" element={<LoginPage />} />
        <Route path="/register/candidats" element={<CandidateRegisterForm />} />
        <Route path="/register/professionels" element={<ProfessionalRegisterForm />} />
        <Route path="/register/recruteurs" element={<CompanyRegisterForm />} />
        <Route path="/register/chercheurs" element={<ResearcherRegisterForm />} />
        <Route path="/register/bailleurs" element={<DonorRegisterForm />} />

        {/* Dashboard — protégé */}
        <Route
          path="/tableau-de-bord"
          element={
            <ProtectedRoute roles={['admin', 'moderator']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="utilisateurs" element={<UtilisateursPage />} />
          <Route path="formations" element={<FormationsPage />} />
          <Route path="ecoles" element={<EcolesPage />} />
          <Route path="filieres" element={<DomainesPage />} />
          <Route path="securite" element={<SecuritePage />} />
        </Route>

        {/* Espace utilisateur — protégé (tous les rôles authentifiés) */}
        <Route
          path="/espace-utilisateur"
          element={
            <ProtectedRoute>
              <UserSpaceLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserSpaceHome />} />
          <Route path="securite" element={<SecuritePage />} />
        </Route>

        <Route path="*" element={<PreviewNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
