export default function SharePage({ params }: { params: { shareId: string } }) {
  return (
    <main className="card" style={{ textAlign: 'center' }}>
      <h2>Outfit Score Card</h2>
      <p>Share ID: {params.shareId}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }}>
        <div className="card">Before item</div>
        <div className="card">After outfit</div>
      </div>
    </main>
  );
}
