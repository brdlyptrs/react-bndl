export function fetchBundle(path, { cleanup = true }={}) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    const onComplete = (event, callback) => {
      try {
        if (cleanup)
          document.head.removeChild(script);
        callback(event);
      } catch (error) {
        reject(error);
      }
    };

    script.type  = 'text/javascript';
    script.async = true;

    script.onerror = event => onComplete(event, reject);
    script.onload  = event => onComplete(event, resolve);

    document.head.appendChild(script);

    script.src = path;
  });
}