export const scrollToError = errors => {
  try {
    Object.keys(errors).forEach(name => {
      if (!!errors[name]) {
        throw name;
      }
    });
  } catch (name) {
    if (typeof name === "string" && name.length > 0) {
      const input = document.querySelector(`[name="${name}"]`);
      if (input) {
        input.scrollIntoView({ block: "start", behavior: "smooth" });
        setTimeout(() => input.focus(), 300);
      }
    }
  }
};
