export default {
  secret: String(process.env.APP_SECRET),
  expiresIn: '15m',
  secret_refresh_token: String(process.env.APP_REFRESH_TOKEN),
  expires_in_refresh_token: '30d',
  expires_in_refresh_token_days: 30
}
