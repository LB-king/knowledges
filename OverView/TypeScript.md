### 1.安装

```shell
npm install typescript -g
```

检验是否安装成功

```shell
tsc -v
```

**TypeScript*是**JavaScript**的一个超集，主要提供了系统类型和对ES6的支持。

- TS增加了代码的可读性和可维护性
  - 类型系统实际上是最好的文档，大部分的函数看看类型的定义就知道如何使用了
  - 可以在编译阶段就发现大部分错误，这要比在运行时出错好
  - 增强了编辑器的IDE功能，包括代码补全、接口提示、跳转到定义、重构等
- TS非常包容
  - ts是js的超集，`.js`文件可以直接重命名为`.ts`
  - 即使不显式的定义类型，也能够自动做出`类型推论`
  - 可以定义从简单到复杂的几乎一切类型
  - 即使ts编译报错，也可以生成js文件
  - 兼容第三方库

编译一个ts文件

```shell
tsc hello.ts
```

我们约定使用TypeScript编写的文件以`.ts`结尾，用TypeScript编写React时，以`.tsx`结尾

### 2.使用

新建hello.ts文件，写入以下代码，执行之

```typescript
function sayHello(person:string){
    return 'hello,' + person
}
console.log(sayHello('kobe'))
```

然后执行命令

```powershell
tsc hello.ts
```

这时会生成hello.js

```javascript
function sayHello(person) {
    return 'hello,' + person;
}
console.log(sayHello('kobe'));
```

ps:vscode会出现'函数变量名重复'的警告

解决方案：在项目根目录新建一个tsconfig.json,即使是空的也可以避免这个警告

TypeScript中，使用`:`指定变量的类型，`:`的前后有没有空格都可以。

上述例子中，我们用`:`指定`person`参数类型为`string`。但是编译为js之后，并没有检查的代码被插入进来。

**ts只会进行静态检查，如果发现错误，编译的时候就会报错。**

**即使报错，还是会生成编译结果**

在报错的时候如果要终止js文件的生成，可以在tsconfig.json中配置`noEmitOnError`即可

### 3.配置

```shell
tsc --init
#会生成一个tsconfig.json文件
{
	"outDir": "./js" #修改编译后的js存放目录
}
```

vscode设置自动编译：

终端->运行任务->tsc监视

### 4.数据类型

let a:number | string (联合类型)

ts为了使代码编写的更规范，更有利于维护，增加了类型校验，在ts中主要给我们新增了以下数据类型：

- 布尔类型(boolean)

  ```typescript
  var flag: boolean = true
  flag = false
  ```

- 数字类型(number)

  ```typescript
  var n:number = 11.2
  ```

- 字符串类型(string)

  ```typescript
  var str:string = 'ui'
  ```

- 数组类型(array)

  第一种定义数组的方式：

  ```typescript
  let arr:number[] = [1,2,3,'j']
  ```

  第二种定义数组的方式：

  ```typescript
  let arr:Array<number> = [1, 2, 3]
  ```

- 元组类型(tuple)-固定长度的数组

  ```typescript
  let arr2: [string, number, boolean] = ['dr', 23, false]
  ```

- 枚举类型(enum)

  ```typescript
  enum Flag {success=1,fail = 0}
  var f:Flag = Flag.fail
  console.log(f) //0
  
  enum Color {red, blue, orange}
  console.log(Color.blue) //没有赋值的话，打印出来的是索引值1
  ```

- 任意类型(any)

  ```typescript
  let a //隐式any
  var oBox:any = document.querySelector('box')
  ```

- unknown

  > 实际上就是一个类型安全的any
  >
  > unknown类型的变量，不能直接赋值给其他变量

  ```typescript
  let a:unknown
  let b:string
  a = 99
  a = 'ui'
  b = a
  //会报错
  let a:any
  let b:string
  a = 99
  a = 'ui'
  b = a
  //不报错，a直接祸害b了
  ```

- null和undefined

  其他(never)类型的子类型

  ```typescript
  var num:number | undefined | null
  console.log(num)
  ```

- void类型

  表示没有任何类型，一般用于定义方法的时候方法没有返回值

  ```typescript
  function Void():void {
    console.log('void')
  }
  Void()
  ```

  有返回值

  ```typescript
  function Void():number {
    console.log('void')
    return 2 //有返回值的情况，并且类型是number
  }
  Void()
  ```

- never类型

  ```typescript
  function fn():never {
    throw new Error('报错')
  }
  //永远不会返回结果
  ```

- 类型断言

  ```typescript
  //语法：
  变量 as 类型
  <类型>变量
  //类型断言,可以用来告诉解析器变量的实际类型
  b = a as string
  b = <string>a
  ```

- 未知的属性

  ```typescript
  // 除了name属性，其他的属性随意
  var b: { name: string; [propName: string]: unknown }
  b = { name: 'b', age: 18, favo: 'play' }
  
  //1.对象属性限制
  var a: { name: string; age?: number } //结构要一模一杨
  a = { name: 'tom', age: 9 }
  //2.name之外的属性不做限制
  var b: { name: string; [propName: string]: unknown }
  b = { name: 'b', age: 18, favo: 'play' }
  //3.函数限制
  //设置函数的类型声明
  //语法：
  // (形参:类型,形参:类型...) => 返回值
  var c: (a: number, b: number) => number
  c = (m: number, n: number) => m + n
  ```

- &连接符

  ```velocity
  //连接符
  var user: {name: string} & {age: number}
  user = {
    name: 'ko',
    age: 100
  }
  ```

- 类型的别名

  ```typescript
  type myType = 1 | 2 | 3
  let j: myType
  let k: myType
  ```

  

### 5.函数

```typescript
function n():number {
  return 2233
}

//正确写法
function getInfo(name:string, age:number):string {
  return `${name}---${age}`
}
console.log(getInfo('KG',66))

//可选参数，后面加一个?,记得放在必选参数后面
function getInfo(name:string, age?:number):string {
  return `${name}---${age}`
}

//默认参数
function getInfo(name:string, age:number = 88):string {
  return `${name}---${age}`
}

```

### 6.编译配置

编译当前文件夹下的ts，需要配合`tsconfig.json`使用

```shell
tsc -w
```

tsconfig.json

```json
{
	"outDir": "./js", #修改编译后的js存放目录
  "include": [
  	"./src/**/*" #指定需要编译的文件
  ],
	"exclude": [
    "./src/test/**/*"
    #默认值：["node_modules","bower_components","jsonp_packages"]
  ]
}
```

配置项：

- include(定义要被编译的文件目录)

  > **表示任意目录
  >
  > *表示任意文件

- exclude(定义需要排除在外的目录)

- extend(定义被继承的配置文件)

  ```json
  {
    "extends": "./config/base"
  }
  ```

- files(指定被编译的文件)

  ```json
  {
    "files": [
      "a.ts",
      "b.ts"
    ]
  }
  ```

- compilerOptions(常用配置&最重要的选项)

  ```json
  {
    "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "outDir": "./js", 
      outFile: "./dist/bundle.js"
    }
  }
  ```

  - target:设置ts代码编译的目标版本

    > 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'

  - module(指定要使用的模块化的规范)

    > 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'

  - lib(指定代码运行时所包含的库)

  - outDir(输出的文件存放目录)

  - outFile(将代码合并为一个文件)-模块化需要module是system amd

