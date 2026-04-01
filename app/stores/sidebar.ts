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
    set(collapsed: boolean) {
      this.isCollapsed = collapsed
    },
    toggleMobile() {
      this.isOpenMobile = !this.isOpenMobile
    },
    setMobile(isOpen: boolean) {
      this.isOpenMobile = isOpen
    },
  },
})
