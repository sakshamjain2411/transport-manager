
export default {
  basePath: 'https://sakshamjain2411.github.io/transport-manager',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
