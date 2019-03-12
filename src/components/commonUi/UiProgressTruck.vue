<template>
    <div style="position: relative;width: 445px;display: inline-flex;flex-flow:column;align-items:center;">

		<div class="circle_process_locater">
			<div class="circle_process" >
	        	<template v-if="startClosingAni">
		            <!-- <img src="../../assets/images/portage/done.png" class="done-marker"/> -->
		            <div class="done-marker-cover">&nbsp;</div>
		            <div class="wrapper right">
		                <div class="circle rightcircle"></div>
		            </div>
		            <div class="wrapper left">
		                <div class="circle leftcircle" id="leftcircle"></div>
		            </div>
	            </template>
	        </div>
        </div>

        <div style="width:100%;height: 48px;line-height:48px;margin-top: 130px;">
            <!-- <img src="../../assets/images/portage/truck.gif" class="truck" :style="{'transform':'translateX('+(truckMove)+'px)','opacity':progressBarShowUp&&!startClosingAni?1:0}" /> -->
        </div>

        <template v-if="!startClosingAni">
            <div class="progress-bar showingUpAnimation" ref="progressBar">
                <div class="status-bar" :style="{'width':(progressBarShowUp?widthBasedProgress:0)+'px'}">&nbsp;</div>
            </div>
            <div class="percentage-wrapper" :style="{'visibility':progress>0?'':'hidden'}">
            	<span v-show="progressBarShowUp" id="percentage" class="percentage" :style="{'transform':'translateX('+(percentageMove)+'px)'}">0</span>
                <span v-show="!progressBarShowUp" class="percentage">&nbsp;</span>
            </div>
        </template>
        <template v-else>
            <div class="progress-bar closingsAnimation" style="background-color: #FF6600" ref="progressBar2"></div>
        </template>
    </div>
</template>
<style>
.progress-bar {
    display: inline-block;
    background-color: #EEE;
    width: 0px;
    height: 12px;
    border-radius: 6px;
}

.showingUpAnimation {
    animation-name: showingup;
    animation-duration: 1.5s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-play-state: running;
    animation-fill-mode: forwards;
}

.closingsAnimation {
    animation-name: closing;
    animation-duration: 0.4s;
    animation-timing-function: ease-out;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-play-state: running;
    animation-fill-mode: forwards;
}

@keyframes showingup {
    0% {
        width: 14px;
    }
    32% {
        width: 356px;
    }
    50% {
        width: 267px;
    }
    100% {
        width: 445px;
    }
}

@keyframes closing {
    0% {
        width: 445px;
    }
    100% {
        width: 0px;
    }
}

.status-bar {
    width: 0px;
    height: 12px;
    background-color: #2992EE;
    border-radius: 6px;
    transition: width 0.8s linear;
}

.truck {
    position: absolute;
    left: -20px;
    opacity: 0;
    width: 92px;
    height: 46px;
    transition: transform .8s linear, opacity 0.3s ease-in;
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

.circle_process_locater{
	display: inline-block;
	position: absolute;
	top: 97px;
	height: 200px;
	width: 100%;
	width: 100%;
}

.circle_process {
	display: inline-block;
    position: relative;
    width: 89px;
    height: 90px;
}

.circle_process .wrapper {
    width: 45px;
    height: 90px;
    position: absolute;
    top: 0;
    overflow: hidden;
}

.circle_process .right {
    right: 0;
}

.circle_process .left {
    left: 0;
}

.circle_process .circle {
    width: 82px;
    height: 82px;
    border: 2.75px solid transparent;
    border-radius: 50%;
    position: absolute;
    top: 0;
    transform: rotate(45deg);
}

.circle_process .rightcircle {
    border-top: 4px solid #2992EE;
    border-right: 4px solid #2992EE;
    right: 0;
    animation:circle_right 0.6s 0.4s 1 linear normal both ;
    z-index: 101;
}

.circle_process .leftcircle {
    border-bottom: 4px solid #2992EE;
    border-left: 4px solid #2992EE;
    left: 0;
    animation:circle_left 0.6s 0.4s 1 linear normal both;
}

@keyframes circle_right {
    0% {
        transform: rotate(225deg);
    }
    50%,
    100% {
        transform: rotate(45deg);
    }
}

@keyframes circle_left {
    0%,
    50% {
        transform: rotate(225deg);
    }
    100% {
        transform: rotate(45deg);
    }
}

.done-marker {
	position: absolute;
    top: 24px;
    left: 20px;
    
}

.done-marker-cover {
    width: 50px;
    height: 40px;
    background-color: #FFFFFF;
    position: absolute;
    top: 24px;
    left: 20px;
    z-index: 100;
    animation-name: moving_cover;
    animation-duration: 0.3s;
    animation-timing-function: ease-in;
    animation-delay: 0.9s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-play-state: running;
    animation-fill-mode: forwards;
}

@keyframes moving_cover {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(100px);
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
            //console.log("widthBasedProgress----->this.progress----------->",this.progress);
            return (this.barWidth) * this.progress / 100;
        },
        percentageMove() {
           return Math.max(this.widthBasedProgress-55,0);
        },
        truckMove(){
        	return Math.max(this.widthBasedProgress-72,0);
        },
        truckOpacity() {
            return (this.progress >0 && !this.startClosingAni) ? 1 : 0;
        }
    },
    data() {
        return {
        	barWidth: 445,
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


        var progressBar = this.$refs.progressBar;

        progressBar.addEventListener("animationend", ()=>{
            this.progressBarShowUp = true;
            //console.log("animationend!!!");
        });
        
    }
}
</script>
