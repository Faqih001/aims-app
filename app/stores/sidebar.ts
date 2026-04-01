import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isCollapsed: false,
    isOpenMobile: false,
  }),
  actions: {
    toggle() {
      this.isCollapsed = !this.isCollapsed
    },
    toggleMobile() {
      this.isOpenMobile = !this.isOpenMobile
    },
    set(collapsed: boolean) {
      this.isCollapsed = collapsed
    },
    setMobile(open: boolean) {
      this.isOpenMobile = open
    },
  },
})
