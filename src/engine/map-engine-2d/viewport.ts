import { EventDispatcher } from '@/lib/eventDispatcher';
import { clamp } from '@/utils/math';
import type MapEngine2D from '.';

export default class MapEngine2DViewport extends EventDispatcher<{
  transform: {
    transform: {
      x: number;
      y: number;
      scale: number;
    };
  };
}> {
  constructor(engine: MapEngine2D) {
    super();

    this._engine = engine;
    this._abortController = new AbortController();

    const { signal } = this._abortController;

    this._engine.canvas.addEventListener('pointerdown', this._handleOnPointerDown, { signal });
    this._engine.canvas.addEventListener('pointerup', this._handleOnPointerUp, { signal });
    this._engine.canvas.addEventListener('pointermove', this._handleOnPointerMove, { signal });
    this._engine.canvas.addEventListener('wheel', this._handleOnWheel, { signal, passive: false });
  }

  private _engine: MapEngine2D;

  private _abortController: AbortController;

  public get transform() {
    return { x: this._x, y: this._y, scale: this._scale };
  }

  private _x: number = 0;

  private _y: number = 0;

  private _scale: number = 1;

  private _prev = { x: 0, y: 0 };

  private _handleOnPointerDown = (e: PointerEvent) => {
    this._engine.canvas.setPointerCapture(e.pointerId);

    this._prev.x = e.clientX;
    this._prev.y = e.clientY;
  };

  private _handleOnPointerUp = (e: PointerEvent) => {
    if (this._engine.canvas.hasPointerCapture(e.pointerId)) {
      this._engine.canvas.releasePointerCapture(e.pointerId);
    }
  };

  private _handleOnPointerMove = (e: PointerEvent) => {
    if (!this._engine.canvas.hasPointerCapture(e.pointerId)) return;

    this._x += e.clientX - this._prev.x;
    this._y += e.clientY - this._prev.y;

    this._prev.x = e.clientX;
    this._prev.y = e.clientY;

    this.dispatchEvent({ type: 'transform', transform: this.transform });
  };

  private _handleOnWheel = (e: WheelEvent) => {
    e.preventDefault();

    const next = clamp(this._scale * Math.exp(-e.deltaY * 0.001), 0.2, 10);

    const k = next / this._scale;

    this._x = e.clientX - (e.clientX - this._x) * k;
    this._y = e.clientY - (e.clientY - this._y) * k;

    this._scale = next;

    this.dispatchEvent({ type: 'transform', transform: this.transform });
  };

  public zoomAt = () => {};

  public dispose = () => {
    this._abortController.abort();
  };
}
