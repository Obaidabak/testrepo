export interface ProductItem { id: string; name: string; category: string; style_tag: string; price_band: string; affiliate_url: string; }

export interface ProductSource {
  search(input: { category: string; styleTags: string[]; budget: string; region: string }): Promise<ProductItem[]>;
}

export class CuratedCatalogSource implements ProductSource {
  constructor(private rows: ProductItem[]) {}
  async search(input: { category: string; styleTags: string[]; budget: string }) {
    return this.rows.filter((r) => r.category === input.category && input.styleTags.includes(r.style_tag) && r.price_band === input.budget).slice(0, 8);
  }
}

export class ExternalApiSource implements ProductSource {
  async search() {
    return [];
  }
}
