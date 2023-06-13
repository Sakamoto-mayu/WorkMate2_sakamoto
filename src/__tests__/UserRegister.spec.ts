import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserRegister from '@/views/UserRegister.vue'

describe('ユーザー登録画面の入力バリデーション', () => {
  test('全項目入力', async () => {
    const wrapper = mount(UserRegister)
    await wrapper.find(`[data-testid="name"]`).setValue('ラクス太郎')
    await wrapper.find(`[data-testid="department"]`).setSelected('総務')
    await wrapper.find(`[data-testid="email"]`).setValue('rakus@example.com')
    await wrapper.find(`[data-testid="password"]`).setValue('rakus123')
    await wrapper.find(`[data-testid="submit"]`).trigger('submit')
    const actual = wrapper.find(`[data-testid="errorMsg"]`).text()
    const expected = ''
    expect(actual).toBe(expected)
  })
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
})

// describe('UserRegister', () => {
//   test('フォームが空の場合、エラーメッセージが表示されること', async () => {
//     const wrapper = mount(UserRegister)
//     const form = wrapper.find(`[data-testid="submit"]`)
//     await form.trigger('submit')

//     const errorMessage = wrapper.find('[testid="errorMsg"]')
//     expect(errorMessage.text()).toBe('※フォームを入力してください')
//     console.log(errorMessage.text())
//   })
// })

// import { describe, test, expect } from 'vitest'
// import { mount, shallowMount } from '@vue/test-utils'
// import UserRegister from '@/views/UserRegister.vue'

// describe('ユーザー登録画面の入力バリデーション', () => {
//   test('全項目入力', async () => {
//     const wrapper = shallowMount(UserRegister)
//     wrapper.vm.departmentData = ['総務', '人事', '開発']
//     const options = wrapper.find('select').findAll('option')
//     console.log('オプションだよ', options)
//     // await options.at(1).setSelected()
//     await wrapper.find(`[data-testid="name"]`).setValue('ラクス太郎')
//     await wrapper.find(`[data-testid="department"]`).setSelected('総務')
//     await wrapper.find(`[data-testid="email"]`).setValue('rakus@example.com')
//     await wrapper.find(`[data-testid="password"]`).setValue('rakus123')
//     const actual = wrapper.find(`[data-testid="errorMsg"]`).text()
//     console.log(actual)
//     const expected = ''
//     expect(actual).toBe(expected)
//   })
// })
