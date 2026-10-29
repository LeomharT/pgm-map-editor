import Toolbar from '@/components/toolbar';
import { ThemeProvider } from '@/components/ui/theme-provider';
import MapCanvas2D from '@/feature/map/components/MapCanvas2D';

export default function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <MapCanvas2D />
      <Toolbar />
    </ThemeProvider>
  );
}
