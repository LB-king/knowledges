### CSS

#### 1.清除浮动

> 当所有的子元素浮动的时候,且父元素没有设置高度，这时候父元素就会产生高度坍塌

解决方案：

1. 给父元素定义高度

   > 不灵活

2. 父元素设置 overflow: hidden|auto|overlay等

3. 在浮动元素后面添加一个块级元素，并设置高度0

   ```css
   .empty {
     clear: both;
     height: 0;
     overflow: hidden;
   }
   ```

   简单快速、代码少

   增加了一个空标签，不利于页面优化

4. 给坍塌的元素添加伪类

   ```css
   .box:after {
     clear: both;
     content: '';
     display: block;
     height: 0;
     overflow: hidden;
     visibility: hidden;
   }
   ```

   最常用的方法

#### 2.选择器权重

#### 3.定位的几种方式

### H5

### Javascript

### TypeScript

### Vue2

### Vue3

### React

### Webpack