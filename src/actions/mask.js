import IMask from "imask";

function fireEvent(el, name, detail) {
  const e = new CustomEvent(name, { detail });
  el.dispatchEvent(e);
}

export default function(node, options) {
  if (!options) return;

  let mask;

  function init(options) {
    if (mask) return mask.updateOptions(options);
    mask = new IMask(node, options)
      .on("accept", () => fireEvent(node, "accept", mask))
      .on("complete", () => fireEvent(node, "complete", mask));
  }

  function destroy() {
    mask && mask.destroy();
  }

  init(options);

  return {
    update(options) {
      options ? init(options) : destroy();
    },
    destroy
  };
}
