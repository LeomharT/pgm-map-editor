import type Konva from 'konva';
import type MapEngine2D from '..';

export default class MapEngine2DInteraction {
  constructor(engine: MapEngine2D) {
    this._engine = engine;

    const stage = this._engine.stage;

    stage.on('pointerdown', this._handleOnPointerDown);
    stage.on('pointerup', this._handleOnPointerUp);
    stage.on('pointermove', this._handleOnPointerMove);
    stage.on('wheel', this._handleOnWheel);
  }

  private _engine: MapEngine2D;

  private _prev = { x: 0, y: 0 };

  private _handleOnPointerDown = (e: Konva.KonvaEventObject<PointerEvent>) => {
    console.log(e);
    this._engine.stage.setPointerCapture(e.pointerId);

    this._prev.x = e.evt.clientX;
    this._prev.y = e.evt.clientY;
  };

  private _handleOnPointerUp = (e: Konva.KonvaEventObject<PointerEvent>) => {
    if (this._engine.stage.hasPointerCapture(e.pointerId)) {
      this._engine.stage.releaseCapture(e.pointerId);
    }
  };

  private _handleOnPointerMove = (e: Konva.KonvaEventObject<PointerEvent>) => {
    if (!this._engine.stage.hasPointerCapture(e.pointerId)) return;

    const tx = e.evt.clientX - this._prev.x;
    const ty = e.evt.clientY - this._prev.y;

    this._engine.viewport.setTransform((prev) => ({
      ...prev,
      x: prev.x + tx,
      y: prev.y + ty,
    }));

    this._prev.x = e.evt.clientX;
    this._prev.y = e.evt.clientY;
  };

  private _handleOnWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    const position = this._engine.stage.getPointerPosition();
    if (!position) return;

    e.evt.preventDefault();

    this._engine.viewport.zoomAt(position.x, position.y, -e.evt.deltaY * 0.001);
  };

  public dispose = () => {
    this._engine.stage.off('pointerdown', this._handleOnPointerDown);
    this._engine.stage.off('pointerup', this._handleOnPointerUp);
    this._engine.stage.off('pointermove', this._handleOnPointerMove);
    this._engine.stage.off('wheel', this._handleOnWheel);
  };
}
