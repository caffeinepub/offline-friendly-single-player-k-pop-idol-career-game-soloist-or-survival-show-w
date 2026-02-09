import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import AppLayout from './components/AppLayout';
import LandingPage from './pages/LandingPage';
import NewGameModePage from './pages/NewGameModePage';
import CharacterSetupPage from './pages/CharacterSetupPage';
import ProfileSummaryPage from './pages/ProfileSummaryPage';
import AgencySelectionPage from './pages/AgencySelectionPage';
import CareerModePage from './pages/CareerModePage';
import SubmitPerformancePage from './pages/SubmitPerformancePage';
import ResultsFeedbackPage from './pages/ResultsFeedbackPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';

const rootRoute = createRootRoute({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const newGameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/new-game',
  component: NewGameModePage,
});

const characterSetupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/character-setup',
  component: CharacterSetupPage,
});

const profileSummaryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile-summary',
  component: ProfileSummaryPage,
});

const agencySelectionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/agency-selection',
  component: AgencySelectionPage,
});

const careerModeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/career',
  component: CareerModePage,
});

const submitPerformanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/submit-performance',
  component: SubmitPerformancePage,
});

const resultsFeedbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/results/$submissionId',
  component: ResultsFeedbackPage,
});

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/history',
  component: HistoryPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  newGameRoute,
  characterSetupRoute,
  profileSummaryRoute,
  agencySelectionRoute,
  careerModeRoute,
  submitPerformanceRoute,
  resultsFeedbackRoute,
  historyRoute,
  settingsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
