class Messager {

    constructor(vm) {
      this.vm = vm;
    }
  
      error(message){
          this.vm.$message({
             message: message,
             type: 'error',
            //  iconClass: 'el-icon-error',
             customClass: 'message-box error'
          });
      };
      warning(message){
          this.vm.$message({
             message: message,
             type: 'warning',
            //  iconClass: 'el-icon-warning',
             customClass: 'message-box warning'
          });
      };
      info(message){
          this.vm.$message({
             message: message,
             type: 'info',
            //  iconClass: 'el-icon-info',
             customClass: 'message-box info'
          });
      };
      success(message){
          this.vm.$message({
             message: message,
             type: 'success',
            //  iconClass: 'el-icon-success',
             customClass: 'message-box success'
          });
      };
  }
  
  export default Messager;