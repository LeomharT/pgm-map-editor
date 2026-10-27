import MapEngine2D from '@/engine/map-engine-2d';
import { createContext, type RefObject } from 'react';

type MapCanvas2DContextValue = {
  engine: RefObject<MapEngine2D>;
};

export const MapCanvas2DContext = createContext<MapCanvas2DContextValue>(
  {} as MapCanvas2DContextValue,
);
