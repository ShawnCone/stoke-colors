import "../app/globals.css";

const COLORS = ["#BCE5E8", "#3C4248", "#FBD5D7", "009DB5"];

function App() {
  return (
    <main>
      <h1>Which color is the sickest 🤘🤘🤘?</h1>
      <div className="colors">
        {COLORS.map((color, index) => (
          <div key={index} className="color">
            {color}
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
