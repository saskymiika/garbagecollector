const canvas = document.querySelector('canvas');
canvas.width = 900
canvas.height = 600
const context = canvas.getContext('2d');
const tilesize = 30

let localstorageWalls = []

class Delta {
    constructor() {
        this.time = Date.now()
    }
    getDeltaTime() {
        let now = Date.now()
        let delta = now - this.time
        this.time = now
        return delta/1000
    }
}

let clock = new Delta()

class NPC {
    constructor(color) {
        this.friendly = false
        this.position = {
            x: 0,
            y: 0
        }
        this.nodePosition = {
            x: 0,
            y: 0
        }
        this.color = color
        this.speed = .8 + Math.random()
        this.targetNode = null
    }
    setNodePosition() {
        this.nodePosition.x = Math.floor(this.position.x/tilesize)
        this.nodePosition.y = Math.floor(this.position.y/tilesize)
    }
    setTargetNode(targetNode) {
        this.targetNode = targetNode
    }
    updatePosition() {
        if(this.targetNode) {
            // get targetnode absolute position at center of the node
            // get direction by substracting target,posiio - this.position
            let dirX = (this.targetNode.position.x*tilesize + tilesize/2) - this.position.x,
                dirY = (this.targetNode.position.y*tilesize + tilesize/2) - this.position.y;
    
            // if has reached close enough, reset dir to 0 to avoid "shaking"
            if(Math.abs(dirX) < this.speed) {
                dirX = 0
                this.position.x = Math.round(this.targetNode.position.x*tilesize + tilesize/2)
            }
            if(Math.abs(dirY) < this.speed) {
                dirY = 0
                this.position.y = Math.round(this.targetNode.position.y*tilesize + tilesize/2)
            }

                
            // if has reached the target destination, set new target to the direction of current target
            if(dirX === 0 && dirY === 0){
                this.setNodePosition()
                // if when direction of tatgetnode is 0,0 we have reached to final destination
                if(this.targetNode.direction.x == 0 && this.targetNode.direction.y == 0) {
                    
                    return
                }
                else {
                    this.setTargetNode(nodes[`${this.targetNode.position.x+this.targetNode.direction.x}-${this.targetNode.position.y+this.targetNode.direction.y}`])
                } 
            }

            // move npc in x axis
            if(dirX > 0)
                this.position.x += (1 * this.speed) 
            else if(dirX < 0)
                this.position.x += (-1 * this.speed)
    
            // move npc in y axis
            if(dirY > 0)
                this.position.y += (1 * this.speed) 
            else if(dirY < 0)
                this.position.y += (-1 * this.speed)

        }
    }
    draw(c) {
        c.fillStyle = this.color
        c.fillRect(this.position.x-(tilesize/2), this.position.y-(tilesize/2), tilesize, tilesize)
    }
}

class Player {
    constructor(color) {
        this.friendly = false
        this.position = {
            x: Math.ceil(19 * tilesize + (tilesize/2)),
            y: Math.ceil(14 * tilesize + (tilesize/2))
        }
        this.nodePosition = {
            x: 0,
            y: 0
        }
        this.collision = {
            top: [{x:0, y:0}, {x:0, y:0}],
            bottom: [{x:0, y:0}, {x:0, y:0}],
            left: [{x:0, y:0}, {x:0, y:0}],
            right: [{x:0, y:0}, {x:0, y:0}],
        }
        this.color = color
        this.speed = 1.4
        this.targetNode = null
        this.collisionRadius = 6
        this.isMoving = {
            up: false,
            down: false,
            left: false,
            right: false
        }
        this.keys = {
            up: 'w',
            down: 's',
            left: 'a',
            right: 'd'
        }
    }
    setNodePosition() {
        this.nodePosition.x = Math.floor(this.position.x/tilesize)
        this.nodePosition.y = Math.floor(this.position.y/tilesize)
    }
    setTargetNode(targetNode) {
        this.targetNode = targetNode
    }
    updateCollisionPoints() {
        this.collision.top[0].x = this.position.x-(tilesize/2)+this.collisionRadius
        this.collision.top[0].y = this.position.y-(tilesize/2)
        this.collision.top[1].x = this.position.x+(tilesize/2)-this.collisionRadius
        this.collision.top[1].y = this.position.y-(tilesize/2)

        this.collision.bottom[0].x = this.position.x-(tilesize/2)+this.collisionRadius
        this.collision.bottom[0].y = this.position.y+(tilesize/2)
        this.collision.bottom[1].x = this.position.x+(tilesize/2)-this.collisionRadius
        this.collision.bottom[1].y = this.position.y+(tilesize/2)

        this.collision.left[0].x = this.position.x-(tilesize/2)
        this.collision.left[0].y = this.position.y-(tilesize/2)+this.collisionRadius
        this.collision.left[1].x = this.position.x-(tilesize/2)
        this.collision.left[1].y = this.position.y+(tilesize/2)-this.collisionRadius

        this.collision.right[0].x = this.position.x+(tilesize/2)
        this.collision.right[0].y = this.position.y-(tilesize/2)+this.collisionRadius
        this.collision.right[1].x = this.position.x+(tilesize/2)
        this.collision.right[1].y = this.position.y+(tilesize/2)-this.collisionRadius


        for(let p of this.collision.top) {
            if(nodes[`${Math.floor(p.x/tilesize)}-${Math.floor(p.y/tilesize)}`] &&
               nodes[`${Math.floor(p.x/tilesize)}-${Math.floor(p.y/tilesize)}`].type === 'wall') {

                let node = nodes[`${Math.floor(p.x/tilesize)}-${Math.floor(p.y/tilesize)}`]
                this.position.y += (tilesize/2) - (p.y - (node.position.y*tilesize + (tilesize/2))) 
                break
            }
        }
        for(let p of this.collision.bottom) {
            if(nodes[`${Math.floor(p.x/tilesize)}-${Math.floor(p.y/tilesize)}`] &&
               nodes[`${Math.floor(p.x/tilesize)}-${Math.floor(p.y/tilesize)}`].type === 'wall') {
                   
                let node = nodes[`${Math.floor(p.x/tilesize)}-${Math.floor(p.y/tilesize)}`]
                this.position.y -= (tilesize/2) + (p.y - (node.position.y*tilesize + (tilesize/2))) 
                break
            }
        }
        for(let p of this.collision.left) {
            if(nodes[`${Math.floor(p.x/tilesize)}-${Math.floor(p.y/tilesize)}`] &&
               nodes[`${Math.floor(p.x/tilesize)}-${Math.floor(p.y/tilesize)}`].type === 'wall') {

                let node = nodes[`${Math.floor(p.x/tilesize)}-${Math.floor(p.y/tilesize)}`]
                this.position.x += (tilesize/2) - (p.x - (node.position.x*tilesize + (tilesize/2))) 
                break
            }
        }
        for(let p of this.collision.right) {
            if(nodes[`${Math.floor(p.x/tilesize)}-${Math.floor(p.y/tilesize)}`] &&
               nodes[`${Math.floor(p.x/tilesize)}-${Math.floor(p.y/tilesize)}`].type === 'wall') {

                let node = nodes[`${Math.floor(p.x/tilesize)}-${Math.floor(p.y/tilesize)}`]
                this.position.x -= (tilesize/2) + (p.x - (node.position.x*tilesize + (tilesize/2))) 
                break
            }
        }
            
    }
    updatePosition() {
        if(this.isMoving.up) this.position.y += (-1*this.speed)
        if(this.isMoving.down) this.position.y += (1*this.speed)
        if(this.isMoving.left) this.position.x += (-1*this.speed)
        if(this.isMoving.right) this.position.x +=(1*this.speed)
        this.updateCollisionPoints()
    }
    draw(c) {
        c.fillStyle = this.color
        c.fillRect(this.position.x-(tilesize/2), this.position.y-(tilesize/2), tilesize, tilesize)
        c.fillStyle = 'purple'
        for(let co in this.collision) {
            for(let p of this.collision[co]) {
                c.beginPath()
                c.arc(p.x, p.y, 2, 0, 2*Math.PI)
                c.fill()
            }
        }
    }
}

class Node {
    constructor(x, y, type) {
        this.position = {
            x: x,
            y: y,
        }
        this.type = type != null ? type : null
        this.angle = null
        this.visited = false
        this.parent = null
        this.weight = 0
        this.direction = {
            x: 0,
            y: 0
        }
    }
    setdirections(xx, yy) {
        this.direction.x = xx
        this.direction.y = yy
    }
    setAngle(xx, yy) {
        this.angle = Math.atan2(yy - (this.position.y*tilesize+(tilesize/2)), xx - (this.position.x*tilesize+(tilesize/2)))
    }
    getAngle(from, to) {
        return Math.atan2(to[1]-from[1], to[0]-from[0])
    }
    drawAngle(c) {
        const from = [this.position.x*tilesize+(tilesize/2), this.position.y*tilesize+(tilesize/2)]
        const to = [
            Math.cos(this.angle) * (tilesize/3), 
            Math.sin(this.angle) * (tilesize/3)
        ]
        c.beginPath()
        c.strokeStyle = 'red'
        c.moveTo(from[0], from[1])
        c.lineTo(from[0]+to[0], from[1]+to[1])
        c.stroke()
    }
    draw(c) {
        c.fillStyle = this.type === null ? `lightblue` : 'black'
        if(this.type === 'end')
            c.fillStyle = 'orange'
        c.fillRect(this.position.x * tilesize, this.position.y * tilesize, tilesize, tilesize)
        c.fillStyle = 'darkred'
        c.fillRect(this.position.x * tilesize+(tilesize/2)-2, this.position.y * tilesize+(tilesize/2)-2, 4, 4)
        c.beginPath()
        c.strokeStyle = 'black'
        c.linewidth = 1
        c.strokeRect(this.position.x * tilesize, this.position.y * tilesize, tilesize, tilesize)

        if (this.type === null && this.angle != null)
            this.drawAngle(c)
    }
    getNearestNodes(nodes) {
        let returnarray = []
        let data = [[1,0], [0,1], [-1,0], [0,-1]]
        for (let d of data) {
            if(nodes[`${this.position.x+d[0]}-${this.position.y+d[1]}`]) 
                if(nodes[`${this.position.x+d[0]}-${this.position.y+d[1]}`].type != 'wall')
                    returnarray.push(nodes[`${this.position.x+d[0]}-${this.position.y+d[1]}`])
            
        }
        return returnarray
    }
}


const nodes = {}


for(let y = 0; y < canvas.height / tilesize; y++) {
    for(let x = 0; x < canvas.width / tilesize; x++) {
        nodes[`${x}-${y}`] = new Node(x, y)
    }
}
let player = new Player("darkgreen")

const npcs = []
for (let i = 0; i < 2; i++) {
    let npc = new NPC("darkred")
    npc.position.x = Math.floor(Math.random()* canvas.width)
    npc.position.y = Math.floor(Math.random()* canvas.height)
    npc.setTargetNode(nodes[`${Math.floor(npc.position.x/tilesize)}-${Math.floor(npc.position.y/tilesize)}`])
    npc.setNodePosition()
    npcs.push(npc)
}

const gameRender = () => {
    context.clearRect(0,0,canvas.width, canvas.height)
    for (let node in nodes) 
        nodes[node].draw(context)

    for(let npc of npcs) {
        npc.updatePosition()
        npc.draw(context)
    }
    player.updatePosition()
    player.setNodePosition()
    player.draw(context)
    window.requestAnimationFrame(gameRender)
}
gameRender()

const gameLoop = () => {
    
    for(let n in nodes) {
        nodes[n].visited = false
        nodes[n].weight = 0
        nodes[n].angle = null
        if(nodes[n].type != 'wall')
            nodes[n].type = null
    }

    if(nodes[`${player.nodePosition.x}-${player.nodePosition.y}`])
        floodNodes(nodes[`${player.nodePosition.x}-${player.nodePosition.y}`])

}
setInterval(gameLoop, 600)

// need to fix the direction bug,, gives invalid directions atm...
function floodNodes(startnode) {
    startnode.weight += 3
    startnode.direction = { x:0, y:0 }
    startnode.type = 'end'
    let nodeMap = [startnode]

    for(let nd of nodeMap) {
        nd.weight += 3
        // loop the nearest nodes of the nodeMap item
        for(let node of nd.getNearestNodes(nodes)) {
            if(nodeMap.indexOf(node) == -1) {
                nodeMap.push(node)
                node.weight++
                let angX = 0,
                    angY = 0,
                    dirX = 0,
                    dirY = 0;
                // calculate direction here
                // get nearest of the node and calculate firection by the surrounding node weights
                for(let c of node.getNearestNodes(nodes)) {
                    if(c.weight > 0) {
                        angX += ((node.position.x*tilesize+(tilesize/2)) - (c.position.x*tilesize+(tilesize/2)))
                        angY += ((node.position.y*tilesize+(tilesize/2)) - (c.position.y*tilesize+(tilesize/2)))
                        dirX -= (node.position.x - c.position.x)
                        dirY -= (node.position.y - c.position.y)
                    }
                }
                // if is in the outer corner of the wall, and is facing towards the corner
                // ---> if there is corner of the wall
                // ---> select the better node, that is closer to the final destination
                let tx = node.position.x + dirX,
                    ty = node.position.y + dirY;
                if(nodes[`${tx}-${ty}`] && nodes[`${tx}-${ty}`].type === 'wall') {
                    let n1 = nodes[`${tx-dirX}-${ty}`],
                        n2 = nodes[`${tx}-${ty-dirY}`];

                    let d1 = Math.sqrt(Math.pow(startnode.position.x - n1.position.x, 2) + Math.pow(startnode.position.y - n1.position.y, 2)),
                        d2 = Math.sqrt(Math.pow(startnode.position.x - n2.position.x, 2) + Math.pow(startnode.position.y - n2.position.y, 2));
                    if(d1 < d2) {
                        dirX = n1.position.x - node.position.x
                        dirY = n1.position.y - node.position.y
                        angX = ((node.position.x*tilesize+(tilesize/2)) - (n1.position.x*tilesize+(tilesize/2)))
                        angY = ((node.position.y*tilesize+(tilesize/2)) - (n1.position.y*tilesize+(tilesize/2)))
                    } else {
                        dirX = n2.position.x - node.position.x
                        dirY = n2.position.y - node.position.y
                        angX = ((node.position.x*tilesize+(tilesize/2)) - (n2.position.x*tilesize+(tilesize/2)))
                        angY = ((node.position.y*tilesize+(tilesize/2)) - (n2.position.y*tilesize+(tilesize/2)))
                    }
                    
                }
                node.setdirections(dirX, dirY)
                node.setAngle((nd.position.x-angX)*tilesize+(tilesize/2), (nd.position.y-angY)*tilesize+(tilesize/2))
            }
        }
    }
}