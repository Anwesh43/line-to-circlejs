const r = Math.min(window.innerWidth,window.innerHeight)/3
class LineToCirclePoint {
    constructor(deg) {
        this.deg = deg
        this.x = (r/2)*Math.cos(this.deg*Math.PI/180)
        this.y = (r/2)*Math.sin(this.deg*Math.PI/180)
    }
    setXY() {
        this.x = (r/2)*Math.cos(this.deg*Math.PI/180)
        this.y = (r/2)*Math.sin(this.deg*Math.PI/180)
    }
    update() {
        if(this.deg < 360) {
            this.deg ++
            this.setXY()
        }
        else {
            this.x += (Math.PI*r)/360
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
            this.points.push(new LineToCirclePoint(i))
        }
    }
    draw(context) {
        context.save()
        context.translate(r,r)
        context.lineWidth = 5
        context.strokeStyle = '#6A1B9A'
        context.lineCap = 'round'
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
        if(this.points.length > 0 && this.points[0].deg == 360) {
            stopcb()
        }
    }
}
class Stage {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.canvas.width = 2*r+2*Math.PI*r
        this.canvas.height = 2*r
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
        this.lineToCircle = new LineToCircle()
    }
    draw() {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.lineToCircle.draw(this.context)
        this.context.lineWidth = 4
        this.context.beginPath()
        this.context.moveTo(r+r/2,2*r-r/10)
        this.context.lineTo(r+r/2+r*Math.PI,2*r-r/10)
        this.context.stroke()
    }
    update(stopcb) {
        this.lineToCircle.update(stopcb)
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
            },20)
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
stage.draw()
const looper = new Looper()
window.onmousedown = (event) => {
    looper.start(()=>{
        stage.draw()
        stage.update(()=>{
            looper.stop()
        })
    })
}
