const OpenAI = require('openai');
const NodeCache = require('node-cache');
const { buildRoadmapPrompt } = require('./roadmapPrompt');

const cache = new NodeCache({ stdTTL: 60 * 60 * 24 });
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateRoadmap(goal, duration) {
  const cacheKey = `${goal}::${duration}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const prompt = buildRoadmapPrompt(goal, duration);

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    input: prompt,
    temperature: 0.2,
  });

  const text = response.output_text?.trim();
  const parsed = JSON.parse(text);
  cache.set(cacheKey, parsed);
  return parsed;
}

module.exports = { generateRoadmap };
