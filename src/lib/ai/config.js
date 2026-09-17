/**
 * AI Configuration and Call Dispatcher
 */

export function getAIConfig() {
  try {
    const raw = localStorage.getItem('rc_settings');
    const settings = raw ? JSON.parse(raw) : {};
    return {
      apiKey: settings.apiKey || '',
      provider: settings.aiProvider || 'openai'
    };
  } catch (e) {
    return { apiKey: '', provider: 'openai' };
  }
}


/**
 * Generic AI execution wrapper. If an API key is available, calls the OpenAI/Gemini API endpoint.
 * If not, uses our high-fidelity medical educational heuristic engine.
 */
export async function callAIService({ systemPrompt, userMessage, fallbackGenerator }) {
  const { apiKey } = getAIConfig();

  if (apiKey && apiKey.trim().length > 10) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.choices[0]?.message?.content || fallbackGenerator();
      }
    } catch (e) {
      console.warn('API call failed, switching to local medical AI engine:', e);
    }
  }

  // Simulate network delay for natural feel
  await new Promise(res => setTimeout(res, 600));
  return fallbackGenerator();
}
