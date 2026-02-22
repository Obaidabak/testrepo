export default function ColorPage() {
  return (
    <main className="card">
      <h2>Color matching engine</h2>
      <div className="grid">
        <div><label>Pick color</label><input type="color" defaultValue="#3b82f6" /></div>
        <button className="btn btn-primary">Rank palettes</button>
      </div>
    </main>
  );
}
