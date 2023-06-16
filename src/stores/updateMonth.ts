// 月次勤怠でクリックした日付(date)の値を保持する
import { defineStore } from 'pinia';

export const useUpdateMonthStore = defineStore('updateMonth', {
  state: () => ({
    currentYear: '',
    currentMonth: '',
    newToday: new Date()
    }),

  actions: {
    updateYear(year: any) {
      this.currentYear = year
    },
    updateMonth(month: any) {
        this.currentMonth = month
    },
    setToday(today: any) {
      this.newToday = today
    }
  }
})
