import MapEngine2D from '@/engine/map-engine-2d';
import { useEffect, useRef } from 'react';

export default function MapCanvas() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const engine = new MapEngine2D(container);

    return () => engine.dispose();
  }, []);

  return <div ref={ref} className='h-dvh w-dvw'></div>;
}
