import type Konva from 'konva';
import type MapEngine2DViewport from '../viewport';

export default class MapEngine2DInteraction {
  constructor(stage: Konva.Stage, viewport: MapEngine2DViewport) {
    this._stage = stage;
    this._viewport = viewport;

    stage.on('pointerdown', this._handleOnPointerDown);
    stage.on('pointerup', this._handleOnPointerUp);
    stage.on('pointermove', this._handleOnPointerMove);
    stage.on('wheel', this._handleOnWheel);
  }

  private _stage: Konva.Stage;

  private _viewport: MapEngine2DViewport;

  private _prev = { x: 0, y: 0 };

  private _handleOnPointerDown = (e: Konva.KonvaEventObject<PointerEvent>) => {
    this._stage.setPointerCapture(e.pointerId);

    this._prev.x = e.evt.clientX;
    this._prev.y = e.evt.clientY;
  };

  private _handleOnPointerUp = (e: Konva.KonvaEventObject<PointerEvent>) => {
    if (this._stage.hasPointerCapture(e.pointerId)) {
      this._stage.releaseCapture(e.pointerId);
    }
  };

  private _handleOnPointerMove = (e: Konva.KonvaEventObject<PointerEvent>) => {
    if (!this._stage.hasPointerCapture(e.pointerId)) return;

    if ((e.evt.buttons & 1) === 0) {
      this._stage.releaseCapture(e.pointerId);
      return;
    }

    const tx = e.evt.clientX - this._prev.x;
    const ty = e.evt.clientY - this._prev.y;

    this._viewport.setTransform((prev) => ({
      ...prev,
      x: prev.x + tx,
      y: prev.y + ty,
    }));

    this._prev.x = e.evt.clientX;
    this._prev.y = e.evt.clientY;
  };

  private _handleOnWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    const position = this._stage.getPointerPosition();
    if (!position) return;

    e.evt.preventDefault();

    this._viewport.zoomAt(position.x, position.y, -e.evt.deltaY * 0.001);
  };

  public dispose = () => {
    this._stage.off('pointerdown', this._handleOnPointerDown);
    this._stage.off('pointerup', this._handleOnPointerUp);
    this._stage.off('pointermove', this._handleOnPointerMove);
    this._stage.off('wheel', this._handleOnWheel);
  };
}
