function hexToRgb(hex) { const clean = hex.replace('#', ''); const num = parseInt(clean, 16); return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }; }
function colorDistance(a, b) { const ra = hexToRgb(a); const rb = hexToRgb(b); return Math.sqrt((ra.r-rb.r)**2 + (ra.g-rb.g)**2 + (ra.b-rb.b)**2); }
function colorHarmonyScore(base, candidate) { return Math.max(0, Math.min(100, Math.round(100 - colorDistance(base, candidate) / 4.5))); }
function rankPalettes(baseHex) {
  const defs = { Safe:['#FFFFFF','#F5F5F5','#2C2C2C','#D6C7AE','#AAB7B8'], Balanced:['#1E1E24','#5C6B73','#A6A57A','#E3D5CA','#E76F51','#264653'], Bold:['#FF0054','#F4D35E','#00A6ED','#2E294E','#06D6A0','#000000'], Premium:['#111827','#B08D57','#E5E7EB','#6B7280','#3F3F46','#EAB308'] };
  return Object.entries(defs).map(([name,colors])=>({name,colors,score:Math.round(colors.reduce((s,c)=>s+colorHarmonyScore(baseHex,c),0)/colors.length)})).sort((a,b)=>b.score-a.score);
}
function buildOutfits(analysis, userStyles) {
  const templates=[['streetwear','casual'],['minimal','formal'],['athleisure','casual'],['modest','minimal']];
  return templates.map((style,idx)=>{ const overlap=style.filter((s)=>userStyles.includes(s)||analysis.styleTags.includes(s)).length; const styleMatch=Math.min(100,45+overlap*20); const colorScore=Math.round((colorHarmonyScore(analysis.dominantHex,'#111827')+colorHarmonyScore(analysis.dominantHex,'#E5E7EB'))/2); return {totalScore:Math.round(colorScore*0.55+styleMatch*0.45)}; });
}
module.exports={colorHarmonyScore,rankPalettes,buildOutfits};
