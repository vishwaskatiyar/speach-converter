import regeneratorRuntime from "regenerator-runtime";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useState } from "react";

const App = () => {
  const [textToCopy, setTextToCopy] = useState("");
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript);
    setCopied();
    setTextToCopy(""); // Reset transcript after copying
  };

  if (!browserSupportsSpeechRecognition) {
    return <div className="text-red-600">Speech recognition not supported</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Speech to Text Converter
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          A React hook that converts speech from the microphone to text and
          makes it available to your React components.
        </p>

        <div className="bg-gray-200 h-96 p-4 mb-4 rounded-md overflow-auto">
          {transcript}
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <button
            onClick={handleCopy}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md ${
              isCopied && "bg-green-500 hover:bg-green-600"
            } transition-all duration-300`}
          >
            {isCopied ? "Copied!" : "Copy to Clipboard"}
          </button>
          <button
            onClick={startListening}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300"
          >
            Start Listening
          </button>
          <button
            onClick={SpeechRecognition.stopListening}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300"
          >
            Stop Listening
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
