import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const state = {
    count: ref(0),
    officialWebsite: ref('https://mc.kurogames.com/main'),
  }

  const getters = {
    doubleCount: computed(() => state.count.value * 2),
  }

  const actions = {
    increment() {
      state.count.value++
    },
    // setOfficialWebsite(newUrl: string) {
    //   state.officialWebsite.value = newUrl
    // },
  }

  // 合并 state、getters 和 actions 到一个对象中
  const store = {
    ...state,
    ...getters,
    ...actions,
  }

  return store
})
