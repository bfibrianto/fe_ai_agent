import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const apiBaseUrl = process.env.API_BASE_URL; // URL API eksternal
    const apiKey = process.env.API_KEY; // API key yang disimpan di environment variable

    try {
      const response = await axios.get(`${apiBaseUrl}/rag/load/projects/`, {
        headers: {
          'api-key': `${apiKey}`, // Tambahkan API key di header
        },
      });

      res.status(200).json(response.data); // Kirim data ke klien
    } catch (error) {
      console.error("Error fetching project IDs:", error);
      res.status(error.response?.status || 500).json({ error: "Failed to fetch project IDs" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}