import type MapEngine2D from '..';

export default class MapEngine2DInteraction {
  constructor(engine: MapEngine2D) {
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

    const tx = e.clientX - this._prev.x;
    const ty = e.clientY - this._prev.y;

    this._engine.viewport.setTransform((prev) => ({
      ...prev,
      x: prev.x + tx,
      y: prev.y + ty,
    }));

    this._prev.x = e.clientX;
    this._prev.y = e.clientY;
  };

  private _handleOnWheel = (e: WheelEvent) => {
    e.preventDefault();

    this._engine.viewport.zoomAt(e.offsetX, e.offsetY, -e.deltaY * 0.001);
  };

  public dispose = () => {
    this._abortController.abort();
  };
}
