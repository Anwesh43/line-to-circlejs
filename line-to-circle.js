const r = Math.min(window.innerWidth,window.innerHeight)/3
class LineToCirclePoint {
    constructor(deg) {
        this.deg = deg
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
class LineToCircle {
    constructor() {
        this.points = []
        this.init()
    }
    init() {
        for(var i=0;i<=360;i++) {
            this.points.add(new LineToCirclePoint(i))
        }
    }
    draw(context) {
        context.save()
        context.translate(r,r)
        context.lineWidth = 5
        context.beginPath()
        this.points.forEach((point,index)=>{
            if(index == 0) {
                context.moveTo(point.x,point.y)
            }
            else {
                context.lineTo(point.x,point.y)
            }
        })
        context.stroke()
        context.restore()
    }
    update() {
        this.points.forEach((point)=>{
            point.update()
        })
    }
}
