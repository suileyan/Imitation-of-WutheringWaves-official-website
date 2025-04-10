<template>
  <div class="mt-[0%] h-[65%] w-full border-t-1 border-t-[#b5aea1]">
    <div class="w-full mt-[2rem]">
      <swiper
        ref="swiperRef"
        :slides-per-view="2"
        :space-between="20"
        :modules="[Navigation, Autoplay]"
        :navigation="{
          prevEl: '.page-prev-btn',
          nextEl: '.page-next-btn',
        }"
        :centered-slides="true"
        :loop="true"
        @slideChange="onSlideChange"
        @swiper="onSwiperInit"
      >
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <img :src="slide.image" alt="" />
        </swiper-slide>
      </swiper>
      <div class="relative flex justify-between items-center mt-12 ml-32">
        <div class="text-5xl font-bold text-[#DAB67D]" ref="name">
          {{ scene[currentPage - 1].name }}
        </div>
        <div class="absolute top-0 left-1/2 flex items-baseline translate-x-[-50%]" ref="introduce">
          <div
            class="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[7px] border-l-[#C6AD6B] mr-2"
          ></div>
          <div class="introduce-text text-left text-sm text-[#DAB67D]">
            {{ scene[currentPage - 1].introduce }}
          </div>
        </div>
        <div class="absolute top-0 right-20 flex min-w-20">
          <div class="h-10 page-prev-btn" @click="slidePrev">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIsAAAAkCAYAAAC5U8nEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+tpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMC1jMDAwIDc5LjE3MWMyN2ZhYiwgMjAyMi8wOC8xNi0yMjozNTo0MSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDI0LTEyLTAyVDE0OjAxOjE5KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0xMi0wMlQxNDowMzo0MCswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0xMi0wMlQxNDowMzo0MCswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkQ5MDUzQUNCMDczMTFFRjgwQTc5MDJEMjI0NjBGMjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkQ5MDUzQURCMDczMTFFRjgwQTc5MDJEMjI0NjBGMjIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyRDkwNTNBQUIwNzMxMUVGODBBNzkwMkQyMjQ2MEYyMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyRDkwNTNBQkIwNzMxMUVGODBBNzkwMkQyMjQ2MEYyMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PscRed8AAAFZSURBVHja7JxBSgJhHEfHmI0RWUgX0AsYRYuIsDDadYkEYRbSvk2HaGEEQTcIEUTMe0SWFBHRphvE+Pvw30ac+WYhLfQ9eDirWfx4zOgo5ro3USkAyEAoX+WIKcBDKbSDMluAh3iFDSArxALEAsQCxALEAsQCxALwr7GsyX1mJRYf67IrH2WNaYkliYKFciC/5QvTLh7hHM6xIXtyL5h8IXks35mWWKbZlH25Y1cTF8oHs3IbmqYoBxbKs6wSCrHMYsveyG7LJwvlkzmJZRZNWbHjS/nFlMSSxJW8t2P3esiUxJLErzyXd8HkQZz72HzEnMSSFkxd3spV2Ql4GEcsKcSyIVsWTFueMiuxpAUTyWuZlw/yhGkXj3BO54ntE5K7NZ3JIdNyZfEFcyF35RvTEksWfpiVWIBYAIgFiAWIBYgFiAWWkL8nuPz7E2SKxf3Ius8U4GE0FmAAsyEvm9GI43oAAAAASUVORK5CYII="
              alt=""
            />
          </div>
          <div class="h-10 page-next-btn" @click="slideNext" ref="nextBtn">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIsAAAAkCAYAAAC5U8nEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+tpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMC1jMDAwIDc5LjE3MWMyN2ZhYiwgMjAyMi8wOC8xNi0yMjozNTo0MSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDI0LTEyLTAyVDE0OjAxOjE5KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0xMi0wMlQxNDowMzo0NiswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0xMi0wMlQxNDowMzo0NiswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzE3ODY4OURCMDczMTFFRjk0QzFEMzQ4MEI3NUExREQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzE3ODY4OUVCMDczMTFFRjk0QzFEMzQ4MEI3NUExREQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMTc4Njg5QkIwNzMxMUVGOTRDMUQzNDgwQjc1QTFERCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMTc4Njg5Q0IwNzMxMUVGOTRDMUQzNDgwQjc1QTFERCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlhqwA4AAAFOSURBVHja7JzBSgJRGEYtZlOEEuEL6AtEhQsRSVB6j2gRRZu2rXyHIHIh+AYWglD5HkVliUStfIOy7+LvZug6A85qOgcO3tUsfg5c7x1xpX99UsgAxCCQr3LIKCCCQmCLIrOACKarzADiQixALEAsQCxALEAsQCwAxPJPKcsNYoEo6nIg+zJLLLAI977vS1YsmByxgI83uZ+ZvSB229FdEsEQS3oZWTAvsmTb0iaxgI+xBfMkd+WD3CIW8PEha/JR7lgweWIBH5/ywtbb8oxYwEdVdmztPpvEAn9Rs+Ozu6Bry0P5TSwQxl3O9eS6bMkj+cMXXAhzIG8tlCt5LKccnSFMQ3blmryUp8uG4giYayp5thPQjTxPIhRiSS/vck9Oknwo21B6mST9QGIBYgFiAWIBYgFiAWIBWMj8Uo5/f4JYsbgf9d4zCohg+CvAAP25L2v8p8AFAAAAAElFTkSuQmCC"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { scene } from '@/assets/data/scene'
import { ref } from 'vue'
import { gsap } from 'gsap'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const slides = scene
const currentPage = ref(1)
const swiperRef = ref<{ swiper: SwiperType } | null>(null)
const name = ref<HTMLElement | null>(null)
const introduce = ref<HTMLElement | null>(null)

const onSlideChange = (swiper: SwiperType) => {
  currentPage.value = swiper.realIndex + 1
}

const onSwiperInit = (swiper: SwiperType) => {
  swiperRef.value = { swiper }
}

const slidePrev = () => {
  swiperRef.value?.swiper.slidePrev()
}

const slideNext = () => {
  if (swiperRef.value && swiperRef.value.swiper) {
    swiperRef.value.swiper.slideNext()
  }
}

const star = () => {
  gsap.fromTo(
    name.value,
    {
      opacity: 0,
    },
    {
      delay: 0.5,
      opacity: 1,
      duration: 1,
      ease: 'power2.inOut',
    },
  )
  gsap.fromTo(
    introduce.value,
    {
      opacity: 0,
    },
    {
      delay: 0.5,
      opacity: 1,
      duration: 1,
      ease: 'power2.inOut',
    },
  )
}

defineExpose({ star })
</script>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  height: 100%;
  background-color: #000;
}
.introduce-text {
  white-space: pre-line;
}
</style>
