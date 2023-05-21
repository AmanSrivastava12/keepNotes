KeepNotes Website - Perform the following steps after cloning the repository on your device in order to prevent any warnings or errors. This will start the server and the react app concurrently.

Run the commands -
npm init both in the backend folder and the cloned repository
npm install concurrently
npm install nodemailer
npm install react-router-dom
npm install cors
npm install nodemon
and some other commands to install dependencies that might not be present on your device.

Replace the following code in the file under node_modules/react-scripts/config/webpackDevServer.config.js (node_modules of the primary cloned folder) without ejecting it.

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

After this run the npm eject command.

Finally, run the command npm run allcmds to successfully run the project on your device.
