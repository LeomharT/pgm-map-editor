import { Colors } from '@/constants/colors';
import Konva from 'konva';

export class GridLayer extends Konva.Layer {
  constructor(config?: Konva.LabelConfig) {
    super(config);

    this.add(
      new Konva.Rect({
        width: 200,
        height: 200,
        fill: Colors.PURPLE300,
      }),
    );
  }
}
