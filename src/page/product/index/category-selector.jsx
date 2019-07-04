import React from 'react';
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();

import './category-selector.scss';

//品类选择器
class CategorySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstCategoryList : [],
      firstCategoryId : 0,
      secoundCategoryList : [],
      secoundCategoryId : 0
    }
  }

  componentDidMount() {
    this.loadFirstCategory()
  }
  //加载一级分类
  loadFirstCategory() {
    _product.getCategoryList().then((res) => {
      this.setState({
        firstCategoryList : res
      });
    }, errMsg => {
      _mm.errorTips(errMsg);
    });
  }
  //加载二级分类
  loadSecoundCategory() {
    _product.getCategoryList(this.state.firstCategoryId).then((res) => {
      this.setState({
        secoundCategoryList : res
      });
    }, errMsg => {
      _mm.errorTips(errMsg);
    });
  }
  // 选择一级品类
  onFirstCategoryChange(e) {
    let newValue = e.target.value || 0
    this.setState({
      firstCategoryId : newValue,
      secoundCategoryId : 0,
      secoundCategoryList : []
    }, ()=>{
      // 更新二级品类
      this.loadSecoundCategory();
      this.onPropsCategoryChange();
    })
  }
  //选择二级品类
  onSecoundCategoryChange(e) {
    let newValue = e.target.value || 0
    this.setState({
      secoundCategoryId : newValue
    }, ()=>{
      // 更新二级品类
      this.loadSecoundCategory();
      this.onPropsCategoryChange();
    })
  }
  //传给父组件选中的结果
  onPropsCategoryChange() {
    //判断props里的回调函数存在
    let categoryChangable = typeof this.props.onCategoryChange === 'function';
    //如果是有二级品类
    if(this.state.secoundCategoryId) {
      categoryChangable && this.props.onCategoryChange(this.state.secoundCategoryId, this.state.firstCategoryId)
    }
    // 如果只有一级品类
    else{
      this.props.onCategoryChange(this.state.firstCategoryId, 0)
    }
  }
  render() {
    return (
      <div className="col-md-10">
        <select className="form-control cate-select"
          onChange={(e)=> {this.onFirstCategoryChange(e)}}
        >
          <option>Please select first level category</option>
          {
            this.state.firstCategoryList.map((category, index) => 
                <option value={category.id} key={index}>{category.name}</option>
            )
          }
        </select>
        {
          this.state.secoundCategoryList.length ?
        
        (<select className="form-control cate-select"
          onChange={(e)=>{this.onSecoundCategoryChange(e)}}
        >
          <option>Please select second level category</option>
          {
            this.state.secoundCategoryList.map((category, index) => 
                <option value={category.id} key={index}>{category.name}</option>
            )
          }
        </select>) : null
        }
      </div>
    );
  }
}


export default CategorySelector;

