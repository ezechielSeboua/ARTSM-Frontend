import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PreviewNotFound from "./components/Errors/NotFound";
import PreviewUnauthorized from "./components/Errors/Unauthorized";
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
import LoginPage from "./pages/Auth/LoginPage";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/acceuil" element={<HomePage />} />
        {/* <Route path="/Tableau-de-bord" element={<PreviewUnauthorized />} /> */}
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/institution" element={<InstitutionsPage />} />
        <Route path="/ecoles" element={<SchoolsPage />} />
        <Route path="/formation-continue" element={<TrainingPage />} />
        <Route path="/seminaires" element={<SeminarPage />} />
        <Route path="/actualites" element={<NewsPage />} />
        <Route path="/mediatheque" element={<MediaLibraryPage />} />
        <Route path="/choix-profil" element={<ProfileSelectionPage />} />
        <Route path="/tableau-de-bord" element={<DashboardLayout />} />
        <Route path="/register/candidats" element={<CandidateRegisterForm />} />
        <Route
          path="/register/professionels"
          element={<ProfessionalRegisterForm />}
        />
        <Route path="/register/compagnies" element={<CompanyRegisterForm />} />
        <Route path="/connexion" element={<LoginPage />} />
        <Route path="*" element={<PreviewNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
