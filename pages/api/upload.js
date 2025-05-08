import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';

const upload = multer({
    limits: { fileSize: 50 * 1024 * 1024 },
    storage: multer.memoryStorage(),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    upload.single('file')(req, {}, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      console.log("Request body:", req.body); // Log request body for debugging
      const project_id = req.body.project_id // Log metadata for debugging
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: 'File is required' });
      }
      try {
        const apiBaseUrl = process.env.API_BASE_URL; // URL API eksternal
        const apiKey = process.env.API_KEY; // API key yang disimpan di environment variable

        const formData = new FormData();
        formData.append('file', file.buffer, file.originalname); // Append file buffer and original name
        formData.append('project_id', project_id); // Append project_id

        const response = await axios.post(`${apiBaseUrl}/rag/load/document/`, formData, {
          headers: {
            'api-key': `${apiKey}`, // Add API key in header
            ...formData.getHeaders(), // Include form-data headers
          },
        });

        res.status(200).json(response.data); // Kirim data ke klien
      } catch (error) {
        console.error("Error uploading file:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
          error: error.response?.data || "An error occurred while processing the upload request.",
        });
      }
    });
  } else {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  }
}