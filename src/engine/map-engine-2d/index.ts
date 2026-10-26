export default class MapEngine2D {
  constructor(container: HTMLDivElement) {
    this.canvas = this._initalCanvas();

    this.resizeObserver = new ResizeObserver(([entries]) =>
      this._resize(entries.contentRect),
    );
    this.resizeObserver.observe(container);

    container.append(this.canvas);
  }

  private canvas: HTMLCanvasElement;

  private _size = {
    width: 0,
    height: 0,
    dpr: Math.min(2, window.devicePixelRatio),
  };

  private resizeObserver: ResizeObserver;

  private _initalCanvas = () => {
    const canvas = document.createElement('canvas');
    return canvas;
  };

  private _resize = (rect: DOMRectReadOnly) => {
    this._size.width = rect.width;
    this._size.height = rect.height;

    this.canvas.width = this._size.width * this._size.dpr;
    this.canvas.height = this._size.height * this._size.dpr;

    this.canvas.style.width = this._size.width + 'px';
    this.canvas.style.height = this._size.height + 'px';
  };

  public dispose() {
    this.canvas.remove();

    this.resizeObserver.disconnect();
  }
}
