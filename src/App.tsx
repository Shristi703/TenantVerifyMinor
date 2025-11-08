import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "components/theme-provider";
import Header from "components/Header";
import Footer from "components/Footer";
import HomePage from "./pages/HomePage";
import SolutionPage from "./pages/SolutionPage";
import EncoraReusePage from "./pages/EncoraReusePage";
import EncoraAccessPage from "./pages/EncoraAccessPage";
import BlogDocPage from "./pages/BlogDocPage";
import ContactUsPage from "./pages/ContactUsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Listings from "./pages/Listings";
import ListingDetail from "./pages/ListingDetail";
// Generic Pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
// Tenant Pages
import RequestsList from "./pages/Tenant/RequestsList";
import RequestNew from "./pages/Tenant/RequestNew";
import TenantProfile from "./pages/Tenant/Profile";
// Landlord Pages
import LandlordDashboard from "./pages/Landlord/Dashboard";
import RequestDetail from "./pages/Landlord/RequestDetail";
import LandlordProfile from "./pages/Landlord/Profile";
// New Pages
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import HelpPage from "./pages/HelpPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <Router>
        <div className="flex flex-col min-h-screen w-full">
          <Header />
          <main className="flex-1 w-full">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/solution" element={<SolutionPage />} />
              <Route path="/encora-reuse" element={<EncoraReusePage />} />
              <Route path="/encora-access" element={<EncoraAccessPage />} />
              <Route path="/blog-doc" element={<BlogDocPage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/listing/:id" element={<ListingDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/messages/:conversationId" element={<Messages />} />

              {/* Tenant Routes */}
              <Route path="/tenant/dashboard" element={<RequestsList />} />
              <Route path="/tenant/requests" element={<RequestsList />} />
              <Route path="/tenant/request/new" element={<RequestNew />} />
              <Route path="/tenant/request/new/:listingId" element={<RequestNew />} />
              <Route path="/tenant/profile" element={<TenantProfile />} />

              {/* Landlord Routes */}
              <Route path="/landlord/dashboard" element={<LandlordDashboard />} />
              <Route path="/landlord/request/:id" element={<RequestDetail />} />
              <Route path="/landlord/profile" element={<LandlordProfile />} />
              {/* 404 Catch All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
