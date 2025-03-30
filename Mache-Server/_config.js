module.exports = {
	port: 5555,
	name: 'uno_card',
	dbHost: 'localhost',
	dbUserName: 'postgres',
	dbPassword: 'root',
	dbName: 'postgres',
	dbPort: '5432',
	saltRounds: 2,
	jwtSecret: 'uno_card@159*',
	api_key: '3SATbuIEVJmmM9XPgO3uHKcQwSZtvkk',
	API_KEY: '1a8bcb5a3ce0c5ea7bac6856d70d0205',
	SECRET_KEY: 'b9a2377cc79760b4b498133308d41395',
	no_data_message: 'No data found!!',
	uploadDir: './uploads/',
	avatarImagePath: 'avatar_images/',
	appUserImagePath: 'app_user_images/',
	tokenExpireTime: 60 * 60 * 24,
	appTokenExpireTime: 60 * 60 * 24 * 30,
	stripe_secret_key: 'sk_test_yOHo1jYXSOOxEfiIyR01VI5A00bmJ2NpFj',
	entry_fee: 5,
	dataLimit: 25,
	daily_coin: 5,
	domain: 'http://fff85ba34b97.ngrok.io/',
	getServerUrl(req) {
		var serverURL = 'http://fff85ba34b97.ngrok.io/';
		return serverURL;
	}
}

//don't store this file in repository, it's unsecure
