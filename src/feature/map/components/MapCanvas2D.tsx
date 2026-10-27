import MapEngine2D from '@/engine/map-engine-2d';
import { useEffect, useRef } from 'react';
import MapCanvasMapController from './MapCanvasMapController';

export default function MapCanvas2D() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const instance = new MapEngine2D();
    ref.current?.append(instance.canvas);

    return () => instance.dispose();
  }, []);

  return (
    <div ref={ref} className='h-dvh w-dvw bg-neutral-50'>
      <MapCanvasMapController />
    </div>
  );
}
