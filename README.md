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
  const queueMessageChannel = callback => {
    const {port1, port2} = new MessageChannel()
    port2.onmessage = callback
    port1.postMessage('')
  }
  requestAnimationFrame(() => queueMessageChannel(loadScript))
} else {
  loadScript()
}
```
