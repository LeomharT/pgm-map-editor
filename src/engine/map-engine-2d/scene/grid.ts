import { Colors } from '@/constants/colors';
import { mod } from '@/utils/math';
import type MapEngine2D from '..';

export default class MapEngine2DGrid {
  constructor(engine: MapEngine2D) {
    this._engine = engine;
  }

  private _engine: MapEngine2D;

  private get _ctx() {
    return this._engine.renderer.ctx;
  }

  private get _transform() {
    return this._engine.transform;
  }

  private _renderGrid = (step: number, color: string, dash?: [number, number]) => {
    this._ctx.save();

    this._ctx.strokeStyle = color;
    this._ctx.lineWidth = 1;
    if (dash) this._ctx.setLineDash(dash);

    this._ctx.setTransform(this._engine.size.pixelRatio, 0, 0, this._engine.size.pixelRatio, 0, 0);
    this._ctx.beginPath();
    if (dash) this._ctx.lineDashOffset = -this._transform.y % (dash[0] + dash[1]);
    for (let x = mod(this._transform.x, step); x < this._engine.size.width; x += step) {
      this._ctx.moveTo(x, 0);
      this._ctx.lineTo(x, this._engine.size.height);
    }
    this._ctx.stroke();

    this._ctx.beginPath();
    if (dash) this._ctx.lineDashOffset = -this._transform.x % (dash[0] + dash[1]);
    for (let y = mod(this._transform.y, step); y < this._engine.size.height; y += step) {
      this._ctx.moveTo(0, y);
      this._ctx.lineTo(this._engine.size.width, y);
    }
    this._ctx.stroke();

    this._ctx.restore();
  };

  public draw = () => {
    const MAJOR_CELL = 100 * this._transform.scale;
    const MINOR_CELL = MAJOR_CELL / 5;

    const MAJOR_CELL_COLOR = this._transform.scale > 0.5 ? Colors.NEUTRAL300 : Colors.NEUTRAL200;
    const MINOR_CELL_COLOR = this._transform.scale > 0.7 ? Colors.NEUTRAL300 : Colors.NEUTRAL200;

    if (this._transform.scale > 0.5) this._renderGrid(MINOR_CELL, MINOR_CELL_COLOR, [3, 3]);
    this._renderGrid(MAJOR_CELL, MAJOR_CELL_COLOR);
  };
}
