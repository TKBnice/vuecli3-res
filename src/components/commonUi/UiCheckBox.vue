<template>

<div :style="{'margin-right':marginRight+'px'}" style="display: inline-block">
  <label class="uicheckbox">
    <span :class="{'uicheckbox__input':true, 'is-checked':value}">
        <span class="uicheckbox__inner"></span>
        <input ref="cbox" type="checkbox" class="uicheckbox__original" :checked="value" @change="updateValue">
    </span>
  </label>
</div>

</template>
<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        marginRight:{
            type: Number,
            default:0
        }
    },
    methods:{
        updateValue(){
            var b = this.$refs.cbox.checked;
            this.$emit('input',b);
            this.$emit('changed',b);

        }
    }
}
    
</script>
<style scoped>

.uicheckbox {
    color: #353535;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}
.uicheckbox + .uicheckbox {
    margin-left: 15px;
}

.uicheckbox__input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
}

.uicheckbox__input.is-focus .uicheckbox__inner {
    border-color: #999999;
}


.uicheckbox__input.is-checked .uicheckbox__inner {
    background-color: #78BAF1;
    border: 0;
}
.uicheckbox__input.is-checked .uicheckbox__inner::after {
    transform: rotate(45deg) scaleY(1);
}
.uicheckbox__inner {
    display: inline-block;
    position: relative;
    border: 1px solid rgb(217, 191, 191);
    border-radius: 3px;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #fff;
    z-index: 1;
    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),
                  background-color .25s cubic-bezier(.71,-.46,.29,1.46);
}
.uicheckbox__inner:hover {
    border-color: #666666;
}
.uicheckbox__inner::after {
    box-sizing: content-box;
    content: "";
    border: 2px solid #FFFFFF;
    border-left: 0;
    border-top: 0;
    height: 6px;
    width: 3px;
    left: 5px;
    position: absolute;
    top: 2px;
    transform: rotate(45deg) scaleY(0);
    
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
    transform-origin: center;
}
.uicheckbox__original {
    opacity: 0;
    outline: none;
    position: absolute;
    margin: 0;
    visibility: hidden;
    left: -999px;
}


     
</style>