<template>
        <UiModal v-model="value">
            <div class="notice-box" :style="{'width':actualWidth+'px','height':(actualHeight)+'px','padding-top':paddingTop+'px'}">
                <div style="position:relative;height:42px;line-height:42px;border-bottom:1px solid #FFF;border-radius:4px 4px 0 0"
                    @dblclick="close" title="双击可以关闭此窗口"
                >
                    <span style="font-size:18px;color:#666;font-weight:bold;">{{title}}</span>
                    <div style="position:absolute;top:0px;right: 45px;cursor: pointer;color: #ababab" @click="maximize" v-if="showMax">
                        <i class="close-button" :class="{'el-icon-ext-wmax':!isMax,'el-icon-ext-restore':isMax}" style="font-size:15px" title="最大化"></i>
                    </div>
                    <div style="position:absolute;top:0px;right: 15px;cursor: pointer;color: #ababab" @click="close" v-if="showClose">
                        <i class="el-icon-close close-button" title="关闭"></i>
                    </div>
                </div>
                
                <div style="overflow-y: auto;overflow-x: hidden;" :style="{'height':(actualHeight-50)+'px'}">
                   <slot></slot>
                </div>

            </div>
        </UiModal>
</template>
<script>
export default {
	props: {
        value: {
            type: Boolean,
            default: false,
        },
        width:{
            type: Number,
            default:600
        },
        height:{
            type: Number,
            default:400
        },
        paddingTop:{
            type: Number,
            default:0
        },
        title:{
            type: String,
            default:''
        },
        showClose:{
            type: Boolean,
            default:true
        },
        showMax:{
            type: Boolean,
            default:false
        },
        maximized:{
            type: Boolean,
            default:false
        },
        helpText:{
            type: String,
            default:''
        },
        helpCallback:{
            type:Function,
            default: function(){
                
            }
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
    computed: {
        actualHeight(){
            if(this.isMax){
                return this.clientHeight -40;
            }
            else{
                return this.height;
            }
        },
        actualWidth(){
            if(this.isMax){
                return this.clientWidth -40;
            }
            else{
                return this.width;
            }
        },
    },
    mounted() {
        
        this.clientHeight=document.documentElement.clientHeight;
        this.clientWidth=document.documentElement.clientWidth;
        this.isMax=this.maximized;
    },
    data() {
        return {
            isMax:false,
            clientHeight:0,
            clientWidth:0
        }
    },
    created(){
        
    },
    beforeDestroy:function(){
        document.body.style.overflow = "auto";
    },
    methods:{
        close(){
            this.$emit('input',false)
            this.$emit('close')
        },
        maximize(){
            this.isMax=!this.isMax;
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