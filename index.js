import React from "react"
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.min.css';
import noPicture from './noPicture.png';
import imgCracked from './imgCracked.png';

export default class DimagePreview extends React.Component {
  constructor(props) {
    super(props)
    this.Viewer = null;
    this.container = null;
  }
  componentDidMount() {
    const { imageList, options, isClickShow, showIndex, callBack } = this.props;
    const isOr = imageList.length > 1 ? 1 : 0;
    const currentOptions = {
      title: false,
      navbar: false,
      zIndex: 9000,
      zIndexInline: 9000,
      toolbar: {
        zoomIn: 1,
        zoomOut: 1,
        oneToOne: 0,
        reset: 0,
        prev: isOr,
        play: {
          show: 0,
          size: 'large',
        },
        next: isOr,
        rotateLeft: 1,
        rotateRight: 1,
        flipHorizontal: 0,
        flipVertical: 0,
      },
      hide: () => {
        callBack && callBack();
      },
      ...options
    }
    this.Viewer = new Viewer(this.container, currentOptions);
    if(isClickShow) this.Viewer.view(showIndex || 0);
  }

  componentWillUnmount(){
    this.Viewer && this.Viewer.destroy();
  }
  render() {
    const { imageList, width, height, isClickShow, previewClass, imgBgColor, imgNameLists = [] } = this.props;
    return (
      <ul ref={(container) => { this.container = container }} style={{display: !isClickShow ? 'block' : 'none'}} className={previewClass}>
        {imageList.map((item, index) => (
          <li style={{display: 'inline-block'}} key={index}>
            <img src={item || noPicture}
              alt=""
              style={{width:`${width || 200}px`, height: `${height+'px' || 'auto'}`, background: `${imgBgColor || '#E5E9EF'}`}}
              onError={
                (e) => {
                  e.target.src=imgCracked;
                }
              }  
            />
            {
              imgNameLists.length > 0 && <div style={{ textAlign: 'center', width:`${width || 200}px`, marginTop: '4px' }}>{ imgNameLists[index] || '' }</div>
            }
          </li>
        ))}
      </ul>
    )
  }
}