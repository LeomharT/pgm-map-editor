export const mod = (n: number, m: number) => ((n % m) + m) % m;
export const clamp = (value: number, min: number, max: number) => {
  return Math.min(max, Math.max(value, min));
};
