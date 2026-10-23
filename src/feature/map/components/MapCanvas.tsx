import { Colors } from '@/constants/colors';
import { useEffect, useRef } from 'react';

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  dpr: Math.min(2, window.devicePixelRatio),
};

export default function MapCanvas() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const renderPending = useRef<boolean>(false);

  function getContext() {
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) throw new Error('Canvas context lose');
    return ctx;
  }

  function clean() {
    if (!canvas.current) return;

    const ctx = getContext();

    ctx.save();

    ctx.resetTransform();
    ctx.fillStyle = Colors.NEUTRAL100;
    ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);

    ctx.restore();
  }

  function resize() {
    if (!canvas.current) return;

    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    canvas.current.width = sizes.width * sizes.dpr;
    canvas.current.height = sizes.height * sizes.dpr;

    canvas.current.style.width = sizes.width + 'px';
    canvas.current.style.height = sizes.height + 'px';

    requestRender();
  }

  function render() {
    clean();
  }

  function requestRender() {
    if (renderPending.current) return;

    renderPending.current = true;
    requestAnimationFrame(() => {
      renderPending.current = false;
      render();
    });
  }

  useEffect(() => {
    resize();

    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas ref={canvas} />;
}
