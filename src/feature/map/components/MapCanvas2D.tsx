import MapEngine2D from '@/engine/map-engine-2d';
import { useEffect, useRef, useState } from 'react';
import { MapCanvas2DContext } from '../context';
import MapCanvasMapController from './MapCanvasMapController';

export default function MapCanvas2D() {
  const ref = useRef<HTMLDivElement>(null);

  const [engine, setEngine] = useState<MapEngine2D | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const instance = new MapEngine2D();
    ref.current.append(instance.canvas);

    setEngine(instance);

    return () => {
      instance.dispose();
    };
  }, []);

  return (
    <MapCanvas2DContext.Provider value={{ engine: engine }}>
      <div ref={ref} className='h-dvh w-dvw bg-neutral-50'>
        <MapCanvasMapController />
      </div>
    </MapCanvas2DContext.Provider>
  );
}
