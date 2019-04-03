import makeShadow from 'shadow-callbag';

const share = source => {
  let sinks = [];
  let sourceTalkback;

  return function shared(start, sink) {
    if (start !== 0) return;
    sinks.push(sink);

    let shadow;
    const talkback = (t, d) => {
      if (t === 2) {
        const i = sinks.indexOf(sink);
        if (i > -1) sinks.splice(i, 1);
        if (!sinks.length) sourceTalkback(2);
      } else {
        sourceTalkback(t, d);
      }
    };

    if (sinks.length === 1) {
      source(0, (t, d, s) => {
        if (t === 0) {
          sourceTalkback = d;
          shadow = makeShadow('share', s);
          sink(0, talkback, shadow);
        } else for (let _sink of sinks.slice(0)) _sink(t, d);
        if (t === 2) sinks = [];
      });
      return;
    }

    shadow = makeShadow('share');
    sink(0, talkback, share);
  };
};

export default share;
