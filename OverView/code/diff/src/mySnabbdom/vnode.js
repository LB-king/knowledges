// vnode参数
export default function (
  sel,
  data = {},
  children = undefined,
  text = undefined,
  elm = undefined
) {
  return { sel, data, children, text, elm }
}
