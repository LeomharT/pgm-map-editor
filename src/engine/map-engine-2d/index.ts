import Konva from 'konva';
import MapEngine2DInteraction from './utils/interaction';
import { MapEngine2DSize } from './utils/size';
import MapEngine2DViewport, { type ViewPortTransform } from './viewport';

type MapEngine2DConfig = {
  container?: string | HTMLDivElement | undefined;
};

export default class MapEngine2D {
  constructor(options: MapEngine2DConfig) {
    this.viewport = new MapEngine2DViewport();
    this.viewport.addEventListener('transform', this._updateStageTransform);

    this.size = new MapEngine2DSize();
    this.size.addEventListener('resize', this._resize);

    this.stage = new Konva.Stage({
      container: options.container,
      // Use viewport transform source
      draggable: false,
      width: this.size.width,
      height: this.size.height,
    });

    this._interaction = new MapEngine2DInteraction(this.stage, this.viewport);

    this._resize();
  }

  private stage: Konva.Stage;

  private _interaction: MapEngine2DInteraction;

  public viewport: MapEngine2DViewport;

  public addLayer(layer: Konva.Layer) {
    this.stage.add(layer);
  }

  public size: MapEngine2DSize;

  private _resize = () => {
    this.stage.size({
      ...this.size,
    });
  };

  private _updateStageTransform = ({ transform }: { transform: ViewPortTransform }) => {
    this.stage.setPosition({
      x: transform.x,
      y: transform.y,
    });

    this.stage.scaleX(transform.scale);
    this.stage.scaleY(transform.scale);
  };

  public dispose() {
    this.viewport.removeEventListener('transform', this._updateStageTransform);

    this.size.dispose();
    this.size.removeEventListener('resize', this._resize);

    this._interaction.dispose();

    this.stage.destroy();
  }
}
