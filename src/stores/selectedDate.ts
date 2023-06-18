// 月次勤怠でクリックした日付(date)の値を保持する
import { defineStore } from 'pinia'

export const useSelectedDateStore = defineStore('selectedDate', {
  state: () => ({
    selectedDate: null,
    userRole: ''
  }),

  actions: {
    setSelectedDate(date: any) {
      this.selectedDate = date
    },
    setRole(role: string) {
      this.userRole = role
    }
  }
})
