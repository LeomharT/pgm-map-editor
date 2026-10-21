import Toolbar from '@/components/toolbar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider, useTheme } from '../components/ui/theme-provider';

export default function App() {
  const { theme } = useTheme();

  return (
    <ThemeProvider defaultTheme={theme} storageKey='vite-ui-theme'>
      <TooltipProvider>
        <div className='w-dvw h-dvh'>
          <Toolbar />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
