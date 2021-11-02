import observe from '../js/observe'
import Watcher from '../js/Watcher'
import {def} from '../utils/index'
export const compileUtil = {
  getValue(expr, vm) {
    return expr
      .trim()
      .split('.')
      .reduce((acc, cur) => {
        return acc[cur]
      }, vm.$data)
  },
  setValue(expr, vm, formValue) {
    expr
      .trim()
      .split('.')
      .reduce((acc, cur) => {
        acc[cur] = formValue
      }, vm.$data)
  },
  //将对象转成便签可识别的属性
  /* 
  {color:'red', fontSize: '20px'} => "color: red; fontSize: 20px"
  */
  transObj2Str(obj) {
    let arr = []
    Object.entries(obj).forEach(([key, value]) => {
      arr.push(`${key}: ${value}`)
    })
    return arr.join(';')
  },
  text(node, expr, vm) {
    let value
    if (expr.indexOf('{{') > -1) {
      value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
        new Watcher(vm, args[1], () => {
          //注意：{{name}} --- {{age}} 这种情况
          let n = args[3].replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getValue(args[1], vm)
          })
          this.updater.textUpdater(node, n)
        })
        return this.getValue(args[1], vm)
      })
    } else {
      value = this.getValue(expr, vm)
      new Watcher(vm, expr, () => {
        this.updater.textUpdater(node, this.getValue(expr, vm))
      })
    }

    this.updater.textUpdater(node, value)
  },
  html(node, expr, vm) {
    const value = this.getValue(expr, vm)
    new Watcher(vm, expr, (newValue) => {
      this.updater.htmlUpdater(node, newValue)
    })
    this.updater.htmlUpdater(node, value)
  },
  model(node, expr, vm) {
    const value = this.getValue(expr, vm)
    //数据->视图
    new Watcher(vm, expr, (newValue) => {
      this.updater.modelUpdater(node, newValue)
    })
    //视图->数据
    node.addEventListener('input', (e) => {
      this.setValue(expr, vm, e.target.value)
    })
    this.updater.modelUpdater(node, value)
  },
  on(node, expr, vm, eventName) {
    let fn = vm.$options.methods.click
    // console.log(fn, eventName)
    node.addEventListener(eventName, fn.bind(vm), false)
  },
  bind(node, expr, vm, attrName) {
    // console.log(attrName, vm.$data.attr)
    node.setAttribute(attrName, this.transObj2Str(vm.$data[expr]))
  },
  //使用:bind   :style=xxxx
  bindByColon(node, expr, vm, attrName) {
    // console.log(this.transObj2Str(vm.$data[expr]))  //color: blue;fontSize: 20px
    node.setAttribute(attrName, this.transObj2Str(vm.$data[expr]))
  },

  /* 
  至此，实现v-html  v-text  v-model   v-bind  v-on:click  @click  :attrName 
  的模板翻译工作
  */
  //存储更新函数
  updater: {
    //v-text
    textUpdater(node, value) {
      node.textContent = value
    },
    //v-html
    htmlUpdater(node, value) {
      node.innerHTML = value
    },
    //v-model
    modelUpdater(node, value) {
      node.value = value
    }
  }
}

export const Vue = class {
  constructor(options) {
    // console.log('实例化vue啦~~')
    this.$el = options.el
    this.$data = options.data()
    this.$options = options
    if (this.$el) {
      //1.实现一个数据观察者
      observe(this.$data)
      //2.实现一个指令解析器
      new Compile(this.$el, this)
      this.proxyData(this.$data)
    }
  }
  //TODO
  proxyData(data) {
    for (let i in data) {
      def(this, i, data[i] ,true)
      // Object.defineProperty(this, i, {
      //   // configurable: true,
      //   // writable: true,
      //   get() {
        
      //     return data[i]
      //   },
      //   set(newValue) {
      //     data[i] = newValue
      //   }
      // })
    }
  }
}

//定义解析器的类
class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    //1.获取文档碎片对象,放入内存中，减少页面的重绘和回流
    const fragment = this.html2Fragment(this.el)
    //2.编译模板
    this.compile(fragment)
    //3.追加内存的文档到页面
    this.el.appendChild(fragment)
  }
  //3.编译模板
  compile(fragment) {
    //1.获取子节点
    let childNodes = [...fragment.childNodes]
    childNodes.forEach((child) => {
      //如果是元素节点(非text),就需要编译节点
      if (this.isElementNode(child)) {
        // console.log('元素节点', child)
        this.compileElement(child)
      } else {
        //文本节点
        // console.log('文本节点', child)
        this.compileText(child)
      }
      if (child.childNodes && child.childNodes.length) {
        this.compile(child)
      }
    })
  }
  //编译元素
  compileElement(node) {
    const attrs = [...node.attributes]
    attrs.forEach((attr) => {
      let { name, value } = attr //结构赋值元素的属性
      if (this.isDirective(name)) {
        //是指令v-html  v-text  v-model v-on:click
        let [, directive] = name.split('-') //html  text model on:click
        let [dirName, eventName] = directive.split(':') // text html model on
        compileUtil[dirName](node, value, this.vm, eventName)
        //移除元素上的v-指令
        node.removeAttribute(`v-${directive}`)
      } else if (this.isAtEvent(name)) {
        //判断是否是@click这样绑定的参数
        let [, eventName] = name.split('@')
        compileUtil['on'](node, value, this.vm, eventName)
        //移除元素上的@click属性
        node.removeAttribute(`@${eventName}`)
      } else if (this.isColonAttr(name)) {
        let [, attrName] = name.split(':')
        compileUtil['bindByColon'](node, value, this.vm, attrName)
      }
    })
  }
  //判断是否是:开头绑定的属性
  isColonAttr(attrName) {
    return attrName.startsWith(':')
  }
  //判断是否是@click这样的事件
  isAtEvent(attrName) {
    return attrName.indexOf('@') > -1
  }
  //3.判断一个属性名是否是指令
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
  //编译文本
  compileText(node) {
    let content = node.textContent
    if (/\{\{(.+?)\}\}/.test(content)) {
      compileUtil['text'](node, content, this.vm)
    }
  }
  //2.html转化为文档碎片
  html2Fragment(el) {
    let frag = document.createDocumentFragment()
    let firstChild
    while ((firstChild = el.firstChild)) {
      frag.appendChild(firstChild)
    }
    return frag
  }
  //1.判断节点是不是元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }
}
