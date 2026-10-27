import { Colors } from '@/constants/colors';
import type MapEngine2D from '..';

export default class MapEngine2DGrid {
  constructor(engine: MapEngine2D) {
    this._engine = engine;
  }

  private _engine: MapEngine2D;

  private get _ctx() {
    return this._engine.renderer.ctx;
  }

  private _renderGrid = (step: number) => {
    this._ctx.save();

    this._ctx.strokeStyle = Colors.NEUTRAL300;
    this._ctx.lineWidth = 1;

    this._ctx.setTransform(this._engine.size.pixelRatio, 0, 0, this._engine.size.pixelRatio, 0, 0);
    this._ctx.beginPath();
    for (let x = 0; x < this._engine.size.width; x += step) {
      this._ctx.moveTo(x, 0);
      this._ctx.lineTo(x, this._engine.size.height);
    }
    this._ctx.stroke();

    this._ctx.beginPath();
    for (let y = 0; y < this._engine.size.height; y += step) {
      this._ctx.moveTo(0, y);
      this._ctx.lineTo(this._engine.size.width, y);
    }
    this._ctx.stroke();

    this._ctx.restore();
  };

  public draw = () => {
    const MAJOR_CELL = 100;

    this._renderGrid(MAJOR_CELL);
  };
}
