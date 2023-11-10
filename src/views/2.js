function random(min, max) {
  return Math.random() * (max - min) + min
}

class Firework {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.vx = random(-5, 5)
    this.vy = random(-15, -10)
    this.gravity = 0.5
    this.alpha = 1
    this.particles = []
    this.maxParticles = 100
    this.color = `hsl(${random(0, 360)}, 100%, 50%)`
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.vy += this.gravity
    this.alpha -= 0.02

    if (this.alpha <= 0) {
      this.explode()
    }
  }

  explode() {
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(new Particle(this.x, this.y, this.color))
    }
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI)
    ctx.fillStyle = this.color
    ctx.globalAlpha = this.alpha
    ctx.fill()

    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update()
      this.particles[i].draw()

      if (this.particles[i].alpha <= 0) {
        this.particles.splice(i, 1)
      }
    }
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x
    this.y = y
    this.vx = random(-3, 3)
    this.vy = random(-3, 3)
    this.gravity = 0.1
    this.alpha = 1
    this.color = color
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.vy += this.gravity
    this.alpha -= 0.01
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI)
    ctx.fillStyle = this.color
    ctx.globalAlpha = this.alpha
    ctx.fill()
  }
}

let fireworksList = []

function animationLoop() {
  requestAnimationFrame(animationLoop)

  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)

  fireworksList.forEach((firework, index) => {
    firework.update()
    firework.draw()

    //   if (!firework.particles.length) {
    //     fireworksList.splice(index, 1)
    //   }
  })
}

canvas.addEventListener('click', event => {
  fireworksList.push(new Firework(400, 400))
})

animationLoop()
