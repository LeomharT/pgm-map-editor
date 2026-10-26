import { Colors } from '@/constants/colors';

const MAJOR_CELL_STEP = 100;

const mod = (n: number, m: number) => ((n % m) + m) % m;

export default class MapEngine2D {
  constructor(container: HTMLDivElement) {
    this._canvas = this._initalCanvas();
    container.append(this._canvas);

    this._resizeObserver = new ResizeObserver(([entries]) => this._resize(entries.contentRect));
    this._resizeObserver.observe(container);

    this._abortController = new AbortController();
    const { signal } = this._abortController;
    this._canvas.addEventListener('pointerdown', this._handleOnPointerDown, { signal });
    this._canvas.addEventListener('pointerup', this._handleOnPointerUp, { signal });
    this._canvas.addEventListener('pointermove', this._handleOnPointerMove, { signal });
  }

  private _canvas: HTMLCanvasElement;

  private _abortController: AbortController;

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

  private _prev = {
    x: 0,
    y: 0,
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

  private _handleOnPointerDown = (e: PointerEvent) => {
    this._canvas.setPointerCapture(e.pointerId);

    this._prev.x = e.offsetX;
    this._prev.y = e.offsetY;
  };

  private _handleOnPointerUp = (e: PointerEvent) => {
    if (this._canvas.hasPointerCapture(e.pointerId)) {
      this._canvas.releasePointerCapture(e.pointerId);
    }
  };

  private _handleOnPointerMove = (e: PointerEvent) => {
    if (!this._canvas.hasPointerCapture(e.pointerId)) return;

    this._transform.x += e.offsetX - this._prev.x;
    this._transform.y += e.offsetY - this._prev.y;

    this._prev.x = e.offsetX;
    this._prev.y = e.offsetY;

    this.requestRender();
  };

  private clean = () => {
    this.ctx.save();

    this.ctx.resetTransform();

    this.ctx.fillStyle = Colors.NEUTRAL50;
    this.ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);

    this.ctx.restore();
  };

  private _renderGrid = (step: number) => {
    this.ctx.save();

    this.ctx.setTransform(this._size.dpr, 0, 0, this._size.dpr, 0, 0);
    this.ctx.strokeStyle = Colors.NEUTRAL300;

    this.ctx.beginPath();
    for (let x = mod(this._transform.x, step); x < this._size.width; x += step) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this._size.height);
    }
    this.ctx.stroke();

    this.ctx.beginPath();
    for (let y = mod(this._transform.y, step); y < this._size.width; y += step) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this._size.width, y);
    }
    this.ctx.stroke();

    this.ctx.restore();
  };

  private _render = () => {
    this.clean();

    this._renderGrid(MAJOR_CELL_STEP);
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
    this._abortController.abort();
  }
}
