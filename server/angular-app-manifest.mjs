
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://sakshamjain2411.github.io/transport-manager/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/transport-manager"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 19315, hash: '66c7685d50ff29c25b65e3770f52fd6a81e74b98d1b4dd0da2cd699cbac60b77', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1157, hash: '7c0eba7eeef67f971331d07d4c753800cb7bac9e75cb4ecd5044dbac7897c995', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 22492, hash: 'cb8794ba22ae0b34511cd602286b9c6539dd02efd469db14af277cac577a237e', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-Y6OCNHVA.css': {size: 20064, hash: '5JkDzDn1NNc', text: () => import('./assets-chunks/styles-Y6OCNHVA_css.mjs').then(m => m.default)}
  },
};
