import React from 'react';
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';
import FileUploader from 'util/file-uploader/index.jsx';
import RichEditor from 'util/rich-editor/index.jsx';

const _mm = new MUtil();
const _product = new Product();

import './save.scss'

class ProductSave extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id : this.props.match.params.pid,
      name : '',
      subtitle : '',
      categoryId : 0,
      parentCategoryId : 0,
      subImages : [],
      price : '',
      stock : '',
      detail : '',
      status : '1' //商品状态1为在售
    }
  }
  componentDidMount() {
    this.loadProduct()
  }
  // //加载商品详情 
  loadProduct(){
    // 有id的时候，表示是编辑功能，需要表单回填
    if(this.state.id) {
      _product.getProduct(this.state.id).then((res)=> {
        let images = res.subImages.split(',');
        res.subImages = images.map((imgUri) => {
          return {
            uri: imgUri,
            url: res.imageHost + imgUri
          };
          this.setState(res);
        })
      }, (errMsg)=> {
        _mm.errorTips(errMsg);
      })
    }
  }
  // 简单字段的改变，比如商品名称，描述，价格，库存
  onValueChange(e) {
    let name = e.target.name;
    let value = e.target.value.trim();
    this.setState({
      [name] : value
    })
  }
  // 品类选择器变化
  onCategoryChange(categoryId, parentCategoryId) {
    this.setState({
      categoryId : categoryId,
      parentCategoryId : parentCategoryId
    })
    
  }
  //上传图片成功
  onUploadSuccess(res) {
    let subImages = this.state.subImages;
    subImages.push(res);
    this.setState({
      subImages : subImages
    });
  }
  // 上传图片失败
  onUploadError(errMsg) {
    _mm.errorTips(errMsg)
  }
  // 删除图片
  onImageDelete(e) {
    let index = parseInt(e.target.getAttribute('index'));
    let subImages = this.state.subImages;
    subImages.splice(index, 1);
    this.setState({
      subImages : subImages
    });
  }
  //富文本编辑器的变化
  onDetailValueChange(value) {
    console.log(value)
    this.setState({
      detail: value
    })
  }
  getSubImagesString() {
    return this.state.subImages.map((image)=> image.uri).join(',');
  }
  // 提交表单
  onSubmit() {
    let product = {
      name : this.state.name,
      subtitle : this.state.subtitle,
      categoryId : parseInt(this.state.categoryId),
      subImages : this.getSubImagesString(),
      detail : this.state.detail,
      price : parseFloat(this.state.price),
      stock : parseInt(this.state.stock),
      status : this.state.status
    },
    productCheckResult = _product.checkProduct(product);
    // 表单验证成功
    if(productCheckResult.status) {
      _product.saveProduct(product).then((res)=> {
        _mm.successTips(res);
        this.props.history.push('/product/index');
      }, (errMsg)=> {
        _mm.errorTips(errMsg);
      });
    }
    // 表单验证失败
    else {
      _mm.errorTips(productCheckResult.msg)
    }
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title={this.state.id ? 'Edit item' : 'Add item'} />
        <div className="form-horizontal">
          <div className="form-group">
            <label  className="col-md-2 control-label">Item name</label>
            <div className="col-md-5">
              <input type="text" className="form-control" placeholder="Please enter the item name"
              name="name"
              value={this.state.name}
              onChange={(e)=> this.onValueChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Item description</label>
            <div className="col-md-5">
              <input type="text" className="form-control"  placeholder="Please enter a description of the item"
              name="subtitle"
              value={this.state.subtitle}
              onChange={(e)=>this.onValueChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Category</label>
           <CategorySelector
            categoryId={this.state.categoryId}
            parentCategoryId={this.state.parentCategoryId}
           onCategoryChange={
             (categoryId, parentCategoryId)=>{
               this.onCategoryChange(categoryId, parentCategoryId)
             }}/>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Item price</label>
            <div className="col-md-2">
            <div className="input-group">
              <input type="number" className="form-control"  placeholder="Price"
              name="price"
              value={this.state.price}
              onChange={(e)=>this.onValueChange(e)}
              />
              <span className="input-group-addon">CAD</span>
            </div>
              
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Item stocks</label>
            <div className="col-md-2">
            <div className="input-group">
            <input type="number" className="form-control"     placeholder="Stocks"
            name="stock"
            value={this.state.stock}
            onChange={(e)=>this.onValueChange(e)}
            />
              <span className="input-group-addon">PCS</span>
            </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Item pictures</label>
            <div className="col-md-10">
                {
                  this.state.subImages.length ? this.state.subImages.map((image,index) => 
                  (<div className="img-con" key={index} >
                      <img className="img" src={image.url}/>
                      <i className="fa fa-close" index={index} onClick={(e)=>this.onImageDelete(e)}/>
                  </div>)
                  ): (<div>Please upload image</div>)
                }
                <div className=" col-md-10">
                  <FileUploader 
                  onSuccess={(res)=>{this.onUploadSuccess(res)}}
                  onError={(errMsg)=>{this.onUploageError(errMsg)}}
                  />
                </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Item detail</label>
            <div className="col-md-10">
              <RichEditor 
              detail={this.state.detail}
              onValueChange={(value)=> this.onDetailValueChange(value)}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-offset-2 col-md-10">
              <button type="submit" className="btn btn-primary"
                onClick={(e)=>{this.onSubmit(e)}}
              >Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default ProductSave;

