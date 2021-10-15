;(() => {
  /* 定义函数或者类的时候，如果遇到类型不明确就可以使用泛型
   */
  function fn<T>(a: T): T {
    return a
  }

  //1.直接调用具有泛型的函数
  console.log(fn(20)) //ts自动类型推断
  console.log(fn<string>('泛型'))
  //2.泛型可以同时指定多个
  function fn2<T, K>(a: T, b: K): T {
    console.log(b)
    return a
  }

  console.log(fn2<string, number>('kg', 8))
  //3.引用接口
  interface Inter {
    length: number
  }

  function fn3<T extends Inter>(a: T): number {
    return a.length
  }

  console.log(fn3('joke'))
})()
