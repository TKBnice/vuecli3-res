//通用UI组件
import RippleButton from '@/components/commonUi/RippleButton'
import UiLoading from '@/components/commonUi/UiLoading'
import UiCheckBox from '@/components/commonUi/UiCheckBox'
import UiModal from '@/components/commonUi/UiModal'
import UiDialog from '@/components/commonUi/UiDialog'
import UiProgress from '@/components/commonUi/UiProgress'


const customComponents={
    install:function(Vue){

        //全局通用UI组件
        Vue.component('RippleButton',RippleButton);
        Vue.component('UiCheckBox',UiCheckBox);
        Vue.component('UiLoading',UiLoading);
        Vue.component('UiModal',UiModal);
        Vue.component('UiProgress',UiProgress);
        Vue.component('UiDialog',UiDialog);

        Vue.component('WareList',resolve => require(['./WareList'], resolve));

        Vue.component('remote-script', {
            render: function (createElement) {
                var self = this;
                return createElement('script', {
                    attrs: {
                        type: 'text/javascript',
                        src: this.src
                    },
                    on: {
                        load: function (event) {
                            self.$emit('load', event);
                        },
                        error: function (event) {
                            self.$emit('error', event);
                        },
                        readystatechange: function (event) {
                            if (this.readyState == 'complete') {
                                self.$emit('load', event);
                            }
                        }
                    }
                });
            },
            props: {
                src: {
                    type: String,
                    required: true
                }
            }
          });  
       
                
    } 

};

export default customComponents;


