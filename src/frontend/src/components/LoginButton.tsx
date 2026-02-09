import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';

export default function LoginButton() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <Button
      onClick={handleAuth}
      disabled={disabled}
      variant={isAuthenticated ? 'outline' : 'default'}
      className={
        isAuthenticated
          ? 'border-[oklch(0.8_0.25_340)] text-[oklch(0.8_0.25_340)] hover:bg-[oklch(0.8_0.25_340)]/10'
          : 'bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)] hover:from-[oklch(0.85_0.25_340)] hover:to-[oklch(0.9_0.2_50)] text-white font-semibold'
      }
    >
      {loginStatus === 'logging-in' ? (
        'Logging in...'
      ) : isAuthenticated ? (
        <>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </>
      ) : (
        <>
          <LogIn className="h-4 w-4 mr-2" />
          Login
        </>
      )}
    </Button>
  );
}
