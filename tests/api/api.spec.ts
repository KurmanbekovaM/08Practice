import { test, expect } from '@playwright/test';

test('API returns 10 trivia questions', async ({ request }) => {
  const response = await request.get('/api.php?amount=10');
  
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody).toBeInstanceOf(Object);

  expect(responseBody.results).toBeDefined();
  expect(responseBody.results.length).toBe(10);
});

test('API returns valid question structure', async ({ request }) => {
  const response = await request.get('/api.php?amount=10');

  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  
  const firstQuestion = responseBody.results[0];
  expect(firstQuestion).toHaveProperty('question');
  expect(firstQuestion).toHaveProperty('correct_answer');
  expect(firstQuestion).toHaveProperty('incorrect_answers');
});
