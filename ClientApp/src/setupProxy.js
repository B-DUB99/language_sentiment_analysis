const { createProxyMiddleware } = require("http-proxy-middleware");
const { env } = require("process");

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
  ? env.ASPNETCORE_URLS.split(";")[0]
  : "http://localhost:15485";

const context = ["/hub"];

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    secure: false,
    changeOrigin: true,
    ws: true,
  });

  app.use(appProxy);
};
