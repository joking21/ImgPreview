# 图片查看，放大缩小旋转，上一张下一张
## 参考链接 https://github.com/fengyuanchen/viewerjs

## 安装
```javascript
 npm install dww-img-preview  --save
```
## 调用方式 

* upload图片回显
```javascript
import React from 'react';
import { Upload } from 'antd';
import { ImagePreview } from 'dww-img-preview';

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: '图片地址'
      },
      {
        uid: '2',
        name: 'image.png',
        status: 'done',
        url: '图片地址'
      }
    ]
  };

  handleCancel = () => {
    this.setState({
      previewVisible: false,
    })
  };
  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    return (
      <div className="clearfix">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
        </Upload>
        {
          previewVisible && 
          <ImagePreview
            imageList={[previewImage]} // 必须，图片url，数组
            callBack={this.handleCancel} // 必须 关闭事件 把previewVisible修改为false
            isClickShow={true}  // 必须
            showIndex={0}  // 非必须  当前展示的图片index 
            options={options} // 非必须
          />
        }
      </div>
    );
  }
}

export default PicturesWall;

```

* 图片预览
```javascript
          <ImagePreview
            imageList={[previewImage]} // 必须 图片url，数组
            imgBgColor={'#f5f7f9'} // 非必须  图片背景颜色
            callBack={this.handleCancel} // 非必须  关闭事件
            options={options} // 非必须
            previewClass={} // 非必须，，样式可以修改ul li img得布局
            showIndex={0}  // 非必须  当前展示的图片index 
            width={200} // 非必须 图片宽度
            height={200}  // 非必须  图片高度
          />
```

## option配置参数

* option中回调函数当前this得作用域即viewer本身； this.viewer；
* 调用一个viewer例如初始化图片放大，旋转，一般使用viewed改变图片初始化得大小；

```javascript
    option{
        inline: false, //	布尔值	启用 inline 模式
        button: true, //	布尔值	显示右上角关闭按钮（jQuery 版本无效）
        navbar: true ,// 	布尔值/整型	true	显示缩略图导航
        title:	true, // 布尔值/整型	显示当前图片的标题（现实 alt 属性及图片尺寸）
        toolbar: true //	布尔值/整型		显示工具栏
        tooltip: true,  // 布尔值		显示缩放百分比
        movable: true, //	布尔值		图片是否可移动
        zoomable: true, //	布尔值		图片是否可缩放
        rotatable: true, //	布尔值		图片是否可旋转
        scalable: true, //	布尔值		图片是否可翻转
        transition: true, //	布尔值		使用 CSS3 过度
        fullscreen: true, //	布尔值		播放时是否全屏
        keyboard: true, //	布尔值		是否支持键盘
        interval: 5000, //	整型		播放间隔，单位为毫秒
        zoomRatio:0.1, //	浮点型		鼠标滚动时的缩放比例
        minZoomRatio:	0.01, //	浮点型	最小缩放比例
        maxZoomRatio: 100, //	数字		最大缩放比例
        zIndex: 2015 //	数字		设置图片查看器 modal 模式时的 z-index
        zIndexInline:	0 //	数字	设置图片查看器 inline 模式时的 z-index
        view(){}, //当观看者开始显示（查看）图像时，此事件将触发。
        viewed() {  // 当观看者显示（查看）图像时，该事件触发。
            this.viewer.zoomTo(1).rotateTo(180);
          },
        show(){}, // 当观察者模式准备使用时
        shown(){},// 当观察这模式使用时
        hide(){}, // 开始隐藏时回调函数
        hidden(){}, // 隐藏时回调函数
        zoom(){}, //开始缩大放小时粗放
        zoomed(){}, //当观看者缩放（放入或缩小）图像时，此事件将触发。
    }
```

