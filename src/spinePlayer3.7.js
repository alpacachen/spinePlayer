/* eslint-disable */ 
import spine from './spine-webgl3.7';
import Base from './Base';
export default class SpinePlayer3_7 extends Base{
    constructor(props) {
        super(props);
        this.gl = null;
        this.renderer = null;
        this.timeKeeper = null;
        this.loaded = null;
        this.skeleton = null;
        this.state = null;
        this.bounds = null;
        this.assetManager = new spine.SharedAssetManager('');
        this.DEMO_NAME = 'AdditiveBlendingDemo';
        this.canvas.ctx = new spine.webgl.ManagedWebGLRenderingContext(this.canvas, {
            alpha: true,
        });
        this.init();
        this.loop();
    }
    init() {
        const { pngUrl, atlasUrl, jsonUrl } = this.config;
        this.gl = this.canvas.ctx.gl;
        this.renderer = new spine.webgl.SceneRenderer(this.canvas, this.gl);
        let textureLoader = (img) => {
            return new spine.webgl.GLTexture(this.gl, img);
        };
        this.assetManager.loadTexture(this.DEMO_NAME, textureLoader, pngUrl);
        this.assetManager.loadText(this.DEMO_NAME, atlasUrl);
        this.assetManager.loadJson(this.DEMO_NAME, jsonUrl);
        this.timeKeeper = new spine.TimeKeeper();
    }
    loop() {
        requestAnimationFrame(this.loop.bind(this));
        this.renderDemo();
    }
    renderDemo() {
        const { parent } = this.config;
        if (this.canvas.parentElement != parent) {
            parent.appendChild(this.canvas);
        }
        if (this.assetManager.isLoadingComplete(this.DEMO_NAME)) {
            if (!this.loaded) {
                this.loadingComplete();
                this.loaded = true;
            }
            this.render();
        }
    }
    loadingComplete() {
        const { atlasUrl, pngUrl, jsonUrl } = this.config;
        let atlas = new spine.TextureAtlas(this.assetManager.get(this.DEMO_NAME, atlasUrl), () => {
            return this.assetManager.get(this.DEMO_NAME, pngUrl);
        });
        let atlasLoader = new spine.AtlasAttachmentLoader(atlas);
        let skeletonJson = new spine.SkeletonJson(atlasLoader);
        let json = this.assetManager.get(this.DEMO_NAME, jsonUrl);
        let skeletonData = skeletonJson.readSkeletonData(json);
        this.skeleton = new spine.Skeleton(skeletonData);
        this.state = new spine.AnimationState(new spine.AnimationStateData(this.skeleton.data));
        this.animationKeys = Object.keys(json.animations);
        this.state.setAnimation(0, this.animationKeys[0], true);
        this.state.apply(this.skeleton);
        this.skeleton.updateWorldTransform();
        let offset = new spine.Vector2();
        this.bounds = new spine.Vector2();
        this.skeleton.getBounds(offset, this.bounds, []);
        this.eventList['loaded']();
    }
    render() {
        this.timeKeeper.update();
        let delta = this.timeKeeper.delta;

        this.state.update(delta);
        this.state.apply(this.skeleton);
        this.skeleton.updateWorldTransform();
        this.renderer.camera.viewportWidth = this.bounds.x * 1.5;
        this.renderer.camera.viewportHeight = this.bounds.y * 1.5;
        this.renderer.resize(spine.webgl.ResizeMode.Fit);
        this.renderer.begin();
        this.renderer.drawSkeleton(this.skeleton, true);
        
        this.renderer.end();
    }
}
