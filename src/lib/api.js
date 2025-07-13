const BASE_URL = 'https://backend1-vwd5.onrender.com';

// === AI Guidance (general prompt handling) ===
export async function fetchAIGuidance(prompt) {
  try {
    const res = await fetch(`${BASE_URL}/ai-guidance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: prompt })
    });

    const data = await res.json();
    return data.result;
  } catch (err) {
    console.error('❌ fetchAIGuidance error:', err);
    return null;
  }
}

// === AI Motivational Quote ===
export async function fetchAIQuote(topic = "failure") {
  try {
    const res = await fetch(`${BASE_URL}/ai-quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic })
    });

    const data = await res.json();
    return data.quote;
  } catch (err) {
    console.error('❌ fetchAIQuote error:', err);
    return null;
  }
}

// === AI Career Guide ===
export async function fetchAICareerGuide(prompt) {
  try {
    const res = await fetch(`${BASE_URL}/ai-guide`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    return data.answer;
  } catch (err) {
    console.error('❌ fetchAICareerGuide error:', err);
    return null;
  }
}

// === AI Careers Suggestion ===
export async function fetchAICareers(keyword = "technology") {
  try {
    const res = await fetch(`${BASE_URL}/ai-careers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword })
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('❌ fetchAICareers error:', err);
    return [];
  }
}

// === Failure Stories ===
export async function fetchFailureStories() {
  try {
    const res = await fetch(`${BASE_URL}/stories`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('❌ fetchFailureStories error:', err);
    return [];
  }
}

// === Career Details ===
export async function fetchCareerDetails(title) {
  try {
    const res = await fetch(`${BASE_URL}/career-details`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('❌ fetchCareerDetails error:', err);
    return null;
  }
}

// ✅ Default export for `import API from '$lib/api'`
export default {
  fetchAIGuidance,
  fetchAIQuote,
  fetchAICareerGuide,
  fetchAICareers,
  fetchFailureStories,
  fetchCareerDetails
};
