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
    update(stopcb) {
        this.points.forEach((point)=>{
            point.update()
        })
        if(this.points.length > 0 && this.points[this.points.length-1].deg == 360) {
            stopcb()
        }
    }
}
class Stage {
    constructor() {
        this.canvas = document.createElement()
        this.canvas.width = 2*r
        this.canvas.height = 2*r
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
        this.lineToCircle = new LineToCircle()
    }
    draw() {
        this.lineToCircle.draw(this.context)
    }
    update() {
        this.lineToCircle.update()
    }
}
class Looper {
    constructor() {
        this.animated = false
    }
    start(startcb) {
        if(!this.animated) {
            this.animated = true
            this.interval = setInterval(()=>{
                startcb()
            },50)
        }
    }
    stop() {
        if(this.animated) {
            this.animated = false
            clearInterval(this.interval)
        }
    }
}
const stage = new Stage()
const looper = new Looper()
window.onmousedown = (event) => {
    looper.start(()=>{
        stage.draw()
        stage.update(()=>{
            looper.stop()
        })
    })
}
