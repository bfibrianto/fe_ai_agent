import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [projectId, setProjectId] = useState("");
  const [projectIdArray, setProjectIdArray] = useState([]); // Use state for projectIdArray
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  // Fetch project IDs when the component mounts
  useEffect(() => {
    const fetchProjectIds = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/rag/load/projects/`);
        console.log("Project IDs:", response.data.project_ids);
        setProjectIdArray(response.data.project_ids); // Update state with fetched project IDs
      } catch (error) {
        console.error("Error fetching project IDs:", error);
      }
    };

    fetchProjectIds();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const sendMessage = async () => {
    if (!projectId || !input) return;

    chatHistory.push({
      type: "human",
      content: input,
    });

    try {
        setLoading(true); // Start loading when sending a message
      console.log("Project ID:", projectId);
      console.log("Sending message:", input);
      const response = await axios.post(`${apiBaseUrl}/rag/retrieve/chat/`, {
        project_id: projectId,
        user_input: input,
      });
      console.log("Response:", response.data);
        chatHistory.push({
            type: "bot",
            content: response.data.response.answer,
        });
    //   setChatHistory(response.data.response.chat_history);
      setInput(""); // Reset input after sending the message
      setLoading(false); // Stop loading after receiving the response 
    } catch (error) {
      console.error("Error:", error);
    }
  };

return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-emerald-950">💬 RAG Chatbot</h1>

        {/* Select Project ID */}
        <select
            value={projectId}
            onChange={(e) => {
                setProjectId(e.target.value);
                setInput(""); // Reset input when project ID changes
                setChatHistory([]); // Reset chat history when project ID changes
            }}
            className="border p-2 w-80 mb-4 rounded-md text-black"
        >
            <option value="" disabled>
                Pilih Project ID...
            </option>
            {projectIdArray.map((id, index) => (
                <option key={index} value={id}>
                    {id}
                </option>
            ))}
        </select>

        {/* Chat Window */}
        <div className="w-80 h-96 bg-white p-4 shadow-md rounded-md overflow-y-auto mb-4">
            {chatHistory.map((chat, index) => (
                <div key={index} className={`mb-2 ${chat.type === "human" ? "text-right" : "text-left"}`}>
                    <p className={`p-2 rounded-md inline-block text-black ${chat.type === "human" ? "bg-blue-300" : "bg-gray-300"}`}>
                        {chat.content}
                    </p>
                </div>
            ))}
            {/* add loading dot animation for wating the answer from bot */}
            {loading && (
                <div  className="mb-2 text-left">
                    <p className="p-2 rounded-md inline-block text-black bg-gray-300">
                        <span className="animate-pulse">Waiting...</span>
                    </p>
                </div>
            )}
        </div>

        {/* Input Chat */}
        <div className="flex w-80">
            <input
                type="text"
                placeholder="Ketik pesan..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        sendMessage();
                    }
                }}
                className="border p-2 flex-grow rounded-l-md text-black bg-white"
            />
            <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 rounded-r-md"
            >
                {loading ? (
                    <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                    </svg>
                ) : (
                    "Kirim"
                )}
            </button>
        </div>
        <div className="row-span-3 flex items-center justify-center mt-4">
            <a
                href="/"
                className="ml-4 text-blue-500 underline self-center"
            >
                Kembali ke Home
            </a>
        </div>
    </div>
);
}