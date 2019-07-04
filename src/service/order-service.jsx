import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class Order {
  //获取用户列表
  getOrderList(listParam) {
    let url = '';
    let data = {};
    if(listParam.listType === 'list') {
      url = '/manage/order/list.do';
      data.pageNum = listParam.pageNum
    }else if (listParam.listType === 'search') {
      url = '/manage/order/search.do';
      data.pageNum = listParam.pageNum;
      data.orderNo = listParam.orderNo
    }
    return _mm.request({
      type : 'post',
      url : url,
      data : data
    });
  }
}
export default Order;