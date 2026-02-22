import Link from 'next/link';

const trending = [
  { name: 'Minimal Office', score: 91 },
  { name: 'Street Night', score: 88 },
  { name: 'Athleisure Travel', score: 86 }
];

export default function HomePage() {
  return (
    <main>
      <section className="card">
        <h1>FitMatch AI</h1>
        <p>Get complete outfits + color palettes instantly.</p>
        <div className="grid">
          <Link className="btn btn-primary" href="/upload">Complete my outfit</Link>
          <Link className="btn btn-secondary" href="/color">Color match</Link>
        </div>
      </section>
      <section className="card">
        <h3>Trending outfit cards</h3>
        {trending.map((t) => <div key={t.name} className="badge">{t.name} · {t.score}</div>)}
      </section>
    </main>
  );
}
