<template>
  <div ref="container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 类型定义 -------------------------------------------------
interface ComponentState {
  container: Ref<HTMLElement | null>
  scene?: THREE.Scene
  camera?: THREE.PerspectiveCamera
  renderer?: THREE.WebGLRenderer
  controls?: OrbitControls
  p?: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>
  animationFrameId?: number
}

// 组件逻辑 -------------------------------------------------
const state: ComponentState = {
  container: ref<HTMLElement | null>(null),
}

const gu = {
  time: { value: 0 } as THREE.IUniform<number>,
}

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let p: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>
let animationFrameId: number | undefined

onMounted(() => {
  if (!state.container.value) return

  // 初始化场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x160016)

  // 初始化相机
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.set(0, 4, 21)

  // 初始化渲染器
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  state.container.value.appendChild(renderer.domElement)

  // 窗口resize处理
  window.addEventListener('resize', handleResize)

  // 初始化控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  // 创建粒子系统
  setupParticles()

  // 动画循环
  const clock = new THREE.Clock()
  const animate = () => {
    if (!state.camera || !state.renderer || !state.p) return

    const t = clock.getElapsedTime() * 0.5
    gu.time.value = t * Math.PI
    state.p.rotation.y = t * 0.05
    state.controls?.update()
    state.renderer.render(state.scene!, state.camera)
    animationFrameId = requestAnimationFrame(animate)
  }
  animate()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  state.controls?.dispose()
  state.renderer?.dispose()
})

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function setupParticles() {
  const sizes: number[] = []
  const shift: number[] = []

  const pushShift = () => {
    shift.push(
      Math.random() * Math.PI,
      Math.random() * Math.PI * 2,
      (Math.random() * 0.9 + 0.1) * Math.PI * 0.1,
      Math.random() * 0.9 + 0.1,
    )
  }

  // 创建粒子位置
  const pts = new Array(50000).fill(null).map(() => {
    sizes.push(Math.random() * 1.5 + 0.5)
    pushShift()
    return new THREE.Vector3().randomDirection().multiplyScalar(Math.random() * 0.5 + 9.5)
  })

  // 添加更多粒子
  for (let i = 0; i < 100000; i++) {
    const r = 10,
      R = 40
    const rand = Math.pow(Math.random(), 1.5)
    const radius = Math.sqrt(R * R * rand + (1 - rand) * r * r)
    pts.push(
      new THREE.Vector3().setFromCylindricalCoords(
        radius,
        Math.random() * 2 * Math.PI,
        (Math.random() - 0.5) * 2,
      ),
    )
    sizes.push(Math.random() * 1.5 + 0.5)
    pushShift()
  }

  // 创建几何体
  const geometry = new THREE.BufferGeometry().setFromPoints(pts)
  geometry.setAttribute('sizes', new THREE.Float32BufferAttribute(sizes, 1))
  geometry.setAttribute('shift', new THREE.Float32BufferAttribute(shift, 4))

  // 创建材质
  const material = new THREE.PointsMaterial({
    size: 0.125,
    transparent: true,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  })

  // 修改shader
  material.onBeforeCompile = (shader) => {
    shader.uniforms.time = gu.time
    shader.vertexShader = `
      uniform float time;
      attribute float sizes;
      attribute vec4 shift;
      varying vec3 vColor;
      ${shader.vertexShader}
    `
      .replace(`gl_PointSize = size;`, `gl_PointSize = size * sizes;`)
      .replace(
        `#include <color_vertex>`,
        `#include <color_vertex>
        float d = length(abs(position)/vec3(40.,10.,40));
        d=clamp(d,0.,1.);
        vColor = mix(vec3(227.,155.,0.),vec3(100.,50.,255.),d)/255.;`,
      )
      .replace(
        `#include <begin_vertex>`,
        `#include <begin_vertex>
        float t = time;
        float moveT = mod(shift.x + shift.z * t, PI2);
        float moveS = mod(shift.y + shift.z * t, PI2);
        transformed += vec3(cos(moveS) * sin(moveT),cos(moveT),sin(moveS)*sin(moveT)) * shift.w;`,
      )

    shader.fragmentShader = `
      varying vec3 vColor;
      ${shader.fragmentShader}
    `
      .replace(
        `#include <clipping_planes_fragment>`,
        `#include <clipping_planes_fragment>
        float d = length(gl_PointCoord.xy - 0.5);`,
      )
      .replace(
        `vec4 diffuseColor = vec4( diffuse, opacity );`,
        `vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.1, d));`,
      )
  }

  p = new THREE.Points(geometry, material)
  p.rotation.order = 'ZYX'
  p.rotation.z = 0.2
  scene.add(p)
}
</script>

<style scoped>
div {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}
</style>
