function init(config){
  this.config = config||init.config;
  this.workspace() ? this.config.INIT_WORKSPACE=true : alert(this.config.ERR_WORKSPACE);
}

init.config={
  INIT_WORKSPACE:false,
  ERR_WORKSPACE:10001000
}

init.prototype={
  workspace: function(){
    try{
      //code
      return true;
    }
    catch(error){return false}
  }
}