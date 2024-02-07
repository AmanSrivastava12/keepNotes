KEEP NOTES :

How to setup this on your device - You just need to download this project on your device and open the downloaded files with any text editor(e.g. VS Code). Run the commands 'npm init' and 'npm install' both in the backend folder and the cloned repository. Also replace the following code present in "node_modules/react-scripts/config/webpackDevServer.config.js" - 

onBeforeSetupMiddleware(devServer) {
devServer.app.use(evalSourceMapMiddleware(devServer));
if (fs.existsSync(paths.proxySetup)) {
require(paths.proxySetup)(devServer.app);
}
},
onAfterSetupMiddleware(devServer) {
devServer.app.use(redirectServedPath(paths.publicUrlOrPath));
devServer.app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath));
},

with the following code - 

setupMiddlewares: (middlewares, devServer) => {
if (!devServer) {
throw new Error('webpack-dev-server is not defined')
}
if (fs.existsSync(paths.proxySetup)) {
require(paths.proxySetup)(devServer.app)
}
middlewares.push(
evalSourceMapMiddleware(devServer),
redirectServedPath(paths.publicUrlOrPath),
noopServiceWorkerMiddleware(paths.publicUrlOrPath)
)
return middlewares;
},

After that run the command 'npm run allcmds' and now your project is up and running.

Short Summary - It is a website for maintaining and keeping track of your notes and blogs for your own use. The website also offers several features such as sign in, log in, sending some specific notes to your email ID among other things.

Technologies used - HTML, CSS, Bootstrap, React, Express, Node, MongoDB
