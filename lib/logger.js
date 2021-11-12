export function logger(req, _res, next) {
  console.log(`🤖 Incoming request: ${req.method} to ${req.url}`)
  next()
}

