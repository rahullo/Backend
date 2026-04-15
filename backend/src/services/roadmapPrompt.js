function buildRoadmapPrompt(goal, duration = '30 days') {
  return `You are an expert learning coach. Generate a practical roadmap in STRICT JSON only.
Requirements:
- Goal: ${goal}
- Duration: ${duration}
- Progression from beginner to advanced
- Weekly themes and daily tasks
- Each task has clear action + how-to + resource links
- No markdown, no explanation, only valid JSON
JSON schema:
{
  "goal": "string",
  "duration": "string",
  "weeks": [
    {
      "week": 1,
      "focus": "string",
      "tasks": [
        {
          "day": 1,
          "title": "string",
          "description": "string",
          "resources": ["https://..."]
        }
      ]
    }
  ]
}`;
}

module.exports = { buildRoadmapPrompt };
