```
import Spineplayer3_7 from 'spineplayer/build/SpinePlayer3_7'
import Spineplayer3_8 from 'spineplayer/build/SpinePlayer3_8'

let body1 = new Spineplayer3_7({
    parent: this.$refs['3-7'],
    pngUrl:spine3_7.png,
    atlasUrl:spine3_7.atlas,
    jsonUrl:spine3_7.json
})
body1.on('loaded',()=>{
    console.log(body1.getAnimationList())
    body1.play('2')
})
let body2 = new Spineplayer3_8({
    parent: this.$refs['3-8'],
    pngUrl:spine3_8.png,
    atlasUrl:spine3_8.atlas,
    jsonUrl:spine3_8.json
})
body2.on('loaded',()=>{
    console.log(body2.getAnimationList())
    body2.play('1')
})
```