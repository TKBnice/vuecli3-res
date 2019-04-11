import store from '@/store';

const customComponents = {
    install:function(Vue){
        Vue.directive('title', {//页面标题
            inserted: function (el, binding) {
                document.title = binding.value;
            }
        });

        Vue.directive('clickoutside', {//点击非自身元素触发方法
            bind(el, binding, vnode) {
                function documentHandler(e) {
                // 这里判断点击的元素是否是本身，是本身，则返回
                if (el.contains(e.target)) {
                    return false;
                }
                // 判断指令中是否绑定了函数
                if (binding.expression) {
                    // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                    binding.value(e);
                }
                }
                // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
                el.__vueClickOutside__ = documentHandler;
                document.addEventListener("click", documentHandler);
            },
            unbind(el, binding) {
                // 解除事件监听
                document.removeEventListener("click", el.__vueClickOutside__);
                delete el.__vueClickOutside__;
            }
        })

        Vue.directive('dialogDrag', {// v-dialogDrag: 弹窗拖拽属性 不  
            bind(el, binding, vnode, oldVnode) {
                const dialogHeaderEl = el.querySelector('.el-dialog__header');
                const dragDom = el.querySelector('.el-dialog');

                dialogHeaderEl.style.cssText += ';cursor:move;'
                dragDom.style.cssText += ';top:0px;'

                // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
                const sty = (() => {
                    if (window.document.currentStyle) {
                        return (dom, attr) => dom.currentStyle[attr];
                    } else {
                        return (dom, attr) => getComputedStyle(dom, false)[attr];
                    }
                })()

                dialogHeaderEl.onmousedown = (e) => {
                    // 鼠标按下，计算当前元素距离可视区的距离
                    const disX = e.clientX - dialogHeaderEl.offsetLeft;
                    const disY = e.clientY - dialogHeaderEl.offsetTop;

                    const screenWidth = document.body.clientWidth; // body当前宽度
                    const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取) 

                    const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
                    const dragDomheight = dragDom.offsetHeight; // 对话框高度

                    const minDragDomLeft = dragDom.offsetLeft;
                    const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

                    const minDragDomTop = dragDom.offsetTop;
                    const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;


                    // 获取到的值带px 正则匹配替换
                    let styL = sty(dragDom, 'left');
                    let styT = sty(dragDom, 'top');

                    // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
                    if (styL.includes('%')) {
                        styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100);
                        styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100);
                    } else {
                        styL = +styL.replace(/\px/g, '');
                        styT = +styT.replace(/\px/g, '');
                    };

                    document.onmousemove = function (e) {
                        // 通过事件委托，计算移动的距离 
                        let left = e.clientX - disX;
                        let top = e.clientY - disY;

                        // 边界处理
                        if (-(left) > minDragDomLeft) {
                            left = -(minDragDomLeft);
                        } else if (left > maxDragDomLeft) {
                            left = maxDragDomLeft;
                        }

                        if (-(top) > minDragDomTop) {
                            top = -(minDragDomTop);
                        } else if (top > maxDragDomTop) {
                            top = maxDragDomTop;
                        }

                        // 移动当前元素  
                        dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
                    };

                    document.onmouseup = function (e) {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                }
            }
        })

        Vue.directive('focus', {//获取焦点
            // 当绑定元素插入到 DOM 中。
            
            inserted: function (el) {
                // 聚焦元素
                el.focus()
            },
            //也可以用update,update就是当页面有操作的时候就触发，比如点击按钮，输入框输入都算。
            //有一个要注意的就是，就是你页面有几个input,比如一个input绑定了v-focus,一个没有绑定。你在没绑定v-focus的input输入时，绑定了v-focus的input就是自动获取焦点，这是个bug.
            // unbind: function (el) {
            //     el.focus()
            // }
        });

        Vue.directive('permission',{//指令权限判断
            inserted(el, binding, vnode) {
                const { value } = binding
                const roles = store.getters && store.getters.roles
                console.log('binding',binding)
                if (value && value instanceof Array && value.length > 0) {
                const permissionRoles = value
            
                const hasPermission = roles.some(role => {
                    return permissionRoles.includes(role)
                })
            
                if (!hasPermission) {
                    el.parentNode && el.parentNode.removeChild(el)
                }
                } else {
                throw new Error(`need roles! Like v-permission="['admin','editor']"`)
                }
            }
        })
    }
}

export default customComponents;