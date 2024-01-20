* [高频前端面试题汇总之HTML篇](https://juejin.cn/post/6905294475539513352?searchId=202401191019557F9BEFE5D3AB8917F361)
1. src和href的区别
* src和href都是用来引用外部的资源,它们的区别如下:
    - src  script img
    - href  link (css)   
2. HTML语义化的理解
* 语义化是指根据内容的结构化(内容语义化),选择合适的标签(代码语义化) 即 就是用正确的标签做正确的事情。
    - 对机器友好 SEO 读屏软件 根据文章可以自动生成目录。
    -  对开发者友好 使用语义类标签增强了可读性,结构更加清晰。
    -  header  nav  section(区块 有语义化的div) main  article  aside footer   
3. doctype 文档类型 的作用
* 告诉浏览器 解析器 应该以什么样(html xhtml)的文档类型定义来解析文档,不同的渲染模式会影响浏览器对css代码甚至JS脚本的解析。它必须声明在html文档的第一行。
* document.compatMode
    - 标准模式  默认模式 浏览器使用W3C的标准解析渲染页面。 在标准模式中,浏览器以其支持的最高标准呈现页面。 <!DOCTYPE html>
    - 怪异模式 浏览器使用自己的怪异模式解析渲染页面。 在怪异模式中 页面以一种比较宽松的向后兼容的方式显示
4. script标签中defer和async的区别
    - 如果没有 defer async属性 浏览器会立即加载并执行相应脚本。 它不会等待后续加载的文档元素,读取到就会开始加载和执行,这样就阻塞了后续文档的加载。
    - defer 和 async 属性都是去 异步加载外部的JS脚本文件,它们都不会阻塞页面的解析。
        - 执行顺序: 多个带 async属性的标签,不能保证加载的顺序；  多个带 defer属性的标签 按照加载顺序执行
        - 脚本是否并行执行 async属性,表示后续文档的加载和执行与js脚本的加载和执行是并行进行的    defer属性 加载后续文档的过程和js脚本的加载(此时仅加载不执行)是 并行进行的， js脚本需要等到文档所有元素解析完成之后才执行, DOMContentLoaded事件触发执行之前。
6. img的srcset属性的作用
* 响应式页面中经常用到的根据屏幕密度设置不同的图片。 这时就用到了 img 标签的 srcset属性。 srcset属性用于设置不同屏幕密度下,img会自动加载不同的图片
* <img src="image-128.png" srcset="image-256.png 2x" />
* 使用上面的代码，就能实现在屏幕密度为1x的情况下加载image-128.png, 屏幕密度为2x时加载image-256.png
* <img src="image-128.png"
     srcset="image-128.png 128w, image-256.png 256w, image-512.png 512w"
     sizes="(max-width: 360px) 340px, 128px" />
7. 对requestAnimationframe的理解     
    - window.requestAnimationFrame(callback) 告诉浏览器一一 你希望执行一个动画 并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数,该回调函数会在浏览器下一次重绘之前执行。
    - cancelAnimationFrame() 来取消执行动画 该方法接受一个参数  requestAnimationFrame默认返回的id 只需要传入这个id就可以取消动画了。

   
8. 常见的图片格式及使用场景

9. 布局

10. viewport
 * <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
 * 一般来说，设计师会根据设备的屏幕尺寸和像素密度来设计页面，例如 iPhone 6/7/8 的设计稿尺寸为 750px*1334px，像素密度为 2
 ```
// postcss.config.js

module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8'],
    },
    'postcss-px-to-viewport': {
      unitToConvert: 'px', // 需要转换的单位，默认为"px"
      viewportWidth: 750, // 设计稿的视口宽度
      exclude: [/node_modules/], // 解决vant375,设计稿750问题。忽略某些文件夹下的文件或特定文件
      unitPrecision: 5, // 单位转换后保留的精度
      propList: ['*'], // 能转化为vw的属性列表
      viewportUnit: 'vw', // 希望使用的视口单位
      fontViewportUnit: 'vw', // 字体使用的视口单位
      selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
      minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
      mediaQuery: false, // 媒体查询里的单位是否需要转换单位
      replace: true, //  是否直接更换属性值，而不添加备用属性
      landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
      landscapeUnit: 'vw', // 横屏时使用的单位
      landscapeWidth: 1125 // 横屏时使用的视口宽度
    }
  },
};


 ```

 11. px % em rem vw/vh 区别
 - px 基本单位 绝对单位 (其他的都是相对单位)
 - % 相对于父元素的宽度比例
 - em 相对于当前元素
 - rem 相对根元素
 - vw 屏幕宽度的1%
 - vh 屏幕高度的1%
 - vmin两者的最小值 vmax两者的最大值
 12. 居中的方法
   - 水平居中
        - 内联元素 text-align:center
        - 块级元素  margin:0 auto;
        - 多个块级元素  1. 父元素 display:block; 子元素 dispaly:inline-block; 2.  display:flex; justify-content:center;
        - display:flex  justify-content:center
   - 垂直居中
        - padding-top:30px; padding-bottom:30px;
        - height:120px line-height:120px; 

   - 水平垂直居中 
        - flex
        - transform margin         
 13. 盒子模型