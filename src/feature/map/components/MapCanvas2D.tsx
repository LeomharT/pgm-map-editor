/* eslint-disable react-hooks/refs */
import MapEngine2D from '@/engine/map-engine-2d';
import { useEffect, useRef } from 'react';
import { MapCanvas2DContext } from '../context';

export default function MapCanvas2D() {
  const ref = useRef<HTMLDivElement>(null);

  const engineRef = useRef<MapEngine2D>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const engine = new MapEngine2D(container);
    engineRef.current = engine;

    return () => engine.dispose();
  }, []);

  return (
    <MapCanvas2DContext.Provider
      value={{
        engine: engineRef.current,
      }}
    >
      <div ref={ref} className='h-dvh w-dvw'></div>
    </MapCanvas2DContext.Provider>
  );
}
