import { Colors } from '@/constants/colors';
import Konva from 'konva';

/** Non-interactive background grid that does not contribute to content bounds. */
export class GridLayer extends Konva.Layer {
  MAJOR_CELL_STEP: number = 100;
  MINOR_CELL_STEP: number = this.MAJOR_CELL_STEP / 5;

  constructor(config?: Konva.LayerConfig) {
    super({ ...config, listening: false });

    this.add(
      new Konva.Shape({
        listening: false,
        sceneFunc: (ctx) => {
          const isDark = this._theme === 'dark';
          const scale = this.getStage().scaleX();

          let MAJOR_CELL_COLOR: string = scale > 0.5 ? Colors.NEUTRAL200 : Colors.NEUTRAL100;
          let MINOR_CELL_COLOR: string = scale > 0.7 ? Colors.NEUTRAL200 : Colors.NEUTRAL100;

          if (isDark) {
            MAJOR_CELL_COLOR = scale > 0.5 ? Colors.SLATE800 : Colors.SLATE900;
            MINOR_CELL_COLOR = scale > 0.7 ? Colors.SLATE800 : Colors.SLATE900;
          }

          // Render minor lines
          if (scale > 0.5) this._renderGrid(ctx, this.MINOR_CELL_STEP, MINOR_CELL_COLOR, [3, 3]);
          this._renderGrid(ctx, this.MAJOR_CELL_STEP, MAJOR_CELL_COLOR);
        },
      }),
    );

    this.add(
      new Konva.Rect({
        width: 200,
        height: 200,
        fill: Colors.ROSE400,
      }),
    );
  }

  private _theme: 'light' | 'dark' | 'system' = 'system';

  public setTheme(theme: 'light' | 'dark' | 'system') {
    if (this._theme === theme) return;

    this._theme = theme;
    this.batchDraw();
  }

  private _renderGrid(ctx: Konva.Context, step: number, color: string, dash?: [number, number]) {
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
    if (dash) ctx.setLineDash([dash[0] / scale, dash[1] / scale]);

    ctx.beginPath();
    if (dash) ctx.lineDashOffset = top - (dash[0] / scale + dash[1] / scale);
    for (let x = Math.floor(left / step) * step; x < right; x += step) {
      ctx.moveTo(x, top);
      ctx.lineTo(x, bottom);
    }
    ctx.stroke();

    ctx.beginPath();
    if (dash) ctx.lineDashOffset = left - (dash[0] / scale + dash[1] / scale);
    for (let y = Math.floor(top / step) * step; y < bottom; y += step) {
      ctx.moveTo(left, y);
      ctx.lineTo(right, y);
    }
    ctx.stroke();

    ctx.restore();
  }
}
