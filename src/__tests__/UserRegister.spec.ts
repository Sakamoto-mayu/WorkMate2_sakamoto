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
    const actual = wrapper.find(`[data-testid="errorMsg"]`).exists()
    const expected = false
    expect(actual).toBe(expected)
  })
  test('全項目未入力', async () => {
    const wrapper = mount(UserRegister)
    await wrapper.find(`[data-testid="name"]`).setValue('')
    await wrapper.find(`[data-testid="department"]`).setSelected('')
    await wrapper.find(`[data-testid="email"]`).setValue('')
    await wrapper.find(`[data-testid="password"]`).setValue('')
    const actual = wrapper.get(`[data-testid="errorMsg"]`).text()
    const expected = 'フォームを入力してください'
    expect(actual).toBe(expected)
  })
})
