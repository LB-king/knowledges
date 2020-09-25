export function offset(target) {
  let acc = {
    top: target.offsetTop,
    left: target.offsetLeft
  };
  let oP = target.offsetParent;
  while (oP != null) {
    acc.top += oP.offsetTop;
    acc.left += oP.offsetLeft;
    oP = oP.offsetParent;
  }
  return acc;
}
export function offsetLeft(target) {
  return offset(target).left;
}
export function offsetTop(target) {
  return offset(target).top;
}

export function rect(target) {
  let targetStyles = window.getComputedStyle(target);
  let styleMap = ["width", "height", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth"].map(key => {
    return { [key]: parseInt(targetStyles[key]) || 0 }
  }).reduce((acc, cur) => {
    return { ...acc, ...cur };
  });

  if (targetStyles.boxSizing === "border-box") {
    styleMap.innerWidth = styleMap.width - styleMap.paddingLeft - styleMap.paddingRight - styleMap.borderLeftWidth - styleMap.borderRightWidth;
    styleMap.innerHeight = styleMap.height - styleMap.paddingTop - styleMap.paddingBottom - styleMap.borderTopWidth - styleMap.borderBottomWidth;
  } else {
    styleMap.innerWidth = styleMap.width;
    styleMap.innerHeight = styleMap.height;
  }
  return styleMap;
}