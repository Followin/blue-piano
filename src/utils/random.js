export default {
  int(firstArg, secondArg) {
    let max, min;
    if (!secondArg) {
      min = 0;
      max = firstArg;
    } else {
      min = firstArg;
      max = secondArg;
    }

    return Math.floor(Math.random() * Math.floor(max)) + min;
  },
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  }
};
