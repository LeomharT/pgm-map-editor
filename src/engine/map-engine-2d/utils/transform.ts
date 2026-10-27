import { EventDispatcher } from '@/lib/eventDispatcher';

export default class MapEngine2DTransform extends EventDispatcher<{
  transform: {
    transform: {
      x: number;
      y: number;
      scale: number;
    };
  };
}> {
  constructor() {
    super();
  }

  public x: number = 0;

  public y: number = 0;

  public scale: number = 0;
}
