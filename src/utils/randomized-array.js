import random from "./random.js";
import privates from "./privates.js";

const _ = privates();

export default class RandomizedArray {
  constructor(array) {
    _(this).array = array;
    _(this).arraySlice = array;
  }

  next() {
    const index = random.int(_(this).arraySlice.length - 1);
    const result = _(this).arraySlice[index];

    _(this).arraySlice = _(this).array.filter(x => x !== result);

    return result;
  }
}
