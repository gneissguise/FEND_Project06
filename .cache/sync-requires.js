// prefer default export if available
const preferDefault = m => m && m.default || m


exports.layouts = {
  "layout---index": preferDefault(require("/home/justin/Documents/Udacity-Projects/front-end-nano/project_06/.cache/layouts/index.js"))
}

exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/home/justin/Documents/Udacity-Projects/front-end-nano/project_06/.cache/dev-404-page.js")),
  "component---src-pages-404-js": preferDefault(require("/home/justin/Documents/Udacity-Projects/front-end-nano/project_06/src/pages/404.js")),
  "component---src-pages-index-js": preferDefault(require("/home/justin/Documents/Udacity-Projects/front-end-nano/project_06/src/pages/index.js"))
}

exports.json = {
  "layout-index.json": require("/home/justin/Documents/Udacity-Projects/front-end-nano/project_06/.cache/json/layout-index.json"),
  "dev-404-page.json": require("/home/justin/Documents/Udacity-Projects/front-end-nano/project_06/.cache/json/dev-404-page.json"),
  "404.json": require("/home/justin/Documents/Udacity-Projects/front-end-nano/project_06/.cache/json/404.json"),
  "index.json": require("/home/justin/Documents/Udacity-Projects/front-end-nano/project_06/.cache/json/index.json"),
  "404-html.json": require("/home/justin/Documents/Udacity-Projects/front-end-nano/project_06/.cache/json/404-html.json")
}