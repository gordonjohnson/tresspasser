/**
 * Normalize is a modular arithmetic helper that wraps values back around to
 * zero after reaching 12, similar to a 12-hour clock.
 * It also converts any negative value to its congruent positive value.
 *
 * @example
 * normalize(0)  // returns 0
 * normalize(1)  // returns 1
 * normalize(11) // returns 11
 * normalize(12) // returns 0
 * normalize(13) // returns 1
 * normalize(-1) // returns 11
 * normalize(-2) // returns 10
 */
const normalize = (position: number) => {
  let normalizedPosition = position % 12;
  if (normalizedPosition < 0) {
    // negative positions should wrap back around
    normalizedPosition += 12;
  }
  return roundWithinTolerance(normalizedPosition);
};

const throttle = (callback: (event: any) => void, delay: number) => {
  let throttleTimeout: NodeJS.Timeout | null = null;
  let storedEvent: any = null;

  const throttledEventHandler = (event: any) => {
    storedEvent = event;

    const shouldHandleEvent = !throttleTimeout;

    if (shouldHandleEvent) {
      callback(storedEvent);

      storedEvent = null;

      throttleTimeout = setTimeout(() => {
        throttleTimeout = null;

        if (storedEvent) {
          throttledEventHandler(storedEvent);
        }
      }, delay);
    }
  };

  return throttledEventHandler;
};

const roundWithinTolerance = (num: number, acceptableTolerance = 0.22) => {
  var nearestRoundNumber = Math.round(num);
  var difference = Math.abs(nearestRoundNumber - num);
  if (difference <= acceptableTolerance + Number.EPSILON) {
    return nearestRoundNumber;
  }
  return num;
};

export { normalize, throttle, roundWithinTolerance };
