import Toolbar from '@/components/toolbar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { ThemeProvider, useTheme } from '../components/ui/theme-provider';

const IMG_URL =
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png';

export default function App() {
  const { theme } = useTheme();

  return (
    <ThemeProvider defaultTheme={theme} storageKey='vite-ui-theme'>
      <TooltipProvider>
        <div className='w-dvw h-dvh'>
          <TransformWrapper
            pinch={{
              allowPanning: true,
            }}
            maxScale={10}
            minScale={0.2}
            fitOnInit
            limitToBounds
          >
            <TransformComponent>
              <img src={IMG_URL} />
            </TransformComponent>
          </TransformWrapper>
          <Toolbar />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
