export default function UploadPage() {
  return (
    <main className="card">
      <h2>Upload item</h2>
      <p className="small">Privacy: image is stored privately and auto-deleted if not saved.</p>
      <div className="grid">
        <input type="file" accept="image/*" />
        <div className="grid grid-2">
          <div><label>Category (fallback)</label><select><option>top</option><option>bottom</option><option>shoes</option></select></div>
          <div><label>Dominant color</label><input type="color" defaultValue="#111827" /></div>
        </div>
        <button className="btn btn-primary">Analyze and match</button>
      </div>
    </main>
  );
}
