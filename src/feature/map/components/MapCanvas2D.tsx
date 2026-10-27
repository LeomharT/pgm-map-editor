import MapEngine2D from '@/engine/map-engine-2d';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MapCanvas2DContext } from '../context';
import MapCanvasMapController from './MapCanvasMapController';

export default function MapCanvas2D() {
  const ref = useRef<HTMLDivElement>(null);

  const [engine, setEngine] = useState<MapEngine2D | null>(null);

  const dispatchEvent = useCallback(
    (...args: Parameters<MapEngine2D['dispatchEvent']>) => {
      return engine?.dispatchEvent(...args);
    },
    [engine],
  );

  const addEventListener = useCallback(
    (...args: Parameters<MapEngine2D['addEventListener']>) => {
      return engine?.addEventListener(...args);
    },
    [engine],
  );

  const contextValue = useMemo(() => {
    return {
      dispatchEvent,
      addEventListener,
    };
  }, [dispatchEvent, addEventListener]);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const instance = new MapEngine2D(container);
    setEngine(instance);

    return () => instance.dispose();
  }, []);

  return (
    <MapCanvas2DContext.Provider value={contextValue}>
      <div ref={ref} className='h-dvh w-dvw'>
        <MapCanvasMapController />
      </div>
    </MapCanvas2DContext.Provider>
  );
}
