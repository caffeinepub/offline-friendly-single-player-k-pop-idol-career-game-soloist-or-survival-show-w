import { ReactNode } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Home, History, Settings } from 'lucide-react';
import LoginButton from './LoginButton';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const showNav = currentPath !== '/';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#1a0a1a] to-[#0a0a0a]">
      {showNav && (
        <header className="border-b border-white/10 bg-black/40 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate({ to: '/career' })}
                className="text-[oklch(0.8_0.25_340)] hover:text-[oklch(0.9_0.25_340)] hover:bg-[oklch(0.8_0.25_340)]/10"
              >
                <Home className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate({ to: '/history' })}
                className="text-[oklch(0.8_0.25_340)] hover:text-[oklch(0.9_0.25_340)] hover:bg-[oklch(0.8_0.25_340)]/10"
              >
                <History className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate({ to: '/settings' })}
                className="text-[oklch(0.8_0.25_340)] hover:text-[oklch(0.9_0.25_340)] hover:bg-[oklch(0.8_0.25_340)]/10"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
            <LoginButton />
          </div>
        </header>
      )}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-white/60">
          © 2026. Built with <span className="text-[oklch(0.8_0.25_340)]">♥</span> using{' '}
          <a 
            href="https://caffeine.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[oklch(0.8_0.25_340)] hover:text-[oklch(0.9_0.25_340)] transition-colors"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
