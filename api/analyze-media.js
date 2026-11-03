const MODEL = 'gemini-3.1-flash-lite';
const MAX_MEDIA_BYTES = 3 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'video/mp4',
  'video/webm',
  'video/quicktime'
]);

const PROMPT = `You are a campus safety triage assistant. Analyze the attached campus facility evidence.
Return only JSON with these fields:
{"category":"one of: Electrical & Fire Safety, Sanitation & Water Supply, Hostel & Pest Control, Mess & Food Safety, Campus Transit & Mobility, Internet & IT Lab Services, Civil Infrastructure & Elevators, Campus Safety & Night Lighting, Academic & Classroom Facilities, Waste & Sustainability, Other","severity":1-5,"isCritical":boolean,"summary":"one short factual sentence describing what is visible"}
Severity: 1 cosmetic/minor, 2 routine maintenance, 3 moderate, 4 urgent repair, 5 immediate danger to life or safety. Set isCritical true only for genuine immediate danger, such as active fire, exposed sparking wires, structural collapse, a trapped person, or a medical emergency. Be conservative.`;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Use POST for image analysis.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'Image AI is not configured. Add GEMINI_API_KEY to the deployment environment.' });
  }

  const { dataUrl, mimeType } = req.body || {};
  if (typeof dataUrl !== 'string' || !ALLOWED_MIME_TYPES.has(mimeType)) {
    return res.status(400).json({ error: 'Unsupported or missing image/video evidence.' });
  }

  const match = dataUrl.match(/^data:([^;,]+);base64,([A-Za-z0-9+/=]+)$/);
  if (!match || match[1] !== mimeType) {
    return res.status(400).json({ error: 'Evidence must be a valid base64 data URL.' });
  }

  const media = Buffer.from(match[2], 'base64');
  if (!media.length || media.length > MAX_MEDIA_BYTES) {
    return res.status(413).json({ error: 'Evidence must be smaller than 3 MB. Please choose a smaller file.' });
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: PROMPT },
            { inline_data: { mime_type: mimeType, data: media.toString('base64') } }
          ]
        }],
        generationConfig: { maxOutputTokens: 300 }
      })
    });

    const result = await response.json();
    if (!response.ok) {
      console.error('Gemini API error:', response.status, result?.error?.status || 'request_failed');
      return res.status(502).json({ error: 'Gemini could not analyze this evidence. Check the API key and try again.' });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Gemini request failed:', error.message);
    return res.status(502).json({ error: 'Could not reach the image analysis service. Please try again.' });
  }
};
