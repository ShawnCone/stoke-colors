import "./globals.css";

import { createClient } from "@libsql/client";
import { useToast } from "./components/ui/use-toast";

const COLORS = ["#BCE5E8", "#3C4248", "#FBD5D7", "#009DB5"] as const;

const DB_URL = import.meta.env.VITE_DB_URL as string;
const DB_TOKEN = import.meta.env.VITE_DB_TOKEN as string;

const client = createClient({
  url: DB_URL,
  authToken: DB_TOKEN,
});

const getTextColor = (color: string) => {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 125 ? "black" : "white";
};

function App() {
  const { toast } = useToast();

  async function voteColor(color: string) {
    await client.execute(`INSERT INTO votes
      (color)
      VALUES ('${color}')`);

    const resp = await client.execute(
      `SELECT COUNT(*) FROM votes WHERE color = '${color}'`
    );

    toast({
      title: "Vote submitted",
      description: `Thanks for voting for color ${color}! Now has ${resp.rows[0][0]} votes`,
    });
  }

  return (
    <main className="text-center text-4xl py-10 flex min-h-screen flex-col gap-10 justify-center items-center">
      <h1 className="">Which color is the sickest 🎨🤘🤘?</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 w-full">
        {COLORS.map((color, index) => (
          <button
            onClick={() => voteColor(color)}
            key={index}
            className="col-span-1 min-h-96 text-center text-lg"
            style={{
              backgroundColor: color,
              color: getTextColor(color),
            }}
          >
            I'm the sickest color
          </button>
        ))}
      </div>
    </main>
  );
}

export default App;
