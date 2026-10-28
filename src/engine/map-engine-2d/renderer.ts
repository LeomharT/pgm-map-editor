import { Colors } from '@/constants/colors';
import type MapEngine2D from '.';

export default class MapEngine2DRenderer {
  constructor(engine: MapEngine2D) {
    this.canvas = document.createElement('canvas');

    this._engine = engine;
  }
  private _engine: MapEngine2D;

  private _frameId: number | null = null;

  public canvas: HTMLCanvasElement;

  public get ctx() {
    return this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  public _clean = () => {
    this.ctx.save();

    this.ctx.fillStyle = Colors.NEUTRAL50;
    this.ctx.resetTransform();
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.restore();
  };

  private _render = () => {
    this._clean();
  };

  public requestRender = () => {
    if (this._frameId) return;

    this._frameId = requestAnimationFrame(() => {
      this._frameId = null;
      this._render();
    });
  };

  public resize = () => {
    this.canvas.width = this._engine.size.width * this._engine.size.pixelRatio;
    this.canvas.height = this._engine.size.height * this._engine.size.pixelRatio;

    this.canvas.style.width = this._engine.size.width + 'px';
    this.canvas.style.height = this._engine.size.height + 'px';
  };

  public dispose() {
    this.canvas.remove();

    if (this._frameId !== null) {
      cancelAnimationFrame(this._frameId);
      this._frameId = null;
    }
  }
}
