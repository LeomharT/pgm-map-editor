import Toolbar from '@/components/toolbar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Application, Container, Graphics } from 'pixi.js';
import { useEffect, useEffectEvent, useRef } from 'react';
import { ThemeProvider, useTheme } from '../components/ui/theme-provider';
export default function App() {
  const { theme } = useTheme();

  const ref = useRef<HTMLDivElement>(null);

  const initialApplication = useEffectEvent(async () => {
    if (ref.current?.querySelector('canvas')) return;

    //
    const app = new Application();
    await app.init({ antialias: true, resizeTo: window });
    ref.current?.append(app.canvas);

    const container = new Container({});
    container.eventMode = 'static';
    app.stage.addChild(container);

    const obj = new Graphics().rect(0, 0, 100, 100).fill('cyan');
    container.addChild(obj);
  });

  useEffect(() => {
    initialApplication();
  }, []);

  return (
    <ThemeProvider defaultTheme={theme} storageKey='vite-ui-theme'>
      <TooltipProvider>
        <main className='w-dvw h-dvh' ref={ref}>
          <Toolbar />
        </main>
      </TooltipProvider>
    </ThemeProvider>
  );
}
