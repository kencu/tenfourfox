/* Any copyright is dedicated to the Public Domain.
   http://creativecommons.org/publicdomain/zero/1.0/ */

/**
 * Tests that the profiler's tree view sorts inverted call trees by
 * "self cost" and not "total cost".
 */

var { CATEGORY_MASK } = require("devtools/client/performance/modules/global");

var test = Task.async(function*() {
  let { ThreadNode } = require("devtools/client/performance/modules/logic/tree-model");
  let { CallView } = require("devtools/client/performance/modules/widgets/tree-view");

  let threadNode = new ThreadNode(gSamples, { invertTree: true, startTime: 0, endTime: 10 });
  let treeRoot = new CallView({ frame: threadNode, inverted: true, autoExpandDepth: 1 });

  let container = document.createElement("vbox");
  treeRoot.attachTo(container);

  is(treeRoot.getChild(0).frame.location, "B",
    "The tree root's first child is the `B` function.");
  is(treeRoot.getChild(1).frame.location, "A",
    "The tree root's second child is the `A` function.");

  finish();
});

var gSamples = synthesizeProfileForTest([{
  time: 1,
  frames: [
    { location: "(root)" },
    { location: "A" },
    { location: "B" },
  ]
}, {
  time: 2,
  frames: [
    { location: "(root)" },
    { location: "A" },
    { location: "B" }
  ]
}, {
  time: 3,
  frames: [
    { location: "(root)" },
    { location: "A" },
    { location: "B" },
  ]
}, {
  time: 4,
  frames: [
    { location: "(root)" },
    { location: "A" }
  ]
}]);
