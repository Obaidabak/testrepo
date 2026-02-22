export default function OnboardingPage() {
  return (
    <main className="card">
      <h2>Quick onboarding (&lt;30s)</h2>
      <div className="grid">
        <div><label>Gender</label><select><option>men</option><option>women</option><option>unisex</option></select></div>
        <div><label>Modest mode</label><select><option>true</option><option>false</option></select></div>
        <div><label>Style tags (up to 3)</label><input placeholder="streetwear,minimal,casual" /></div>
        <div className="grid grid-2"><div><label>Top size</label><input /></div><div><label>Bottom size</label><input /></div></div>
        <div><label>Shoe size</label><input /></div>
        <div><label>Budget range</label><input type="range" min="1" max="4" defaultValue="2" /></div>
        <div><label>Region</label><input defaultValue="Saudi Arabia" /></div>
      </div>
    </main>
  );
}
