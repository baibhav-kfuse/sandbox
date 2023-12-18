function parseCss(rawCss) {
  const styleObjectBySelector = {};
  let currentSelector = '';

  const addPropertiesToSelector = (selector, properties) => {
    if (!styleObjectBySelector[selector]) {
      styleObjectBySelector[selector] = {};
    }

    properties.split(';').forEach(property => {
      const [key, value] = property.split(':');
      if (key && value) {
        styleObjectBySelector[selector][key.trim()] = value.trim();
      }
    });
  };

  rawCss.split('}').forEach(rule => {
    const parts = rule.split('{');
    if (parts.length === 2) {
      currentSelector = parts[0].trim();
      const propertyBuffer = parts[1].trim();
      addPropertiesToSelector(currentSelector, propertyBuffer);
    }
  });

  return styleObjectBySelector;
}

module.exports = { parseCss };
