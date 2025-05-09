declare module 'cloudflare:test' {
	interface ProvidedEnv extends Env {
		AI_GATEWAY_TOKEN: string;
		ACCOUNT_ID: string;
		GATEWAY_ID: string;
	}
}
