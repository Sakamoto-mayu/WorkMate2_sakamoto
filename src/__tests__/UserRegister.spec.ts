import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, reactive } from 'vue'
import UserRegister from '@/views/UserRegister.vue'

// describe('ユーザー登録画面の入力バリデーション', () => {
//   test('全項目入力', async () => {
//     const wrapper = mount(UserRegister)
//     await wrapper.find(`[data-testid="name"]`).setValue('ラクス太郎')
//     await wrapper.find(`[data-testid="department"]`).setSelected('総務')
//     await wrapper.find(`[data-testid="email"]`).setValue('rakus@example.com')
//     await wrapper.find(`[data-testid="password"]`).setValue('rakus123')
//     await wrapper.find(`[data-testid="submit"]`).trigger('submit')
//     const actual = wrapper.find(`[data-testid="errorMsg"]`).text()
//     const expected = ''
//     expect(actual).toBe(expected)
//   })
//   test('全項目未入力', async () => {
//     const wrapper = mount(UserRegister)
//     await wrapper.find(`[data-testid="name"]`).setValue('')
//     await wrapper.find(`[data-testid="department"]`).setSelected('')
//     await wrapper.find(`[data-testid="email"]`).setValue('')
//     await wrapper.find(`[data-testid="password"]`).setValue('')
//     await wrapper.find(`[data-testid="submit"]`).trigger('submit')
//     const actual = wrapper.find(`[data-testid="errorMsg"]`).text()
//     const expected = '※フォームを入力してください'
//     expect(actual).toBe(expected)
//   })
// })

// describe('UserRegister', () => {
//   test('フォームが空の場合、エラーメッセージが表示されること', async () => {
//     const wrapper = mount(UserRegister)
//     const form = wrapper.find(`[data-testid="submit"]`)
//     await form.trigger('submit')

//     const errorMessage = wrapper.find('[testid="errorMsg"]')
//     expect(errorMessage.contains()).toBe('※フォームを入力してください')
//     console.log(errorMessage.text())
//   })
// })

describe('ユーザー登録画面の入力バリデーション', async () => {
  test('全項目入力した時""が返る', async () => {
    const departmentData = ref({ id: 1, department_name: 'Department A' })

    const wrapper = mount(UserRegister, {
      props: {
        departmentData: departmentData.value
      }
    })

    // function setDepartment() {
    //   const select = wrapper.find('select')
    //   // select要素のvalueを変更
    //   select.element.value = departmentData.value.department_name
    //   // changeイベントをトリガー
    //   select.trigger('change')
    //   expect(select.element.value).toBe('Department A')
    // }
    // setDepartment()

    async function setAll() {
      await wrapper.find(`[data-testid="name"]`).setValue('ラクス太郎')
      // await wrapper.find(`[data-testid="department"]`).setValue(departmentData.value.department_name)
      // setDepartment()
      await wrapper.find(`[data-testid="email"]`).setValue('rakus@example.com')
      await wrapper.find(`[data-testid="password"]`).setValue('rakus123')
    }

    await setAll()
    await wrapper.find(`[data-testid="submit"]`).trigger('submit')
    const actual = wrapper.find(`[data-testid="errorMsg"]`).text()
    console.log(actual)
    const expected = ''
    expect(actual).toBe(expected)
  })
})

// describe('ユーザー登録画面の入力バリデーション', () => {
//   test('エラーメッセージが表示されること', async () => {
//     const wrapper = mount(UserRegister)

//     // エラーメッセージが初期状態では表示されないことを確認
//     const errorMsg = wrapper.find('[data-testid="errorMsg"]')
//     expect(errorMsg.exists()).toBe(false)

//     // 必須項目を空のままフォームを送信する
//     await wrapper.find(`[data-testid="submit"]`).trigger('submit')

//     await wrapper.vm.$nextTick(() => {
//       // エラーメッセージが表示されることを確認
//       expect(errorMsg.text()).toContain('フォームを入力してください')
//     })
//   })
// })
