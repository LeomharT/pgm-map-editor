import Toolbar from '@/components/toolbar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Application, Container, Graphics } from 'pixi.js';
import { useEffect, useEffectEvent, useRef } from 'react';
import { ThemeProvider, useTheme } from '../components/ui/theme-provider';
export default function App() {
  const { theme } = useTheme();

  const ref = useRef<HTMLDivElement>(null);

  const prevRef = useRef({
    x: 0,
    y: 0,
  });

  const transformRef = useRef({
    x: 0,
    y: 0,
  });

  const initialApplication = useEffectEvent(async () => {
    const app = new Application();
    await app.init({
      antialias: true,
      resizeTo: window,
      resolution: window.devicePixelRatio,
      autoDensity: true,
    });
    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;

    const canvas = app.canvas;

    ref.current?.append(canvas);

    const container = new Container({});
    app.stage.addChild(container);

    const obj = new Graphics().rect(0, 0, 100, 100).fill('cyan');
    obj.eventMode = 'static';
    obj.cursor = 'grab';

    obj.on('pointerdown', (e) => {
      e.stopPropagation();
      canvas.setPointerCapture(e.pointerId);

      obj.cursor = 'grabbing';
      canvas.style.cursor = 'grabbing';

      prevRef.current.x = e.clientX;
      prevRef.current.y = e.clientY;
    });

    obj.on('pointerup', (e) => {
      obj.cursor = 'grab';
      canvas.style.cursor = 'grab';

      if (canvas.hasPointerCapture(e.pointerId)) {
        canvas.releasePointerCapture(e.pointerId);
      }
    });

    obj.on('globalpointermove', (e) => {
      if (!canvas.hasPointerCapture(e.pointerId)) return;

      obj.position.x += e.clientX - prevRef.current.x;
      obj.position.y += e.clientY - prevRef.current.y;

      prevRef.current.x = e.clientX;
      prevRef.current.y = e.clientY;
    });

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
