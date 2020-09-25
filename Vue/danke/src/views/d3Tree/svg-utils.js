let nameSpace = "http://www.w3.org/2000/svg";
let div = document.createElement("div");
let svg = document.createElementNS(nameSpace, "svg");
svg.setAttribute("width", 0);
svg.setAttribute("height", 0);
div.append(svg);
div.style.overflow = "hidden";
div.style.position = "fixed";
div.style.top = "100%";
div.style.zIndex = -1;
document.body.appendChild(div);

let _cache = {};
export function measureText(data, identity = "id") {
  // 唯一标识符可选
  if (data[identity] in _cache) return _cache[data[identity]];
  let text = createRichText(data);
  svg.append(text);
  let { width, height } = text.getBBox();
  _cache[data[identity]] = { width, height };
  text.remove();
  return { width, height }
}

export function createRichText(t) {
  var text = document.createElementNS(nameSpace, "text");
  text.setAttribute("stroke-width", 0);
  if (t.richNames) {
    for (let i = 0; i < t.richNames.length; i++) {
      text.append(createText(t.richNames[i]))
    }
  } else {
    text.textContent = t.name;
  }
  text.setAttribute("font-size", t.settings.fontSize);
  text.setAttribute("font-weight", t.settings.fontWeight);
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("dominant-baseline", "middle");
  return text;
}

export function createText(obj) {
  let tspan = document.createElementNS(nameSpace, "tspan");
  let { props, text } = obj;
  if (props) {
    Object.keys(props).forEach(key => {
      tspan.setAttribute(key, props[key]);
    });
  }
  tspan.textContent = text;
  return tspan;
}