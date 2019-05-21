<template>
    <div style="position: relative;width:100%;">
        <div class="progress-bar showingUpAnimation" ref="aProgressBar">
            <div class="status-bar" :style="{'width':widthBasedProgress+'%'}">&nbsp;</div>
        </div>
        <div class="percentage-wrapper" style="overflow:left">
            <span id="percentage" class="percentage">0</span>
        </div>
    </div>
</template>
<style scoped>
.progress-bar {
    display: inline-block;
    background-color: #EEE;
    width: 0px;
    height: 12px;
    border-radius: 6px;
}
.status-bar {
    width: 0px;
    height: 12px;
    border-radius: 6px;
    background-color: #2992EE;
    transition: width 0.8s linear;
}
.showingUpAnimation {
    animation-name: showingup100;
    animation-duration: 1.5s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-play-state: running;
    animation-fill-mode: forwards;
}
.percentage-wrapper{
	width: 100%;
	margin-top: 5px;
	display: flex;
    justify-content:flex-start;
    align-items:flex-start;
}
.percentage {
    font-size: 18px;
    font-weight: bold;
    transition: transform .8s linear;
}

@keyframes showingup100 {
    0% {
        width: 3%;
    }
    32% {
        width: 80%;
    }
    50% {
        width: 60%;
    }
    100% {
        width: 100%;
    }
}

</style>
<script>
import CountUp from './js/countUp'
export default {
    props: {
        progress: {
            type: Number,
            default: 0,
            validator: function(value) {
                return (value <= 100 && value >= 0)
            }
        }
    },
    watch: {
        progress: function(newValue) {
			this.numAnim.update(newValue);
        }
    },
    computed: {
        widthBasedProgress() {
            return this.progressBarShowUp?((this.barWidth * this.progress) / 100 ):0;
        }
    },
    data() {
        return {
        	barWidth: 100,
            progressBarInited: false,
            lastProgress: 0,
            numAnim: null,
            progressBarShowUp: false,
            startClosingAni: false
        }
    },
    mounted() {

    	var options = {
		  suffix : '%'
		};

        this.numAnim = new CountUp("percentage",0,0,0,2,options);
        this.numAnim.start(()=> {
            if(this.progress==100){
                this.startClosingAni = true;
            }
		});


        var progressBar = this.$refs.aProgressBar;

        progressBar.addEventListener("animationend", ()=>{
            this.progressBarShowUp = true;
            //console.log("animationend!!!");
        });
        
    }
}
</script>
