## Workaround

### A.

```pug
div(style="height:0") #{'\u200b'.repeat(201)}
```

### B.

```js
/* add preload link if needed: <link href={src} rel="preload" as="script" crossorigin /> */

const isVisible = (document.visibilityState || document.webkitVisibilityState) === 'visible'
if (isVisible) {
  requestAnimationFrame(loadScript)
} else {
  loadScript()
}

// alternative (slightly faster)
if (isVisible) {
  /* const scheduleNextTick = callback => {
    const {port1, port2} = new MessageChannel()
    port2.onmessage = callback
    port1.postMessage('')
  } */
  const scheduleNextTick = callback => {
    const el = new Image()
    el.onload = el.onerror = callback
    el.src = 'data:,'
  }
  requestAnimationFrame(() => scheduleNextTick(loadScript))
} else {
  loadScript()
}
```
