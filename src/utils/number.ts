type MapArgs = [current: number, in_min: number, in_max: number, out_min: number, out_max: number];

export const clamp = (input: number, min: number, max: number): number => {
  return input < min ? min : input > max ? max : input;
};

export const map = (
  current: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number
): number => {
  const mapped: number = ((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  return clamp(mapped, out_min, out_max);
};

export const mapFloor = (...args: MapArgs) => Math.floor(map(...args));
