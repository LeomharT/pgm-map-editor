import MapEngine2DRenderer from './renderer';
import { MapEngine2DSize } from './utils/size';
import MapEngine2DTransform from './utils/transform';

export default class MapEngine2D {
  constructor() {
    this.size = new MapEngine2DSize();
    this.size.addEventListener('resize', this._resize);

    this.transform = new MapEngine2DTransform();

    this.renderer = new MapEngine2DRenderer(this);

    this.canvas = this.renderer.canvas;

    this._resize();
  }

  public canvas: HTMLCanvasElement;

  public size: MapEngine2DSize;

  public transform: MapEngine2DTransform;

  public renderer: MapEngine2DRenderer;

  private _resize = () => {
    this.renderer.resize();
    this.renderer.requestRender();
  };

  public dispose() {
    this.canvas.remove();
    this.size.dispose();
  }
}
