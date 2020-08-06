import spine from './spine-webgl3.8';
export default class{
    constructor(config){
        this.config = config;
        this.eventList = {
            loaded:()=>{
                this.play(this.animationKeys[0])
            }
        };
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1;
        this.canvas.height = 1;
        this.raf = null;
        this.canvas.style.cssText = 'display:none;width:100%;height:100%;position:absolute';
        this.animationKeys = [];
        this.isPlaying = true;
        this.n = 0;
        this.reduceFramerate = this.config.reduceFramerate || false;
    }
    loop() {
        this.raf = requestAnimationFrame(this.loop.bind(this));
        if(this.reduceFramerate){
            this.n ++;
            if(this.n%2){
                this.renderDemo();
            }
        }else{
            this.renderDemo();
        }
    }
    on(key, func) {
        this.eventList[key] = func;
    }
    play(name, loop = true) {
        this.canvas.style.display = 'block';
        this.state.setAnimation(0, name, loop);
    }
    pause(){
        this.isPlaying = false;
    }
    resume(){
        this.isPlaying = true;
    }
    getSize() {
        return this.bounds;
    }
    getAnimationList() {
        return this.animationKeys;
    }
    remove(){
        cancelAnimationFrame(this.raf);
        this.canvas.remove();
        for (const key in this.assetManager.rawAssets) {
            if (this.assetManager.rawAssets.hasOwnProperty(key)) {
                const element = this.assetManager.rawAssets[key];
                if(element.tagName === "IMG"){
                    element.remove();
                }
            }
        }
    }
    render() {
        this.timeKeeper.update();
        let delta = this.timeKeeper.delta;
        if(this.isPlaying){
            this.state.update(delta);
            this.state.apply(this.skeleton);
            this.skeleton.updateWorldTransform();
        }
        this.renderer.camera.viewportWidth = this.bounds.x * 1.5;
        this.renderer.camera.viewportHeight = this.bounds.y * 1.5;
        this.renderer.resize(spine.webgl.ResizeMode.Fit);
        this.renderer.begin();
        this.renderer.drawSkeleton(this.skeleton, true);
        
        this.renderer.end();
    }
}