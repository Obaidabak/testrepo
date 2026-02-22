import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FitMatch AI',
    short_name: 'FitMatch',
    description: 'Outfit and color matching assistant',
    start_url: '/',
    display: 'standalone',
    background_color: '#f6f7fb',
    theme_color: '#1f5eff',
    icons: []
  };
}
