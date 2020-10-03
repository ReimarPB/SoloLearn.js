/**	@module mobile/Client */

const https = require("https");
const crypto = require("crypto");
const zlib = require("zlib");

/**
 * Represents the SoloLearn client
 */
class Client {

	/**
	 * @param {{ appVersion: ?string, firmware: ?string, locale: ?string, model: ?string, uniqueID: ?string, serial: ?string, manufacturer: ?string }} data
	 */
	constructor(data = {}) {

		/**
		 * SoloLearn version used by the fake Android device, used for API v1 endpoints
		 * @type {string}
		 * @private
		 */
		this.appVersion = data.appVersion || "3.4.1";

		/**
		 * Android version of the fake Android device, used for API v1 endpoints
		 * @type {string}
		 * @private
		 */
		this.firmware = data.firmware || this.generateFirmware();

		/**
		 * Locale of the fake Android device, used for API v1 endpoints
		 * @type {string}
		 * @private
		 */
		this.locale = data.locale || "en";

		/**
		 * Model of the fake Android device, used for API v1 endpoints
		 * @type {string}
		 * @private
		 */
		this.model = data.model || "Unknown Android SDK built for x86"; // TODO: Generate random model

		/**
		 * Unique ID of the fake Android device, used for API v1 endpoints
		 * @type {string}
		 * @private
		 */
		this.uniqueID = data.uniqueID || this.generateAndroidId();

		/**
		 * Serial number of the fake Android device, used for API v1 endpoints
		 * @type {string}
		 * @private
		 */
		this.serial = data.serial || "EMULATOR30X0X0X0"; // TODO: Generate random serial

		/**
		 * Manufacturer of the fake Android device, used to create Device ID
		 * @type {string}
		 * @private
		 */
		this.manufacturer = data.manufacturer || "unknown"; // TODO: Generate random manufacturer

		/**
		 * Device ID, used for API v1 endpoints
		 * @type {string}
		 * @private
		 */
		this.deviceID = `${this.uniqueID}--${this.serial}--` + this.hmacSha1("password", this.model.toLowerCase()).toLowerCase().replace(/[^a-z\d]/gi, "");

		/**
		 * Client ID, used for API v1 endpoints, hardcoded by SoloLearn
		 * @type {string}
		 * @private
		 */
		this.clientID = "com.sololearn";

		/**
		 * Client secret used as a hashing key, hardcoded by SoloLearn
		 * @type {string}
		 * @private
		 */
		this.clientSecret = "bc105e8edb1745028ef3";
		
		/**
		 * Token used for API v1 endpoints, assigned on successful device authentication
		 * @type {?string}
		 * @private
		 */
		this.sessionID = null;
		
		/**
		 * The messenger token, used for API v2 endpoints
		 * @type {?string}
		 * @private
		 */
		this.messengerToken = null;

		/**
		 * The unix time when the messenger token expires. 0 if no token is set. The token lasts 1 hour.
		 * @type {number}
		 * @private
		 */
		this.messengerTokenExpires = 0;

		/**
		 * On successful login, becomes the logged in user's ClientUser object
		 * @type {?ClientUser}
		 * @public
		 */
		this.user = null;

	}

	/**
	 * Get a random fairly recent Android version
	 * @private
	 * @returns {string}
	 */
	generateFirmware() {
		const firmwares = ["6.0", "6.0.1", "7.0", "7.1.1", "7.1.2", "8.0", "8.1.0", "9", "10", "11"];
		return firmwares[Math.floor(Math.random() * firmwares.length)];
	}

	/**
	 * Generate random Android device ID (64-bit number as hex string)
	 * @private
	 * @returns {string}
	 */
	generateAndroidId() {
		return Math.floor(Math.random() * 2 ** 64).toString(16);
	}

	/**
	 * Log in to a SoloLearn account
	 * @param {string} email - The account's email
	 * @param {string} password - The account's password
	 * @param {boolean} [hashed=false] - Whether or not the password already has been hashed using HMAC SHA-1 with "password" as the key. You may want to do this if others have access to your source code.
	 * @see {@link https://www.freeformatter.com/hmac-generator.html} A website used for encryption. Type the password as the value and "password" as the key to generate a pre-hashed password.
	 * @returns {ClientUser}
	 */
	login(email, password, hashed = false) {
		return new Promise(async (resolve, reject) => {

			const ClientUser = require("./ClientUser");

			let body, response;

			// Authenticate device and get session ID
			body = {
				appVersion: this.appVersion,
				firmware: this.firmware,
				locale: this.locale,
				model: this.model,
				uniqueID: this.deviceID
			};
			response = await this.requestV1("/AuthenticateDevice", body).catch(reject);
			this.sessionID = response.sessionID;

			// Hash password if necessary and login
			if (!hashed) password = this.hmacSha1("password", password).replace(/=/g, "");
			body = {
				email,
				password,
				isExplicit: true
			};
			response = await this.requestV1("/Login", body).catch(reject);

			resolve(new ClientUser(this, response.user));

		});

	}

	/**
	 * Get or refresh the messenger token used for API v2 endpoints
	 * @private
	 */
	async getMessengerToken() {
		return new Promise(async (resolve, reject) => {

			// Get new token
			const response = await this.requestV1("/GetMessengerAccessToken", {}).catch(reject);
			this.messengerToken = response.accessToken;
			this.messengerTokenExpires = Date.now() + 3600000;

			resolve();

		});
	}

	/**
	 * Generate a request's signature which SoloLearn uses to obfuscate their API. Only used in API v1.
	 * @param {string} method - The HTTP request's method
	 * @param {string} url - The full URL of the API endpoint
	 * @param {?string} body - The request body
	 * @param {number} nonce - The nonce (randomly generated number for this request, used for further obfuscation)
	 * @param {number} timestamp - The time of the request's creation (Using Date.now() multiple times may mess things up)
	 * @returns {string} The hashed signature string
	 * @private
	 */
	generateSignature(method, url, body, nonce, timestamp) {

		// Generate weird string
		let string = `${method}&${encodeURIComponent(url)}&ClientID%3D${this.clientID}%26DeviceID%3D${this.deviceID}%26Nonce%3D${nonce}%26`;
		if (this.sessionID) string += `SessionID%3D${this.sessionID}%26`;
		string += `Timestamp%3D${timestamp}`;
		if (body) string += `&${body}`;

		// Hash using HMAC SHA-1 with client secret
		return encodeURIComponent(this.hmacSha1(this.clientSecret, string));

	}

	/**
	 * Hash with HMAC SHA-1 and return base64 encoded data
	 * @param {string} key
	 * @param {string} value
	 * @returns {string} The hashed string
	 * @private
	 */
	hmacSha1(key, value) {
		return crypto.createHmac("sha1", key).update(value).digest("base64")
	}

	/**
	 * Send an HTTP request
	 * @param {Object} options - HTTP options
	 * @param {Object} [body=null] - The request body
	 */
	request(options, body = null) {
		return new Promise(async (resolve, reject) => {

			if (body) {
				body = JSON.stringify(body);
				options.headers["Content-Length"] = body.length;
			}

			// Send HTTP request
			const req = https.request(options, res => {

				let data = [];
				res.on("data", chunk => data.push(chunk));
				res.on("end", () => {

					// Used for error messages
					const requestDetails = `${options.method} ${options.host}${options.path}${body ? "\n" + JSON.stringify(body, null, 4) : ""}`;

					// Decode response if necessary
					let response = data;
					try {

						// Decompress gzip then JSON parse the response
						if (res.headers["content-encoding"] === "gzip") response = JSON.parse(zlib.gunzipSync(Buffer.concat(data)).toString());
						// If not compressed, just JSON parse it
						else if (parseInt(res.headers["content-length"]) > 0) response = JSON.parse(data.toString());

					} catch (e) {

						// SoloLearn sends this response when being rate-limited
						if (response.toString() === "error code: 1015") reject(`You are being rate-limited. Please try again later.\n\n${requestDetails}`);
						// If response can't be parsed, throw error
						reject(`Could not parse response data:\n\n${response.toString()}\n\n${requestDetails}`);

					}

					if (res.statusCode !== 200) reject(response);
					else resolve(response);

				});

				res.on("error", err => {
					reject(err);
				});

			});

			req.on("error", err => {
				reject(err);
			});
			
			if (body) req.write(body);

			req.end();

		});
	}

	/**
	 * Send a request to SoloLearn's v1 API
	 * @param {string} path - The request path
	 * @param {Object} body - The request body
	 * @returns {Promise<Object>} JSON decoded response
	 */
	async requestV1(path, body = {}) {

		const nonce     = Math.floor(Math.random() * 9000000) + 123400;
		const timestamp = Date.now();
		const signature = this.generateSignature("POST", `https://api.sololearn.com${path}`, JSON.stringify(body), nonce, timestamp);

		const options = {
			method: "POST",
			host: "api.sololearn.com",
			path,
			port: 443,
			headers: {
				"Authorization": `Nonce=${nonce}&DeviceID=${this.deviceID}&${(this.sessionID ? `SessionID=${this.sessionID}&` : "")}ClientID=${this.clientID}&Timestamp=${timestamp}&Signature=${signature}&Version=20`,
				"Content-Type": "application/json; charset=\"utf-8\"",
				"Host": "api.sololearn.com",
				"Connection": "Keep-Alive",
				"Accept-Encoding": "gzip",
				"User-Agent": `Dalvik/2.1.0 (Linux; U; Android ${this.firmware}; ${this.model}`,
			}
		};

		return await this.request(options, body);

	}

	/**
	 * Send a request to SoloLearn's v2 API
	 * @param {string} method - The request method
	 * @param {string} path - The request path
	 * @returns {Promise<Object>} JSON decoded response
	 */
	async requestV2(method, path) {

		if (this.messengerTokenExpires < Date.now()) await this.getMessengerToken();

		const options = {
			method,
			host: "api2.sololearn.com",
			path: `/v2/${path}`,
			port: 443,
			headers: {
				"Host": "api2.sololearn.com",
				"Connection": "Keep-Alive",
				"Accept-Encoding": "gzip",
				"User-Agent": "okhttp/3.12.1"
			}
		};

		if (this.messengerToken) options.headers["Authorization"] = `Bearer ${this.messengerToken}`;

		return await this.request(options);

	}

}

module.exports = Client;