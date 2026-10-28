import { EventDispatcher } from '@/lib/eventDispatcher';
import { clamp } from '@/utils/math';

export type ViewPortTransform = {
  x: number;
  y: number;
  scale: number;
};

export default class MapEngine2DViewport extends EventDispatcher<{
  transform: { transform: ViewPortTransform };
}> {
  constructor() {
    super();
  }

  public get transform(): ViewPortTransform {
    return { x: this._x, y: this._y, scale: this._scale };
  }

  private _x: number = 0;

  private _y: number = 0;

  private _scale: number = 1;

  public setTransform = (
    args: ViewPortTransform | ((transform: ViewPortTransform) => ViewPortTransform),
  ) => {
    let transform: ViewPortTransform;

    if (args instanceof Function) {
      transform = args.call(this, this.transform);
    } else {
      transform = args;
    }

    this._x = transform.x;
    this._y = transform.y;

    this._scale = transform.scale;

    this.dispatchEvent({ type: 'transform', transform: this.transform });
  };

  public zoomAt = (anchorX: number, anchorY: number, scaleStep: number) => {
    const next = clamp(this._scale * Math.exp(scaleStep), 0.2, 10);

    const k = next / this._scale;

    this.setTransform({
      x: anchorX - (anchorX - this._x) * k,
      y: anchorY - (anchorY - this._y) * k,
      scale: next,
    });
  };
}
