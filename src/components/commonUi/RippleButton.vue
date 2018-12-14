<template>
    <div style="display: inline-block;">
        <div style="height: 0; width: 0; position: absolute; visibility: hidden;display: none" aria-hidden="true">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" focusable="false">
                <symbol id="ripply-scott" viewBox="0 0 100 100">
                    <circle id="ripple-shape" cx="1" cy="1" r="1" />
                </symbol>
            </svg>
        </div>
        <button id="js-ripple-btn" class="button styl-material" :class="classsName" @click="clickBtn">
            <span class="text">
                <slot>
                </slot>
            </span>
            <!-- <svg class="ripple-obj" id="js-ripple">
                <use height="100" width="100" xlink:href="#ripply-scott" class="js-ripple" ref="js_ripple"></use>
            </svg> -->
        </button>
    </div>
</template>

<script>
export default {
    props: {
        classsName: {
            type: String,
            default: ''
        },
        delay:{
            type: Number,
            default: 300
        }
    },
    data() {
        return {
            clicking:false
        };
    },
    mounted() {
        //console.log(ripplyScott);
        //ripplyScott.init('js-ripple-btn', 0.75);
    },
    methods: {
        emitClick() {
            this.$emit('click');
            this.clicking=false;
        },
        clickBtn(event) {
            if(this.clicking){
                //console.log("is clicking....return");
                return;
            }
            this.clicking=true;
            //this.rippleAnimation(event, 0.75);
            //setTimeout(this.emitClick, this.delay);
            this.emitClick();
        },
        rippleAnimation(event, timing) {

            var ripple = this.$refs.js_ripple;

            //var circle = document.getElementById('js-ripple'),
            //var ripple = document.querySelectorAll('.js-ripple');
            //console.log(ripple)

            var tl = new TimelineMax();
            var x = event.offsetX,
                y = event.offsetY,
                w = event.target.offsetWidth,
                h = event.target.offsetHeight,
                offsetX = Math.abs((w / 2) - x),
                offsetY = Math.abs((h / 2) - y),
                deltaX = (w / 2) + offsetX,
                deltaY = (h / 2) + offsetY,
                scale_ratio = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));


            tl.fromTo(ripple, timing, {
                x: x,
                y: y,
                transformOrigin: '50% 50%',
                scale: 0,
                opacity: 1,
                ease: Linear.easeIn
            }, {
                scale: scale_ratio,
                opacity: 0
            });

            return tl;
        }
    }
}
</script>
<style scoped>
button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-family: "Microsoft YaHei", "微软雅黑", "Arial", "sans-serif";
}

.button {
    padding: 0;
    margin: 0;
    position: relative;
/*    min-width: 150px;
    height: 40px;
    border-radius: 20px;*/
    display: inline-block;
    cursor: pointer;
}

.button.styl-material {
    -webkit-transition: 200ms background cubic-bezier(0.4, 0, 0.2, 1);
    transition: 100ms background cubic-bezier(0.4, 0, 0.2, 1);
    outline: none;
}

.button.styl-material:hover {
    outline: none;
}

.ripple-obj {
    height: 100%;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    border-radius: 18px;
    fill: rgba(255, 255, 255, 0.3);
}

.ripple-obj use {
    opacity: 0;
}
</style>
