### 动画

```css
@keyframes move {
  0% {
    margin-left: 0;
    transform: rotate(0);
  }
  50% {
    margin-left: 100px;
    transform: rotate(180deg);
  }
  100% {
    margin-left: 0;
    tansform: rotate(360deg);
  }
}
.animate-box {
  animation: move 5s infinite;
}
/*transition*/
.box {
  width: 200px;
  transition: all 0.3s linear;
  /* 多个属性可以用逗号,隔开 */
  transition: color 0.3s ease, height 0.4s;
}
.box:hover {
  width: 220px;
}
```

### less

less 的变量用 @符号定义，如： @primary-color

```less
.mix-style {
  height: 10px;
}
.main {
  .mix-style;
}
```

### scss

scss 的变量用$符号定义，如： $color

```scss
$--color-primary: #bfc;
$blue: #342157;
div {
  color: $blue;
}
```

@mixin 的用法：

```scss
@mixin public {
  width: 50px;
  height: 50px;
  background: red;
}
/* 引用的地方 */
div {
  @include public;
}
/* 携带参数 */
@mixin demo($width, $height, $bg) {
  width: $width;
  height: $height;
  background: $bg;
}
/* 引用的地方 */
div {
  @include demo(50px, 50px, rgb(255, 0, 0)); /*传值*/
}
/* 循环生成类名 */
// #{$i}用于接收变量
@for $i from 1 through 10 {
  .p-#{$i} {
    padding: ($i * 5px);
  }

  .p-l-#{$i} {
    padding-left: ($i * 5px);
  }

  .p-r-#{$i} {
    padding-right: ($i * 5px);
  }

  .p-t-#{$i} {
    padding-top: ($i * 5px);
  }

  .p-b-#{$i} {
    padding-bottom: ($i * 5px);
  }
}
```
