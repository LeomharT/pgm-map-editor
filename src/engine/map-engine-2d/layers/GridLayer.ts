import { Colors } from '@/constants/colors';
import Konva from 'konva';

export class GridLayer extends Konva.Layer {
  MAJOR_CELL_STEP: number = 100;
  MINOR_CELL_STEP: number = this.MAJOR_CELL_STEP / 5;

  constructor(config?: Konva.LayerConfig) {
    super({ ...config, listening: false });

    this.add(
      new Konva.Rect({
        width: 200,
        height: 200,
        fill: Colors.ROSE400,
      }),
    );

    this.add(
      new Konva.Shape({
        listening: false,
        sceneFunc: (ctx) => {
          const MAJOR_CELL_COLOR = Colors.NEUTRAL300;

          this._renderGrid(ctx, this.MAJOR_CELL_STEP, MAJOR_CELL_COLOR);
        },
      }),
    );
  }

  private _renderGrid(ctx: Konva.Context, step: number, color: string) {
    const stage = this.getStage();
    if (!stage) return;

    const scale = stage.scaleX();
    const { width, height } = stage.size();

    const top = -stage.y() / scale;
    const left = -stage.x() / scale;

    const bottom = top + height / scale;
    const right = left + width / scale;

    ctx.save();

    ctx.lineWidth = 1 / scale;
    ctx.strokeStyle = color;

    ctx.beginPath();
    for (let x = Math.floor(left / step) * step; x < right; x += step) {
      ctx.moveTo(x, top);
      ctx.lineTo(x, bottom);
    }
    ctx.stroke();

    ctx.beginPath();
    for (let y = Math.floor(top / step) * step; y < bottom; y += step) {
      ctx.moveTo(left, y);
      ctx.lineTo(right, y);
    }
    ctx.stroke();

    ctx.restore();
  }
}
