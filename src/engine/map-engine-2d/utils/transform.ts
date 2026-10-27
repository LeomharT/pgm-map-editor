import { EventDispatcher } from '@/lib/eventDispatcher';
import { clamp } from '@/utils/math';
import type MapEngine2D from '..';

export default class MapEngine2DTransform extends EventDispatcher<{
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

  private get _transform() {
    return { x: this.x, y: this.y, scale: this.scale };
  }

  public x: number = 0;

  public y: number = 0;

  public scale: number = 1;

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

    this.x += e.clientX - this._prev.x;
    this.y += e.clientY - this._prev.y;

    this._prev.x = e.clientX;
    this._prev.y = e.clientY;

    this.dispatchEvent({ type: 'transform', transform: this._transform });
  };

  private _handleOnWheel = (e: WheelEvent) => {
    e.preventDefault();

    const next = clamp(this.scale * Math.exp(-e.deltaY * 0.001), 0.2, 10);

    const k = next / this.scale;

    this.x = e.clientX - (e.clientX - this.x) * k;
    this.y = e.clientY - (e.clientY - this.y) * k;

    this.scale = next;

    this.dispatchEvent({ type: 'transform', transform: this._transform });
  };

  public dispose() {
    this._abortController.abort();
  }
}
