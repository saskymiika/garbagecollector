
canvas.addEventListener('mousedown', e => {
    if(e.button == 0) {
        // canvas.ismousedown = true
        // for(let n in nodes) {
        //     nodes[n].visited = false
        //     nodes[n].weight = 0
        //     nodes[n].angle = null
        //     if(nodes[n].type != 'wall')
        //         nodes[n].type = null
        // }
        
        // let x = Math.floor(e.offsetX/tilesize),
        //     y = Math.floor(e.offsetY/tilesize);

        // if(nodes[`${x}-${y}`])
        //     floodNodes(nodes[`${x}-${y}`])
    }
    else {
        let x = Math.floor(e.offsetX/tilesize),
            y = Math.floor(e.offsetY/tilesize);
        if(nodes[`${x}-${y}`].type != 'wall') {
            canvas.isdrawingwalls = true
            nodes[`${x}-${y}`].type = 'wall'

            if(localstorageWalls.indexOf(`${x}-${y}`) == -1) {
                localstorageWalls.push(`${x}-${y}`)
                localStorage.setItem('walls', localstorageWalls.join(','))
            }
        }
        else {
            nodes[`${x}-${y}`].type = null
            if(localstorageWalls.indexOf(`${x}-${y}`) != -1) {
                localstorageWalls.splice(localstorageWalls.indexOf(`${x}-${y}`), 1)
                localStorage.setItem('walls', localstorageWalls.join(','))
            }
        }
    }
})
canvas.addEventListener('contextmenu', e => {
    e.preventDefault()
})
canvas.addEventListener('mouseup', e => {
    if(e.button == 0) {
        canvas.ismousedown = false
    }
    else
        canvas.isdrawingwalls = false

})
canvas.addEventListener('mousemove', e => {  
    if(canvas.isdrawingwalls) {
        let x = Math.floor(e.offsetX/tilesize),
            y = Math.floor(e.offsetY/tilesize)
        
        if(nodes[`${x}-${y}`]) {
            if (nodes[`${x}-${y}`].type === null) {
                nodes[`${x}-${y}`].type = 'wall'
                
                if(localstorageWalls.indexOf(`${x}-${y}`) == -1) {
                    localstorageWalls.push(`${x}-${y}`)
                    localStorage.setItem('walls', localstorageWalls.join(','))
                }
            }
        } 
    }
})

window.addEventListener('keydown', e => {
    e.preventDefault()
    if(e.key === player.keys.up) {
        player.isMoving.up = true
    }
    if(e.key === player.keys.down) {
        player.isMoving.down = true
    }
    if(e.key === player.keys.left) {
        player.isMoving.left = true
    }
    if(e.key === player.keys.right) {
        player.isMoving.right = true
    }
})
window.addEventListener('keyup', e => {
    e.preventDefault()
    if(e.key === player.keys.up) {
        player.isMoving.up = false
    }
    if(e.key === player.keys.down) {
        player.isMoving.down = false
    }
    if(e.key === player.keys.left) {
        player.isMoving.left = false
    }
    if(e.key === player.keys.right) {
        player.isMoving.right = false
    }
})

window.onload = function() {
    if(localStorage.getItem('walls')) {
        localstorageWalls = localStorage.getItem('walls').split(',')

        for(let w of localstorageWalls) {
            nodes[w].type = 'wall'
        }
    }
}