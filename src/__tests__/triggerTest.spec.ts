// 初期描写以降にアクションを加えたテスト  trigger()メソッド clickなどを再現

import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import triggerTest from '@/triggerTest.vue'

describe('クリックイベントで表示/非表示をv-ifで切り替え', () => {
  test('初期値、非表示の状態', () => {
    const wrapper = mount(triggerTest)
    // getとfindの違い  要素がなかった時：get→エラー。find→エラーにならない。
    const actual = wrapper.find(`[data-testid="invisible"]`).exists()
    const expected = false
    expect(actual).toBe(expected)
  })
  test('表示ボタンをクリック後文字が表示される', async () => {
    const wrapper = mount(triggerTest)
    // trigge()  メソッドでクリックなどを再現
    await wrapper.get(`[data-testid="showButton"]`).trigger('click')
    const actual = wrapper.find(`[data-testid="invisible"]`).exists()
    const expected = true
    expect(actual).toBe(expected)
  })
})
