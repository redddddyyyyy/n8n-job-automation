const SKILL_KEYWORDS = [
  'python',
  'ros',
  'autonomous',
  'robotics',
  'machine learning',
  'ai',
  'ml',
  'computer vision',
  'deep learning',
  'pytorch',
  'tensorflow',
  'opencv',
  'plc',
  'automation',
  'scada',
  'c++',
  'matlab',
  'simulink',
  'embedded',
  'lidar',
  'sensor fusion',
  'slam',
  'path planning',
  'neural network',
  'internship',
  'intern',
  'entry level'
];

function normalize(value) {
  return String(value || '').toLowerCase();
}

function scoreJob(job) {
  const title = normalize(job.jobTitle);
  const text = normalize(`${job.jobTitle || ''} ${job.description || ''} ${job.seniorityLevel || ''} ${job.employmentType || ''}`);

  if (title.includes('phd') || title.includes('ph.d')) {
    return -100;
  }

  let score = 0;
  for (const keyword of SKILL_KEYWORDS) {
    if (text.includes(keyword)) score += 1;
  }

  if (text.includes('intern')) score += 3;
  if (normalize(job.seniorityLevel).includes('intern')) score += 3;
  return score;
}

function dedupeJobs(jobs) {
  const seen = new Set();
  const output = [];

  for (const job of jobs) {
    const key = normalize(`${job.company || ''}|${job.jobTitle || ''}|${job.jobUrl || ''}`);
    if (seen.has(key)) continue;
    seen.add(key);
    output.push(job);
  }

  return output;
}

function selectTopJobs(jobs, limit = 18) {
  return dedupeJobs(jobs)
    .map((job) => ({ ...job, _score: scoreJob(job) }))
    .filter((job) => job._score > -50)
    .sort((a, b) => b._score - a._score)
    .slice(0, limit);
}

function parseGeminiText(response) {
  try {
    const text = response.candidates[0].content.parts[0].text;
    return typeof text === 'string' ? text : '';
  } catch {
    return '';
  }
}

function classifyRetry(error) {
  const status = Number(error && (error.status || error.statusCode || error.code));
  if ([408, 409, 425, 429, 500, 502, 503, 504].includes(status)) return 'retry';
  return 'fail';
}

module.exports = {
  SKILL_KEYWORDS,
  scoreJob,
  dedupeJobs,
  selectTopJobs,
  parseGeminiText,
  classifyRetry
};

