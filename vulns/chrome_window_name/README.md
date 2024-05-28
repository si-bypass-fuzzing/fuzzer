# `window.name` persists across cross-site navigations in Chrome

- not in firefox / webkit
  > This has now landed in both Firefox and Safari, making us the odd ones out.
- https://html.spec.whatwg.org/multipage/browsing-the-web.html#resetBCName
- https://github.com/whatwg/html/pull/5871
- [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/name):
  > Modern browsers will reset Window.name to an empty string if a tab loads a page from a different domain, and restore the name if the original page is reloaded (e.g. by selecting the "back" button). This prevents an untrusted page from accessing any information that the previous page might have stored in the property (potentially the new page might also modify such data, which might then be read by the original page if it was reloaded).
- https://bugs.chromium.org/p/chromium/issues/detail?id=1101031&no_tracker_redirect=1 (duplicate/no-fix)
- https://bugs.chromium.org/p/chromium/issues/detail?id=706350&no_tracker_redirect=1 / https://issues.chromium.org/issues/41310129 (WIP)