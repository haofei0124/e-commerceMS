// 通用工具

class MUtil {
  request(param){
    return new Promise((resolve, reject)=> {
      $.ajax({
        type : param.type || 'get',
        url : param.url || '',
        dataType: param.dataType || 'json',
        data : param.data || null,
        success :res=>{
          //数据请求成功
          if(0 === res.status) {
            typeof resolve === 'function' && resolve(res.data, res.msg)
          }else if(10 === res.status) {
            this.doLogin();
          }else{
            typeof resolve === 'function' && resolve(res.msg || res.data)         
          }
        },
        error: err=>{
          typeof reject === 'function' && reject(err.statusText);

        }
        
      });
    });
  }
  //跳转登陆
  doLogin() {
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
  }
  //获取URL参数
  getUrlParam(name) {
    let queryString = window.location.search.split('?')[1] || '';
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let result = queryString.match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  } 
  //成功提示
  successTips(successMsg) {
    alert(successMsg || 'Successful operation~');
  }
  //错误提示
  errorTips(errMsg) {
    alert(errMsg || 'It seems that something is wrong~');
  }
  //本地存储
  setStorage(name, data) {
    let dataType = typeof data;
    //json对象
    if(dataType === 'object' ) {
      window.localStorage.setItem(name, JSON.stringify(data));
    }
    //基础类型
    else if (['number', 'string', 'boolean'].indexOf(dataType) >= 0) {
      window.localStorage.setItem(name, data);
    }
    //其他不支持的类型
    else {
      alert('This type cannot be used for local storage')
    }
  }
  //取出本地存储内容
  getStorage(name){
    let data = window.localStorage.getItem(name);
    if(data) {
      // return JSON.parse(data);
      return data;
    }else {
      return '';
    }
  }
  //删除本地存储
  removeStorage(name) {
    window.localStorage.removeItem(name);
  }
}

export default MUtil;