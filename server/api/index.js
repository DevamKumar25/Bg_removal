import createServer from "../createServer.js";

let cachedApp;

export default async function handler(req, res) {
  if (!cachedApp) {
    const app = await createServer();
    cachedApp = app;
  }
  return cachedApp(req, res);
}
