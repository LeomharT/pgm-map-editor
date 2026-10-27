import type MapEngine2D from '@/engine/map-engine-2d';
import { createContext } from 'react';

type MapCanvas2DContextValue = {
  dispatchEvent: (
    ...args: Parameters<MapEngine2D['dispatchEvent']>
  ) => ReturnType<MapEngine2D['dispatchEvent']> | undefined;
  addEventListener: (...args: Parameters<MapEngine2D['addEventListener']>) => void;
};

export const MapCanvas2DContext = createContext<MapCanvas2DContextValue>(
  {} as MapCanvas2DContextValue,
);
