import React from 'react';
import { Link } from 'react-router-dom'
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

import PageTitle from 'component/page-title/index.jsx';
// import Pagination from 'util/pagination/index.jsx'


const _mm = new MUtil;
const _product = new Product();

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list : [],
      parentCategoryId : this.props.match.params.categoryId
    }
  } 
  componentDidMount() {
    this.loadCategoryList();
  }
  componentDidUpdate(prevProps, prevState) {
    let oldPath = prevProps.location.pathname;
    let newPath = this.props.location.pathname;
    let newId = this.props.match.params.categoryId || 0;
    if(oldPath !== newPath) {
      this.setState({
        parentCategoryId : newId
      }, () => {
        this.loadCategoryList();
      })
    }
  }
  //  加载品类列表
  loadCategoryList() {
    _product.getCategoryList(this.state.parentCategoryId).then(res => {
      this.setState({
        list: res
      })
    }, errMsg => {
      this.setState({
        list: []
      })
      _mm.errorTips(errMsg)
    })
  }
  // 这是更新品类的名字
  onUpdateName(categoryId, categoryName){
    let newName = window.prompt('Please enter a new category name', categoryName)
    if(newName) {
      _product.updateCategoryName({
        categoryId : categoryId,
        categoryName : newName
      }).then(res=>{
        _mm.successsTips(res);
        this.loadCategoryList();
      }, errMsg => {
        _mm.errorTips(errMsg)
      })
    }
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="Category list" />
        <div className="row">
          <div className="col-md-12">
            <p>Parent Category ID:{this.state.parentCategoryId}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
           <table className="table table-striped table-border">
              <thead>
                <tr>
                  <th>Category ID</th>
                  <th>Category name</th>
                  <th>operating</th>
                  {/* <th>电话</th> */}
                  {/* <th>注册时间</th> */}
                </tr>
              </thead>
              <tbody>
                {
                  this.state.list.map((category, index)=> {
                    return(
                    <tr key={index}>
                      <td>{category.id}</td>
                      <td>{category.name}</td>
                      <td>
                        <a className="opear"
                          onClick={(e)=> this.onUpdateName(category.id, category.name)}
                        >edit name</a>
                        {
                          category.parentId === 0 ? 
                          <Link to={`/product-category/index/${category.id}`}>
                            View subcategory
                          </Link>
                          : null
                        }
                      </td>
                    </tr>
                    );
                  })
                }
              </tbody>
           </table>
          </div>
        </div>
        {/* <Pagination 
        current={this.state.pageNum} 
        total={this.state.total} 
        onChange={(pageNum)=> {
          this.onPageNumChange(pageNum)
        }}/> */}
      </div>
    );
  }
}

export default CategoryList;