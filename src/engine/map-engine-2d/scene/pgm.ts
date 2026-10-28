import type MapEngine2D from '..';

export default class MapEngine2DPGM {
  constructor(engine: MapEngine2D) {
    this._engine = engine;
  }

  private _engine: MapEngine2D;
}
