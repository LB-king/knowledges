### 1.安装

```shell
npm install typescript -g
```

检验是否安装成功

```shell
tsc -v
```

**TypeScripe**是**JavaScript**的一个超集，主要提供了系统类型和对ES6的支持。

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

- 元组类型(tuple)

  ```typescript
  let arr2: [string, number, boolean] = ['dr', 23, false]
  ```

- 枚举类型(enum)

  ```typescript
  enum Flag {success=1,fail = 0}
  var f:Flag = Flag.fail
  console.log(f) //0
  
  enum Color {red, blue, orange
  }
  console.log(Color.blue) //没有赋值的话，打印出来的是索引值1
  ```

  

- 任意类型(any)

- null和undefined

- void类型

- never类型











