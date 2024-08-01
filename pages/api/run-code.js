import { promisify } from 'util';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { language, code } = req.body;

  const clientId = 'b55da878dbc0177e64b7d777eaf5ebe4';
  const clientSecret = '13e2a47a014622fca7cbe3eddd36c9cd36dddedf3f9ec6528ce646b4d4f4ddbf';

  const languageMap = {
    c: { language: 'c', versionIndex: '5' },
    cpp: { language: 'cpp17', versionIndex: '0' },
    csharp: { language: 'csharp', versionIndex: '3' },
    java: { language: 'java', versionIndex: '3' },
    javascript: { language: 'nodejs', versionIndex: '3' },
    php: { language: 'php', versionIndex: '3' },
    python: { language: 'python3', versionIndex: '3' },
    ruby: { language: 'ruby', versionIndex: '3' },
    go: { language: 'go', versionIndex: '3' },
    rust: { language: 'rust', versionIndex: '3' },
    swift: { language: 'swift', versionIndex: '3' },
  };

  if (!languageMap[language]) {
    return res.status(400).json({ message: 'Unsupported language' });
  }

  const { language: lang, versionIndex } = languageMap[language];

  try {
    const response = await fetch('https://api.jdoodle.com/v1/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        script: code,
        language: lang,
        versionIndex,
        clientId,
        clientSecret,
      }),
    });
    const data = await response.json();
    res.status(200).json({ output: data });
    console.log(data);
  } catch (error) {
    res.status(500).json({ output: error.message });
  }
}
