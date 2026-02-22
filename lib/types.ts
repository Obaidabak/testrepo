export type Category = 'top' | 'bottom' | 'shoes' | 'outerwear' | 'accessory';
export type Pattern = 'solid' | 'graphic' | 'stripe' | 'check' | 'other';
export type StyleTag = 'streetwear' | 'minimal' | 'formal' | 'casual' | 'athleisure' | 'modest';

export interface ItemAnalysis {
  category: Category;
  dominantHex: string;
  secondaryHex?: string;
  pattern: Pattern;
  styleTags: StyleTag[];
}

export interface OutfitCard {
  templateKey: string;
  recommended: { category: Category; name: string; colorHex: string }[];
  colorHarmonyScore: number;
  styleMatchScore: number;
  totalScore: number;
}
