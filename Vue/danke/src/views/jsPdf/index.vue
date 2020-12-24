<template>
  <div class="js-pdf">
    <div id="main" ref="imgDom">
      <h3>数据质量报告</h3>
      <!-- <img v-for="(item, index) in arr" :key="index" :src="item" alt=""> -->
    </div>
    <el-button @click="toPdf()">点击导出</el-button>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import img1 from '@/assets/1.jpg'
import img2 from '@/assets/2.jpg'
import img3 from '@/assets/3.jpg'
export default {
  name: 'js-pdf',
  data() {
    return {
      arr: [img1, img2, img3]
    }
  },
  methods: {
    toPdf() {
      window.pageYOffset = 0
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0

      html2canvas(this.$refs.imgDom, {
        allowTaint: true,
        scale: 2,
        dpi: 182 //导出图片清晰度
      }).then(function(canvas) {
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        //一页pdf显示html页面生成的canvas高度;
        let pageHeight = (contentWidth / 595.28) * 841.89
        //未生成pdf的html页面高度
        let leftHeight = contentHeight
        //页面偏移
        let position = 0
        let imgWidth = 595.28
        let imgHeight = (595.28 / contentWidth) * contentHeight
        //返回图片dataURL，参数：图片格式和清晰度(0-1)
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        //方向默认竖直，尺寸ponits，格式 a4纸 [595.28,841.89]
        let PDF = new JsPDF('', 'pt', 'a4')
        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
          //addImage将图片添加到pdf中
          //addImage中间两个参数控制x、y边距，
          //后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            //避免添加空白页
            if (leftHeight > 0) {
              //addPage()添加pdf页数
              PDF.addPage()
            }
          }
        }
        //保存名称
        PDF.save('计算结果.pdf')
      })
    }
  }
}
</script>

<style lang="scss">
#main {
  background-color: #cccccc;
  width: 600px;
  margin: 0 auto;
  text-align: center;
  h3 {
    height: 60px;
    line-height: 60px;
  }
}
</style>
