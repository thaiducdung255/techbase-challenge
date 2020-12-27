export default () => ({
	port: parseInt(process.env.PORT, 10) || 3000,
	database: {
		uri: process.env.DATABASE_URI,
		options: {
			useCreateIndex: true,
			useFindAndModify: false,
		},
	},
	crypt: {
		algorithm: process.env.ALGORITHM || 'SHA512',
		pepper: process.env.PEPPER || '8c849f75e6e06001b5df3ab8a3373deaaac244fc6556431296',
		saltRound: parseInt(process.env.SALT_ROUND) || 30,
		passwordLen: parseInt(process.env.PASSWORD_LEN) || 30,
	},
	jwt: {
		accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '1h',
		refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '1d',
		secretKey: process.env.TOKEN_SECRET || '8c849f75e6e06001b5df3ab8a3373deaaac244fc6556431296',
	},
});
