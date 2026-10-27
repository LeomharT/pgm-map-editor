import MapEngine2D from '@/engine/map-engine-2d';

let current: { id: number; engine: MapEngine2D } | null = null;

const listeners = new Set<() => void>();
let nextId = 0;

function emit() {
  listeners.forEach((listener) => listener());
}

export const mapCanvas2DStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    return current;
  },
  init() {
    current = {
      id: ++nextId,
      engine: new MapEngine2D(),
    };
    emit();

    return current;
  },
  destroy() {
    if (!current) return;
    current.engine.dispose();
    current = null;
    emit();
  },
};
