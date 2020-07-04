# spinePlayer

> based on [spineruntimes-ts](https://github.com/EsotericSoftware/spine-runtimes/tree/3.8/spine-ts), include spine ver3.7 and 3.8. UMD package.

### DEMO
[Demo](http://www.qwero.cn/index.html#/animate4phaser "")

### Usage
```
import Spineplayer3_7 from 'spineplayer/build/SpinePlayer3_7'
import Spineplayer3_8 from 'spineplayer/build/SpinePlayer3_8'

// parentDom must have css rule 'position: relative'
let body1 = new Spineplayer3_7({
    parent: parentDom,
    pngUrl:spine3_7.png,
    atlasUrl:spine3_7.atlas,
    jsonUrl:spine3_7.json
})
body1.on('loaded',()=>{
    console.log(body1.getAnimationList())
    body1.play('2')
})
let body2 = new Spineplayer3_8({
    parent: parentDom,
    pngUrl:spine3_8.png,
    atlasUrl:spine3_8.atlas,
    jsonUrl:spine3_8.json
})
body2.on('loaded',()=>{
    console.log(body2.getAnimationList())
    body2.play('1')
})
```

### API
.on(key, func)
must add key 'loaded'. all code should in callback.

.getAnimationList()
return support animations list.

.play(name, loop)
name: String, support animation.
loop: Boolean.

.pause()
pause

.resume()
resume

.getSize()
return size.
