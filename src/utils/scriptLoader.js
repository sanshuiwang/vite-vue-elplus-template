export function scriptLoader(url) {
  // import.meta.env.BASE_URL是vite.config.js中的base属性值
  const baseUrl = import.meta.env.BASE_URL
  const finalUrl = baseUrl && baseUrl === '/' ? url : baseUrl + (url.startsWith('/') ? url.slice(1) : url)
  const urlPromise = window[`${url}_promise`]
  if (urlPromise) {
    return urlPromise
  }

  //eslint-disable-next-line
  return (window[`${url}_promise`] = new Promise((resolve, reject) => {
    appendScriptTag(finalUrl, resolve)
  }))
}

function appendScriptTag(url, resolve) {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.onload = resolve
  script.src = url
  script.onerror = function () {
    document.body.removeChild(script)
    setTimeout(() => {
      appendScriptTag(url)
    }, 30000)
  }
  document.body.appendChild(script)
}
