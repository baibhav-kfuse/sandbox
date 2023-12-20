
function getSelectorsByCssProperty(cssJson) {
    const selectorsByStyle = {};

    for (const [k, v] of Object.entries(cssJson)) {
      for (const [property, value] of Object.entries(v)) {
        const id = `${property}:${value}`;
        selectorsByStyle[id] ||= [];
        selectorsByStyle[id].push(k);
      }
    }

    return selectorsByStyle
}

module.exports = {getSelectorsByCssProperty}