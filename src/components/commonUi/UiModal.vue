<template>
<transition name="fade">
<div class="modal" :style="{'background-color':'rgba(0,0,0,'+alpha+')'}" @click="onClick" v-show="value">
	<slot></slot>
</div>
</transition>
</template>
<script>
export default {
	props: {
        value: {
            type: Boolean,
            default: false,
        },
        alpha:{
            type: Number,
            default:0.5
        },
        clickClose:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            
        }
    },
    watch:{
        value:function(newValue){

            if(newValue){    
                document.body.style.overflow = "hidden";
            }
            else{
                document.body.style.overflow = "auto";
            }

        }
    },
    beforeDestroy:function(){

        document.body.style.overflow = "auto";
        //console.log("beforeDestroy UIModal");
        
    },
    methods:{

        onClick(){
            if(this.clickClose){
                this.$emit("input",false);
            }
        },
        lockScroll(){
            
        }
    }
}
</script>
<style scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 142px;
  padding-right: 20px;
}
.modal-inner {
  margin: 50px auto;
  width: 230px;
  height: 130px;
  padding: 20px;
  border: 1px solid green;
  background: white;
  box-shadow: 2px 3px 8px green;
}
</style>