import { useTheme } from '@/components/ui/theme-provider';
import MapEngine2D from '@/engine/map-engine-2d';
import { GridLayer } from '@/engine/map-engine-2d/layers/GridLayer';
import { useEffect, useRef, useState } from 'react';
import { MapCanvas2DContext } from '../context';
import MapCanvas2DMapController from './MapCanvas2DMapController';

export default function MapCanvas2D() {
  const ref = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();

  const [engine, setEngine] = useState<MapEngine2D | null>(null);

  /**
   * Initial instance
   */
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

  /**
   * Toggle theme
   */
  useEffect(() => {
    if (!engine) return;
    engine.setTheme(theme);
  }, [engine, theme]);

  return (
    <MapCanvas2DContext.Provider value={{ engine: engine }}>
      <div ref={ref} className='bg-background relative h-dvh w-dvw'>
        {!engine ? null : (
          <>
            <MapCanvas2DMapController />
          </>
        )}
      </div>
    </MapCanvas2DContext.Provider>
  );
}
