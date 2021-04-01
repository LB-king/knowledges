### 动画

```css
@keyframes move{
  0% {
    margin-left: 0;
    transform: rotate(0);
  }
  50% {
    margin-left: 100px;
    transform: rotate(180deg)
  }
  100% {
    margin-left: 0;
    tansform: rotate(360deg)
  }
}
.animate-box {
  animation: move 5s infinite;
}
/*transition*/
.box {
  width: 200px;
  transition: all .3s linear;
}
.box:hover {
  width: 220px;
}
```

### less

```less
.mix-style {
	height: 10px;
}
.main {
	.mix-style;
}
```

