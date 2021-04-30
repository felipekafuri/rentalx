export default {
  secret: String(process.env.APP_SECRET),
  expiresIn: '24h',
  secret_refresh_token: String(process.env.APP_REFRESH_TOKEN),
  expires_in_refresh_token: '90d',
  expires_in_refresh_token_days: 30
}
