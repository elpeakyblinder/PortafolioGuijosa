import { p as decodeKey } from './chunks/astro/server_DG2Y2vJ7.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_D5Z5HN7w.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Probook/Desktop/GuijosaPortafolio/","cacheDir":"file:///C:/Users/Probook/Desktop/GuijosaPortafolio/node_modules/.astro/","outDir":"file:///C:/Users/Probook/Desktop/GuijosaPortafolio/dist/","srcDir":"file:///C:/Users/Probook/Desktop/GuijosaPortafolio/src/","publicDir":"file:///C:/Users/Probook/Desktop/GuijosaPortafolio/public/","buildClientDir":"file:///C:/Users/Probook/Desktop/GuijosaPortafolio/dist/client/","buildServerDir":"file:///C:/Users/Probook/Desktop/GuijosaPortafolio/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.15.1_@types+node@24_c45777625d1f29e1c58c95acdf69367e/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/send-email","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/send-email\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"send-email","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/send-email.ts","pathname":"/api/send-email","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.DXeCmL_x.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Probook/Desktop/GuijosaPortafolio/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/send-email@_@ts":"pages/api/send-email.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.15.1_@types+node@24_c45777625d1f29e1c58c95acdf69367e/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_C3NAjfU4.mjs","C:/Users/Probook/Desktop/GuijosaPortafolio/node_modules/.pnpm/astro@5.15.1_@types+node@24_c45777625d1f29e1c58c95acdf69367e/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_OZxw6w18.mjs","@/components/ui/SonnerToaster.jsx":"_astro/SonnerToaster.DdGkSxwY.js","@/components/header/Header.jsx":"_astro/Header.CIDDzkfP.js","C:/Users/Probook/Desktop/GuijosaPortafolio/src/components/projects/ProjectsCard.jsx":"_astro/ProjectsCard.BZkefFUy.js","@/components/experience/ExperienceTitle.jsx":"_astro/ExperienceTitle.BE74TDXF.js","@/components/experience/ExperienceCard.jsx":"_astro/ExperienceCard.h2zZWjKc.js","@/components/ui/Select.jsx":"_astro/Select.BGL25NRb.js","@astrojs/react/client.js":"_astro/client.B_tmAnfy.js","C:/Users/Probook/Desktop/GuijosaPortafolio/src/components/header/HeaderSection.astro?astro&type=script&index=0&lang.ts":"_astro/HeaderSection.astro_astro_type_script_index_0_lang.BMwbDAYk.js","C:/Users/Probook/Desktop/GuijosaPortafolio/src/components/contact/ContactMeSection.astro?astro&type=script&index=0&lang.ts":"_astro/ContactMeSection.astro_astro_type_script_index_0_lang.DYBTQThY.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/Probook/Desktop/GuijosaPortafolio/src/components/header/HeaderSection.astro?astro&type=script&index=0&lang.ts","const e=document.querySelector(\"#main-header\");if(e){const l=()=>{window.scrollY>10?e.classList.add(\"scrolled\"):e.classList.remove(\"scrolled\")};window.addEventListener(\"scroll\",l)}"]],"assets":["/_astro/escritorio.DNdY-Bt4.png","/_astro/administration.DyIGU903.png","/_astro/colecciones.BY8Ui7EC.png","/_astro/index.DXeCmL_x.css","/favicon.svg","/logo/logo.png","/_astro/client.B_tmAnfy.js","/_astro/ContactMeSection.astro_astro_type_script_index_0_lang.DYBTQThY.js","/_astro/createLucideIcon.q9VdoSlq.js","/_astro/ExperienceCard.h2zZWjKc.js","/_astro/ExperienceTitle.BE74TDXF.js","/_astro/github.DQcjfYjv.js","/_astro/Header.CIDDzkfP.js","/_astro/index.Bm24PgkJ.js","/_astro/index.BncrDBPJ.js","/_astro/index.C8OPaT7M.js","/_astro/index.DW_U_7lF.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/ProjectsCard.BZkefFUy.js","/_astro/proxy.Fy_HSK-G.js","/_astro/Select.BGL25NRb.js","/_astro/SonnerToaster.DdGkSxwY.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"gZVt99FwRi8FBn9kOdakpWQyPTiiazGQS1xyfGNyLnE="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
