import Link from 'next/link';

export default function ResultsPage({ params }: { params: { outfitId: string } }) {
  return (
    <main className="card">
      <h2>Outfit results #{params.outfitId}</h2>
      <p>Color Harmony: 89 · Style Match: 84 · Total: 87</p>
      <div className="grid">
        <button className="btn btn-secondary">Save</button>
        <Link className="btn btn-secondary" href={`/share/${params.outfitId}`}>Share</Link>
        <button className="btn btn-primary">Shop Similar</button>
      </div>
    </main>
  );
}
