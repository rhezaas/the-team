import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts, Link, useLoaderData } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState } from "react";
import axios from "axios";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const links = () => {
  return [
    { rel: "preconnect", href: "fonts.gstatic.com", crossOrigin: "anonymous" },
    { rel: "preconnect", href: "fonts.googleapis.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
    }
  ];
};
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Page({ children, className }) {
  return /* @__PURE__ */ jsxs("div", { className: "w-full min-h-dvh bg-[#fffcf3] flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs("header", { className: "bg-[#fffcf3] w-full py-5 px-5 flex justify-between items-center sticky top-0 z-50 lg:max-w-screen-lg", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "text-2xl font-oswald font-semibold leading-5", children: [
        "The",
        /* @__PURE__ */ jsx("br", {}),
        "Team"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[6px] cursor-pointer", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-block w-12 h-[4px] bg-black rounded-full" }),
        /* @__PURE__ */ jsx("span", { className: "self-end inline-block w-10 h-[4px] bg-black rounded-full" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `
                py-20 px-5 flex flex-col gap-10 lg:py-24
                lg:max-w-screen-lg flex-grow
                ${className}
            `, children }),
    /* @__PURE__ */ jsx("footer", { className: "w-full flex justify-center p-5 border-t", children: /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col gap-3 justify-between px-5 pb-10 md:flex-row lg:max-w-screen-lg", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500", children: "Copyright © 2024 The Team. All rights reserved." }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 self-end", children: [
        /* @__PURE__ */ jsx("div", { className: "w-5 h-5 bg-zinc-400/50 rounded-sm flex items-center justify-center cursor-pointer", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512", width: 12, height: 12, className: "fill-neutral-100", children: /* @__PURE__ */ jsx("path", { d: "M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" }) }) }),
        /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 576 512", width: 24, height: 24, className: "fill-zinc-400/50 cursor-pointer", children: /* @__PURE__ */ jsx("path", { d: "M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" }) }),
        /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512", width: 24, height: 24, className: "fill-zinc-400/50 cursor-pointer", children: /* @__PURE__ */ jsx("path", { d: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" }) })
      ] })
    ] }) })
  ] });
}
const meta$1 = () => {
  return [
    { title: "The Team" }
  ];
};
function Index() {
  return /* @__PURE__ */ jsxs(Page, { children: [
    /* @__PURE__ */ jsx("h1", { className: "text-5xl text-center font-addington font-semibold py-10 lg:py-7 lg:mx-64 lg:text-6xl", children: "Explore The Art Around The World" }),
    /* @__PURE__ */ jsx(Link, { to: "/team", className: "bg-black text-[#fffcf3] py-2 px-5 font-semibold w-fit self-center", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("p", { children: "Meet The Team" }),
      /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512", width: 16, height: 16, className: "fill-[#fffcf3]", children: /* @__PURE__ */ jsx("path", { d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" }) })
    ] }) })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const Card = ({ image, name, bio, member_since_str }) => {
  const [isHover, setHover] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "bg-white p-2 rounded-2xl flex flex-col gap-3 shadow-xl h-min", onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false), children: [
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-2xl", children: /* @__PURE__ */ jsx("img", { src: `http://django-backend:8000/media/${image}`, alt: image }) }),
    /* @__PURE__ */ jsxs("div", { className: "px-3 pb-2 flex flex-col gap-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xl font-oswald font-semibold", children: name }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500", children: member_since_str })
        ] }),
        /* @__PURE__ */ jsx("p", { className: `text-xs text-neutral-700 ${isHover ? "" : "line-clamp-3"}`, children: bio })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 self-end", children: [
        /* @__PURE__ */ jsx("div", { className: "w-5 h-5 bg-zinc-400/50 rounded-sm flex items-center justify-center cursor-pointer", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512", width: 12, height: 12, className: "fill-neutral-100", children: /* @__PURE__ */ jsx("path", { d: "M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" }) }) }),
        /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 576 512", width: 24, height: 24, className: "fill-zinc-400/50 cursor-pointer", children: /* @__PURE__ */ jsx("path", { d: "M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" }) }),
        /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512", width: 24, height: 24, className: "fill-zinc-400/50 cursor-pointer", children: /* @__PURE__ */ jsx("path", { d: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" }) })
      ] })
    ] })
  ] });
};
let loader = async ({ request, params }) => {
  const response = await axios({
    url: "http://django-backend:8000/team/",
    method: "GET"
  }).catch((err) => {
    console.log("AXIOS ERROR: ", { err });
  });
  return response.data.data;
};
const meta = () => {
  return [
    { title: "About Us" }
  ];
};
function TeamView() {
  const datas = useLoaderData();
  return /* @__PURE__ */ jsxs(Page, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-8xl lg:text-9xl font-oswald font-extrabold", children: [
        "The",
        /* @__PURE__ */ jsx("br", {}),
        "Team"
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl", children: "We at The Team are passionate about art and aim to provide the best service possible to our client. We're always looking out for talented people." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-7", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-oswald font-medium", children: "Meet Our Team" }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-5", children: datas.map((data, i) => /* @__PURE__ */ jsx(
        Card,
        {
          image: data.image,
          name: data.name,
          bio: data.bio,
          member_since_str: data.member_since_str
        },
        i
      )) })
    ] })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TeamView,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CTi4Egrm.js", "imports": ["/assets/components-4ka__UO6.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-CVW6uwDP.js", "imports": ["/assets/components-4ka__UO6.js"], "css": ["/assets/root-DsNqwfY8.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-C77YtHRG.js", "imports": ["/assets/components-4ka__UO6.js", "/assets/page-DmboGJmm.js"], "css": [] }, "routes/team": { "id": "routes/team", "parentId": "root", "path": "team", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/team-CLJYA4t5.js", "imports": ["/assets/components-4ka__UO6.js", "/assets/page-DmboGJmm.js"], "css": [] } }, "url": "/assets/manifest-b6d46ce5.js", "version": "b6d46ce5" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "unstable_singleFetch": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/team": {
    id: "routes/team",
    parentId: "root",
    path: "team",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
