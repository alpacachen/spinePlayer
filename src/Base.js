export default class{
    constructor(config){
        this.config = config;
        this.eventList = {};
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1;
        this.canvas.height = 1;
        this.canvas.style.cssText = 'display:none;width:100%;height:100%;position:absolute';
        this.animationKeys = [];
    }
    on(key, func) {
        this.eventList[key] = func;
    }
    play(name, loop = true) {
        this.canvas.style.display = 'block';
        this.state.setAnimation(0, name, loop);
    }
    getSize() {
        return this.bounds;
    }
    getAnimationList() {
        return this.animationKeys;
    }
}