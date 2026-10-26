import type MapEngine2D from '@/engine/map-engine-2d';
import { createContext } from 'react';

type MapCanvas2DContextValue = {
  engine: MapEngine2D | null;
};

export const MapCanvas2DContext = createContext<MapCanvas2DContextValue>(
  {} as MapCanvas2DContextValue,
);
