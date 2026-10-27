import { EventDispatcher } from '@/lib/eventDispatcher';

export class MapEngine2DSize extends EventDispatcher<{ resize: object }> {
  constructor() {
    super();

    this._updateSizes();

    window.addEventListener('resize', this._updateSizes);
  }

  public width: number = 0;

  public height: number = 0;

  public pixelRatio: number = 0;

  private _updateSizes = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    this.dispatchEvent({ type: 'resize' });
  };

  public dispose = () => {
    window.removeEventListener('resize', this._updateSizes);
  };
}
