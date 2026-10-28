import MapEngine2DRenderer from './renderer';
import MapEngine2DInteraction from './utils/interaction';
import { MapEngine2DSize } from './utils/size';
import MapEngine2DViewport from './viewport';

export default class MapEngine2D {
  constructor() {
    this.size = new MapEngine2DSize();
    this.size.addEventListener('resize', this._resize);

    this.viewport = new MapEngine2DViewport();

    this.renderer = new MapEngine2DRenderer(this);
    this.viewport.addEventListener('transform', this.renderer.requestRender);

    this.canvas = this.renderer.canvas;

    this.interaction = new MapEngine2DInteraction(this);
    this._resize();
  }

  public canvas: HTMLCanvasElement;

  public size: MapEngine2DSize;

  public viewport: MapEngine2DViewport;

  public renderer: MapEngine2DRenderer;

  public interaction: MapEngine2DInteraction;

  private _resize = () => {
    this.renderer.resize();
    this.renderer.requestRender();
  };

  public dispose() {
    this.renderer.dispose();

    this.size.dispose();
    this.size.removeEventListener('resize', this._resize);

    this.viewport.removeEventListener('transform', this.renderer.requestRender);

    this.interaction.dispose();
  }
}
