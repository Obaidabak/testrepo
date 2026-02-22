import { colorHarmonyScore } from './color';
import type { ItemAnalysis, OutfitCard, StyleTag } from './types';

const templates = [
  { key: 'street_core', style: ['streetwear', 'casual'], items: ['bottom', 'shoes', 'outerwear'] },
  { key: 'minimal_clean', style: ['minimal', 'formal'], items: ['bottom', 'shoes', 'accessory'] },
  { key: 'active_blend', style: ['athleisure', 'casual'], items: ['bottom', 'shoes', 'accessory'] },
  { key: 'modest_layered', style: ['modest', 'minimal'], items: ['bottom', 'outerwear', 'accessory'] }
] as const;

const colorBank = ['#111827', '#FFFFFF', '#D1D5DB', '#C8A97E', '#3B82F6', '#10B981', '#E5E7EB'];

export function buildOutfits(analysis: ItemAnalysis, userStyles: StyleTag[]): OutfitCard[] {
  return templates.map((t, idx) => {
    const styleOverlap = t.style.filter((s) => userStyles.includes(s as StyleTag) || analysis.styleTags.includes(s as StyleTag)).length;
    const styleMatchScore = Math.min(100, 45 + styleOverlap * 20);
    const picks = t.items.map((category, i) => ({
      category: category as OutfitCard['recommended'][number]['category'],
      name: `${category} option ${idx + 1}.${i + 1}`,
      colorHex: colorBank[(idx + i) % colorBank.length]
    }));
    const colorScore = Math.round(picks.reduce((sum, p) => sum + colorHarmonyScore(analysis.dominantHex, p.colorHex), 0) / picks.length);
    const total = Math.round(colorScore * 0.55 + styleMatchScore * 0.45);
    return {
      templateKey: t.key,
      recommended: picks,
      colorHarmonyScore: colorScore,
      styleMatchScore,
      totalScore: total
    };
  }).sort((a, b) => b.totalScore - a.totalScore);
}
