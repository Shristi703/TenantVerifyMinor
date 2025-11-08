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
// Protected Route
// testt
import ProtectedRoute from "./components/ProtectedRoute";

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
              <Route path="/help" element={<HelpPage />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/messages/:conversationId" element={<Messages />} />

              {/* Tenant Routes */}
              <Route
                path="/tenant/dashboard"
                element={
                  <ProtectedRoute requiredRole="tenant">
                    <RequestsList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tenant/requests"
                element={
                  <ProtectedRoute requiredRole="tenant">
                    <RequestsList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tenant/request/new"
                element={
                  <ProtectedRoute requiredRole="tenant">
                    <RequestNew />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tenant/request/new/:listingId"
                element={
                  <ProtectedRoute requiredRole="tenant">
                    <RequestNew />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tenant/profile"
                element={
                  <ProtectedRoute requiredRole="tenant">
                    <TenantProfile />
                  </ProtectedRoute>
                }
              />

              {/* Landlord Routes */}
              <Route
                path="/landlord/dashboard"
                element={
                  <ProtectedRoute requiredRole="landlord">
                    <LandlordDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/landlord/request/:id"
                element={
                  <ProtectedRoute requiredRole="landlord">
                    <RequestDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/landlord/profile"
                element={
                  <ProtectedRoute requiredRole="landlord">
                    <LandlordProfile />
                  </ProtectedRoute>
                }
              />
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
