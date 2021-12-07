// vnode参数
export default function (
  sel,
  data = {},
  children = undefined,
  text = undefined,
  elm = undefined
) {
  let key = data.key
  return { sel, data, children, text, elm, key }
}
