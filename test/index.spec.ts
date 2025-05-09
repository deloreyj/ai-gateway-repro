import { describe, expect, test } from 'vitest';
import { createOpenAI } from '@ai-sdk/openai';
import { createAiGateway } from 'ai-gateway-provider';
import { generateText } from 'ai';
import { env } from 'cloudflare:workers';

describe('Hello World worker', { timeout: 6000000 }, () => {
	test('Can call AI gateway wholesaling', async () => {	
		const aigateway = createAiGateway({
			accountId: env.ACCOUNT_ID,
			gateway: env.GATEWAY_ID,
			apiKey: env.AI_GATEWAY_TOKEN,
		});

		const openai = createOpenAI({
			apiKey: ''
		});

			const response = await generateText({
				model: aigateway([openai('gpt-4o')]),
				prompt: 'Hello, world!',
			});
			console.log(JSON.stringify(response, null, 2));
			expect(response.text).toBe('Hello, world!');	

	});

	test("can hit the ai gateway directly", async () => {
		const response = await fetch(`https://gateway.ai.cloudflare.com/v1/${env.ACCOUNT_ID}/${env.GATEWAY_ID}/openai/chat/completions`, {
			method: 'POST',
			body: JSON.stringify({
				model: 'gpt-4o',
				messages: [{role: 'user', content: 'Hello, world!'}],
			}),
			headers: {
				'cf-aig-authorization': `Bearer ${env.AI_GATEWAY_TOKEN}`,
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json<{choices: {message: {content: string}}[]}>();
		console.log(JSON.stringify(data, null, 2));
		expect(data.choices[0].message.content.length).toBeGreaterThan(0);
	})
});
