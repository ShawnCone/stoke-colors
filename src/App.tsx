import "../app/globals.css";

const COLORS = ["#BCE5E8", "#3C4248", "#FBD5D7", "009DB5"];

const DB_URL = import.meta.env.VITE_DB_URL as string;
const DB_TOKEN = import.meta.env.VITE_DB_TOKEN as string;

console.log({ DB_URL, DB_TOKEN });

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
