<template>
  <canvas
    ref="canvasRef"
    class="fixed top-0 left-0 -z-10 h-full w-full"
    :width="width"
    :height="height"
  ></canvas>
</template>

<script setup>
const starDensity = 0.216
const speedCoeff = 0.05
const width = ref(0)
const height = ref(0)
let starCount = 0
// let circleRadius = 0
// let circleCenter = 0
let first = true
const giantColor = '180,184,240'
const starColor = '226,225,142'
const cometColor = '226,225,224'
// let canva = document.getElementById("my-canvas");
const stars = []
let universe = null

const canvasRef = ref(null)

function createUniverse() {
  universe = canvasRef.value.getContext('2d')

  for (let i = 0; i < starCount; i++) {
    stars[i] = new Star()
    stars[i].reset()
  }

  draw()
}

function draw() {
  universe.clearRect(0, 0, width.value, height.value)

  const starsLength = stars.length

  for (let i = 0; i < starsLength; i++) {
    const star = stars[i]
    star.move()
    star.fadeIn()
    star.fadeOut()
    star.draw()
  }

  window.requestAnimationFrame(draw)
}

function Star() {
  this.reset = function () {
    this.giant = getProbability(3)
    this.comet = this.giant || first ? false : getProbability(10)
    this.x = getRandInterval(0, width.value - 10)
    this.y = getRandInterval(0, height.value)
    this.r = getRandInterval(1.1, 2.6)
    this.dx =
      getRandInterval(speedCoeff, 6 * speedCoeff) +
      (this.comet + 1 - 1) * speedCoeff * getRandInterval(50, 120) +
      speedCoeff * 2
    this.dy =
      -getRandInterval(speedCoeff, 6 * speedCoeff) -
      (this.comet + 1 - 1) * speedCoeff * getRandInterval(50, 120)
    this.fadingOut = null
    this.fadingIn = true
    this.opacity = 0
    this.opacityTresh = getRandInterval(0.2, 1 - (this.comet + 1 - 1) * 0.4)
    this.do = getRandInterval(0.0005, 0.002) + (this.comet + 1 - 1) * 0.001
  }

  this.fadeIn = function () {
    if (this.fadingIn) {
      this.fadingIn = !(this.opacity > this.opacityTresh)
      this.opacity += this.do
    }
  }

  this.fadeOut = function () {
    if (this.fadingOut) {
      this.fadingOut = !(this.opacity < 0)
      this.opacity -= this.do / 2
      if (this.x > width.value || this.y < 0) {
        this.fadingOut = false
        this.reset()
      }
    }
  }

  this.draw = function () {
    universe.beginPath()

    if (this.giant) {
      universe.fillStyle = 'rgba(' + giantColor + ',' + this.opacity + ')'
      universe.arc(this.x, this.y, 2, 0, 2 * Math.PI, false)
    } else if (this.comet) {
      universe.fillStyle = 'rgba(' + cometColor + ',' + this.opacity + ')'
      universe.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false)

      // comet tail
      for (let i = 0; i < 30; i++) {
        universe.fillStyle =
          'rgba(' + cometColor + ',' + (this.opacity - (this.opacity / 20) * i) + ')'
        universe.rect(this.x - (this.dx / 4) * i, this.y - (this.dy / 4) * i - 2, 2, 2)
        universe.fill()
      }
    } else {
      universe.fillStyle = 'rgba(' + starColor + ',' + this.opacity + ')'
      universe.rect(this.x, this.y, this.r, this.r)
    }

    universe.closePath()
    universe.fill()
  }

  this.move = function () {
    this.x += this.dx
    this.y += this.dy
    if (this.fadingOut === false) {
      this.reset()
    }
    if (this.x > width.value - width.value / 4 || this.y < 0) {
      this.fadingOut = true
    }
  }
  ;(function () {
    setTimeout(function () {
      first = false
    }, 50)
  })()
}

function getProbability(percents) {
  return Math.floor(Math.random() * 1000) + 1 < percents * 10
}

function getRandInterval(min, max) {
  return Math.random() * (max - min) + min
}

function windowResizeHandler() {
  width.value = window.innerWidth
  height.value = window.innerHeight
  starCount = width.value * starDensity
  // circleRadius = width > height ? height / 2 : width / 2
  // circleCenter = {
  //   x: width / 2,
  //   y: height / 2
  // }

  // canvasRef.value.setAttribute('width', width)
  // canvasRef.value.setAttribute('height', height)
}

onMounted(() => {
  if (canvasRef.value) {
    windowResizeHandler()
    createUniverse()

    window.addEventListener('resize', windowResizeHandler, false)
  }
})
</script>
