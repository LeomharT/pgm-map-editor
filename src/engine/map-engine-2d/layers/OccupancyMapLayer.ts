import Konva from 'konva';

type OccupancyMapLayerConfig = Konva.LayerConfig;

export default class OccupancyMapLayer extends Konva.Layer {
  constructor(config?: OccupancyMapLayerConfig) {
    super(config);
  }
}
