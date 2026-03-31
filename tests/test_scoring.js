const assert = require('node:assert/strict');
const {
  scoreJob,
  dedupeJobs,
  selectTopJobs,
  parseGeminiText,
  classifyRetry
} = require('../src/scoring');

const roboticsIntern = {
  jobTitle: 'Robotics Software Intern',
  company: 'Example Motion Labs',
  description: 'Python ROS 2 computer vision path planning internship for autonomous robots.',
  seniorityLevel: 'Internship',
  employmentType: 'Internship',
  jobUrl: 'https://example.com/a'
};

assert(scoreJob(roboticsIntern) > 5, 'robotics internship should receive a positive score');
assert.equal(scoreJob({ jobTitle: 'PhD Robotics Research Intern' }), -100, 'strict PhD title should be filtered');
assert.doesNotThrow(() => scoreJob({}), 'missing fields should not crash scoring');

const duplicateJobs = [roboticsIntern, { ...roboticsIntern }];
assert.equal(dedupeJobs(duplicateJobs).length, 1, 'duplicate jobs should collapse');

const selected = selectTopJobs([
  roboticsIntern,
  { jobTitle: 'Unrelated Role', company: 'Example', description: 'General office work', jobUrl: 'https://example.com/b' }
], 1);
assert.equal(selected.length, 1, 'limit should be respected');
assert.equal(selected[0].company, 'Example Motion Labs', 'highest scored job should be selected');

assert.equal(parseGeminiText({ candidates: [{ content: { parts: [{ text: 'resume draft' }] } }] }), 'resume draft');
assert.equal(parseGeminiText({ malformed: true }), '', 'malformed LLM responses should return empty text');

assert.equal(classifyRetry({ status: 429 }), 'retry', 'rate limit should be retried');
assert.equal(classifyRetry({ status: 401 }), 'fail', 'auth errors should fail fast');

console.log('scoring tests passed');

