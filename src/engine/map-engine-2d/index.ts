import { Colors } from '@/constants/colors';

export default class MapEngine2D {
  constructor(container: HTMLDivElement) {
    this._canvas = this._initalCanvas();

    this._resizeObserver = new ResizeObserver(([entries]) =>
      this._resize(entries.contentRect),
    );
    this._resizeObserver.observe(container);

    container.append(this._canvas);
  }

  private _canvas: HTMLCanvasElement;

  private get ctx() {
    return this._canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  private _size = {
    width: 0,
    height: 0,
    dpr: Math.min(2, window.devicePixelRatio),
  };

  private _resizeObserver: ResizeObserver;

  private _renderPending: boolean = false;

  private _transform = {
    x: 0,
    y: 0,
    scale: 1,
  };

  private _initalCanvas = () => {
    const canvas = document.createElement('canvas');
    return canvas;
  };

  private _resize = (rect: DOMRectReadOnly) => {
    this._size.width = rect.width;
    this._size.height = rect.height;
    this._size.dpr = Math.min(2, window.devicePixelRatio);

    this._canvas.width = this._size.width * this._size.dpr;
    this._canvas.height = this._size.height * this._size.dpr;

    this._canvas.style.width = this._size.width + 'px';
    this._canvas.style.height = this._size.height + 'px';

    this._render();
  };

  private clean() {
    this.ctx.save();

    this.ctx.resetTransform();

    this.ctx.fillStyle = Colors.NEUTRAL100;
    this.ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);

    this.ctx.restore();
  }

  private _render = () => {
    this.clean();
  };

  public requestRender = () => {
    if (this._renderPending) return;

    this._renderPending = true;
    requestAnimationFrame(() => {
      this._renderPending = false;
      this._render();
    });
  };

  public dispose() {
    this._canvas.remove();
    this._resizeObserver.disconnect();
  }
}
