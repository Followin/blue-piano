export default function() {
  const weakMap = new WeakMap();

  const storeAccessor = function(key) {
    if (typeof key !== "object") {
      return;
    }

    let privateObject = weakMap.get(key);

    if (!privateObject) {
      Object.keys(storeAccessor).forEach(function(methodName) {
        if (typeof storeAccessor[methodName] === "function") {
          const fn = storeAccessor[methodName];

          storeAccessor[methodName] = function() {
            fn.apply(this.__instance__, arguments);
          };

          storeAccessor[methodName].prototype = Object.create(fn.prototype);
        }
      });

      privateObject = Object.create(storeAccessor || Object.prototype);
      privateObject.__instance__ = key;
      weakMap.set(key, privateObject);
    }

    return privateObject;
  };

  return storeAccessor;
}
