import Toolbar from '@/components/toolbar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { clamp } from '@/utils/math';
import { Application, Container, Graphics } from 'pixi.js';
import { useEffect, useEffectEvent, useRef } from 'react';
import { ThemeProvider, useTheme } from '../components/ui/theme-provider';

export default function App() {
  const { theme } = useTheme();

  const ref = useRef<HTMLDivElement>(null);

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
      autoStart: false,
      sharedTicker: false,
    });
    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;

    const world = new Container();
    app.stage.addChild(world);

    app.stage.on('pointerdown', (e) => {
      e.stopPropagation();
      canvas.setPointerCapture(e.pointerId);

      transformRef.current.x = e.clientX;
      transformRef.current.y = e.clientY;
    });

    app.stage.on('pointerup', (e) => {
      if (canvas.hasPointerCapture(e.pointerId)) {
        canvas.releasePointerCapture(e.pointerId);
      }
    });

    app.stage.on('globalpointermove', (e) => {
      if (!canvas.hasPointerCapture(e.pointerId)) return;

      world.position.x += e.clientX - transformRef.current.x;
      world.position.y += e.clientY - transformRef.current.y;

      transformRef.current.x = e.clientX;
      transformRef.current.y = e.clientY;

      app.render();
    });

    app.stage.on('wheel', (e) => {
      e.preventDefault();

      const mouse = e.getLocalPosition(world.parent!);

      const prev = world.scale.x;
      const next = clamp(prev * Math.exp(-e.deltaY * 0.001), 0.2, 100);

      const k = next / prev;

      world.position.x = mouse.x - (mouse.x - world.position.x) * k;
      world.position.y = mouse.y - (mouse.y - world.position.y) * k;

      world.scale.set(next, next);

      app.render();
    });

    const canvas = app.canvas;
    ref.current?.append(canvas);

    const container = new Container({});
    world.addChild(container);

    const obj = new Graphics().rect(0, 0, 100, 100).fill('cyan');
    container.addChild(obj);

    app.render();
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
