import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { project_id, user_input } = req.body;

    if (!project_id || !user_input) {
      return res.status(400).json({ error: "Project ID and user input are required." });
    }

    try {
      const apiBaseUrl = process.env.API_BASE_URL; // Backend API base URL
      const apiKey = process.env.API_KEY; // API key stored in environment variables

      // Make a request to the backend chat API
      const response = await axios.post(
        `${apiBaseUrl}/rag/retrieve/chat/`,
        { project_id, user_input },
        {
          headers: {
            'api-key': `${apiKey}`, // Add API key in the header
          },
        }
      );

      // Return the response from the backend to the client
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error in chat API:", error.response?.data || error.message);
      res.status(error.response?.status || 500).json({
        error: error.response?.data || "An error occurred while processing the chat request.",
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed. Use POST." });
  }
}