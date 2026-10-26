/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */

/**
 * This modules allows to dispatch event objects on custom JavaScript objects.
 *
 * Main repository: [eventdispatcher.js](https://github.com/mrdoob/eventdispatcher.js/)
 *
 * Code Example:
 * ```js
 * class Car extends EventDispatcher {
 * 	start() {
 *		this.dispatchEvent( { type: 'start', message: 'vroom vroom!' } );
 *	}
 *};
 *
 * // Using events with the custom object
 * const car = new Car();
 * car.addEventListener( 'start', function ( event ) {
 * 	alert( event.message );
 * } );
 *
 * car.start();
 * ```
 */

/**
 * The minimal basic Event that can be dispatched by a {@link EventDispatcher<>}.
 */
export interface BaseEvent<TEventType extends string = string> {
  readonly type: TEventType;
}

/**
 * The minimal expected contract of a fired Event that was dispatched by a {@link EventDispatcher<>}.
 */
export interface Event<TEventType extends string = string, TTarget = unknown> {
  readonly type: TEventType;
  readonly target: TTarget;
}

export type EventListener<TEventData, TEventType extends string, TTarget> = (
  event: TEventData & Event<TEventType, TTarget>,
) => void;

class EventDispatcher<TEventMap extends {} = {}> {
  /**
   * Creates {@link THREE.EventDispatcher | EventDispatcher} object.
   */
  constructor() {}

  private _listeners: Record<string, Function[]> | undefined;

  /**
   * Adds the given event listener to the given event type.
   *
   * @param {string} type - The type of event to listen to.
   * @param {Function} listener - The function that gets called when the event is fired.
   */
  addEventListener<T extends Extract<keyof TEventMap, string>>(
    type: T,
    listener: EventListener<TEventMap[T], T, this>,
  ) {
    if (this._listeners === undefined) this._listeners = {};

    const listeners = this._listeners;

    if (listeners[type] === undefined) {
      listeners[type] = [];
    }

    if (listeners[type].indexOf(listener) === -1) {
      listeners[type].push(listener);
    }
  }

  /**
   * Returns `true` if the given event listener has been added to the given event type.
   *
   * @param {string} type - The type of event.
   * @param {Function} listener - The listener to check.
   * @return {boolean} Whether the given event listener has been added to the given event type.
   */
  hasEventListener<T extends Extract<keyof TEventMap, string>>(
    type: T,
    listener: EventListener<TEventMap[T], T, this>,
  ) {
    const listeners = this._listeners;

    if (listeners === undefined) return false;

    return listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1;
  }

  /**
   * Removes the given event listener from the given event type.
   *
   * @param {string} type - The type of event.
   * @param {Function} listener - The listener to remove.
   */
  removeEventListener<T extends Extract<keyof TEventMap, string>>(
    type: T,
    listener: EventListener<TEventMap[T], T, this>,
  ) {
    const listeners = this._listeners;

    if (listeners === undefined) return;

    const listenerArray = listeners[type];

    if (listenerArray !== undefined) {
      const index = listenerArray.indexOf(listener);

      if (index !== -1) {
        listenerArray.splice(index, 1);
      }
    }
  }

  /**
   * Dispatches an event object.
   *
   * @param {Object} event - The event that gets fired.
   */
  dispatchEvent<T extends Extract<keyof TEventMap, string>>(
    event: BaseEvent<T> & TEventMap[T],
  ): void {
    const listeners = this._listeners;

    if (listeners === undefined) return;

    const listenerArray = listeners[event.type];

    if (listenerArray !== undefined) {
      // @ts-expect-error err
      event.target = this;

      // Make a copy, in case listeners are removed while iterating.
      const array = listenerArray.slice(0);

      for (let i = 0, l = array.length; i < l; i++) {
        array[i].call(this, event);
      }

      // @ts-expect-error err
      event.target = null;
    }
  }
}

export { EventDispatcher };
