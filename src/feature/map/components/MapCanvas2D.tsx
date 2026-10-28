import MapEngine2D from '@/engine/map-engine-2d';
import { GridLayer } from '@/engine/map-engine-2d/layers/GridLayer';
import { useEffect, useRef, useState } from 'react';
import { MapCanvas2DContext } from '../context';
import MapCanvasMapController from './MapCanvasMapController';

export default function MapCanvas2D() {
  const ref = useRef<HTMLDivElement>(null);

  const [engine, setEngine] = useState<MapEngine2D | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const instance = new MapEngine2D({
      container: ref.current,
    });

    instance.addLayer(new GridLayer());

    setEngine(instance);
    return () => {
      instance.dispose();
    };
  }, []);

  return (
    <MapCanvas2DContext.Provider value={{ engine: engine }}>
      <div ref={ref} className='relative h-dvh w-dvw bg-neutral-50'>
        {!engine ? null : (
          <>
            <MapCanvasMapController />
          </>
        )}
      </div>
    </MapCanvas2DContext.Provider>
  );
}
