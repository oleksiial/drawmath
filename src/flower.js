const next = (seeds, denom) => {
  const range = seeds.length;
  let angle = 0;
  for (let i = 0; i < seeds.length; i++) {
    angle -= 2 * Math.PI * denom;
  }
  const nx = range * Math.cos(angle);
  const ny = range * Math.sin(angle);
  return [...seeds, {x: nx, y: ny}];
};

export const fill = (denom, n) => {
  let seeds = [];
  for (let i = 0; i < n; i++) {
    seeds = next(seeds, denom);
  }
  return seeds;
};
