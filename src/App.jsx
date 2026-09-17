import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RotationProvider } from './context/RotationContext';

// Layouts
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { MobileNavigation } from './components/layout/MobileNavigation';
import { Footer } from './components/layout/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { RotationHubPage } from './pages/RotationHubPage';
import { TopicDetailPage } from './pages/TopicDetailPage';
import { CasesPage } from './pages/CasesPage';
import { CaseDetailPage } from './pages/CaseDetailPage';
import { MyCasesPage } from './pages/MyCasesPage';
import { SkillsPage } from './pages/SkillsPage';
import { QuestionBankPage } from './pages/QuestionBankPage';
import { QuizPage } from './pages/QuizPage';
import { AIAttendingPage } from './pages/AIAttendingPage';
import { PresentationTrainerPage } from './pages/PresentationTrainerPage';
import { AICoachPage } from './pages/AICoachPage';
import { ProgressPage } from './pages/ProgressPage';
import { CalendarPage } from './pages/CalendarPage';
import { HistoryPage } from './pages/HistoryPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminPage } from './pages/AdminPage';
import { AICoachDrawer } from './components/AICoachDrawer';
import { LocalDataMigrationModal } from './components/LocalDataMigrationModal';

function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0">
        <TopBar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
      <MobileNavigation />
      <AICoachDrawer />
      <LocalDataMigrationModal />
    </div>
  );
}


function MainRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public / Landing Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ForgotPasswordPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />

      {/* App Routes wrapped in AppLayout */}
      <Route path="/dashboard" element={<AppLayout><DashboardPage /></AppLayout>} />
      <Route path="/rotation" element={<AppLayout><RotationHubPage /></AppLayout>} />
      <Route path="/rotation/topics" element={<AppLayout><RotationHubPage /></AppLayout>} />
      <Route path="/rotation/topics/:id" element={<AppLayout><TopicDetailPage /></AppLayout>} />
      <Route path="/rotation/cases" element={<AppLayout><CasesPage /></AppLayout>} />
      <Route path="/rotation/cases/:id" element={<AppLayout><CaseDetailPage /></AppLayout>} />
      <Route path="/cases" element={<AppLayout><MyCasesPage /></AppLayout>} />
      <Route path="/skills" element={<AppLayout><SkillsPage /></AppLayout>} />
      <Route path="/questions" element={<AppLayout><QuestionBankPage /></AppLayout>} />
      <Route path="/quiz" element={<AppLayout><QuizPage /></AppLayout>} />
      <Route path="/presentation" element={<AppLayout><PresentationTrainerPage /></AppLayout>} />
      <Route path="/ai-attending" element={<AppLayout><AIAttendingPage /></AppLayout>} />
      <Route path="/ai-coach" element={<AppLayout><AICoachPage /></AppLayout>} />
      <Route path="/progress" element={<AppLayout><ProgressPage /></AppLayout>} />
      <Route path="/calendar" element={<AppLayout><CalendarPage /></AppLayout>} />
      <Route path="/history" element={<AppLayout><HistoryPage /></AppLayout>} />
      <Route path="/profile" element={<AppLayout><ProfilePage /></AppLayout>} />
      <Route path="/settings" element={<AppLayout><SettingsPage /></AppLayout>} />
      <Route path="/admin" element={<AppLayout><AdminPage /></AppLayout>} />


      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RotationProvider>
          <Router>
            <MainRoutes />
          </Router>
        </RotationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
