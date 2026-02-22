const hexToRgb = (hex: string) => {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
};

export const colorDistance = (a: string, b: string) => {
  const ra = hexToRgb(a);
  const rb = hexToRgb(b);
  return Math.sqrt((ra.r - rb.r) ** 2 + (ra.g - rb.g) ** 2 + (ra.b - rb.b) ** 2);
};

export const colorHarmonyScore = (base: string, candidate: string) => Math.max(0, Math.min(100, Math.round(100 - colorDistance(base, candidate) / 4.5)));

const paletteDefs = {
  Safe: ['#FFFFFF', '#F5F5F5', '#2C2C2C', '#D6C7AE', '#AAB7B8'],
  Balanced: ['#1E1E24', '#5C6B73', '#A6A57A', '#E3D5CA', '#E76F51', '#264653'],
  Bold: ['#FF0054', '#F4D35E', '#00A6ED', '#2E294E', '#06D6A0', '#000000'],
  Premium: ['#111827', '#B08D57', '#E5E7EB', '#6B7280', '#3F3F46', '#EAB308']
};

export function rankPalettes(baseHex: string) {
  return Object.entries(paletteDefs).map(([name, colors]) => {
    const score = Math.round(colors.reduce((sum, c) => sum + colorHarmonyScore(baseHex, c), 0) / colors.length);
    return {
      name,
      colors,
      score,
      explanation: `${name} palette tuned around ${baseHex.toUpperCase()} with ${score}/100 harmony.`
    };
  }).sort((a, b) => b.score - a.score);
}
