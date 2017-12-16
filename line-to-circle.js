const r = Math.min(window.innerWidth,window.innerHeight)
class LineToCirclePoint {
    constructor(deg) {
        this.deg = 0
        this.x = r*Math.cos(this.deg*Math.PI/180)
        this.y = r*Math.sin(this.deg*Math.PI/180)
    }
    setXY() {
        this.x = r*Math.cos(this.deg*Math.PI/180)
        this.y = r*Math.sin(this.deg*Math.PI/180)
    }
    update() {
        if(this.deg < 360) {
            this.deg ++
            this.setXY()
        }
        else {
            this.x -= (2*Math.PI*r)/360
        }
    }
}
