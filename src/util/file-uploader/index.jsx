import React from 'react';
import FileUpload from './react-fileupload.jsx';

class FileUploader extends React.Component {

render(){
	/*set properties*/
	const options={
    baseUrl:'/manage/product/upload.do',
    fileFieldName: 'upload_file',
    dataType: 'json',
    chooseAndUpload : true,
    uploadSuccess: (res)=> {
      this.props.onSuccess(res.data)
    },
    uploadError : (err)=>{
      this.props.onError(err.message || 'Uploading picture is wrong')
    }
  }
	/*Use FileUpload with options*/
	/*Set two dom with ref*/
    return (
      <FileUpload options={options}>
        <button className="btn btn-xs btn-default" ref="chooseAndUpload">Please select an picture</button>
        {/* <button ref="uploadBtn">upload</button> */}
      </FileUpload>
    );        
  }
}


export default FileUploader;