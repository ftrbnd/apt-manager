import { Apple } from 'arctic';

import type { AppleCredentials } from 'arctic';
import { serverEnv } from '../env';

const credentials: AppleCredentials = {
	clientId: serverEnv.APPLE_CLIENT_ID,
	teamId: serverEnv.APPLE_TEAM_ID,
	keyId: serverEnv.APPLE_KEY_ID,
	certificate: serverEnv.APPLE_CERTIFICATE,
};

export const apple = new Apple(credentials, serverEnv.AUTH_REDIRECT_URI);
