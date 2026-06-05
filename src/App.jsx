import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("hi");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const translateText = async () => {
    if (!text.trim()) {
      alert("Please enter text");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://google-translator9.p.rapidapi.com/v2",
        {
          q: text,
          source: "en",
          target: language,
          format: "text",
        },
        {
          headers: {
  "Content-Type": "application/json",
  "x-rapidapi-key": "55ef9e71a9msh7b0a18d6416925bp14c010jsn12a6f66681d0",
  "x-rapidapi-host": "google-translator9.p.rapidapi.com",
},
        }
      );

      setTranslatedText(
        response.data.data.translations[0].translatedText
      );
    } catch (error) {
      console.error(error);
      alert("Translation failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl">

        <h1 className="text-4xl font-bold text-center mb-6">
          Text Translator
        </h1>

        <textarea
          rows="5"
          placeholder="Enter English text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border p-4 rounded-lg"
        />

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full mt-4 border p-3 rounded-lg"
        >
          <option value="hi">Hindi</option>
          <option value="mr">Marathi</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="de">German</option>
        </select>

        <button
          onClick={translateText}
          className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg"
        >
          {loading ? "Translating..." : "Translate"}
        </button>

        {translatedText && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="font-bold text-xl mb-2">
              Translation
            </h2>
            <p>{translatedText}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;