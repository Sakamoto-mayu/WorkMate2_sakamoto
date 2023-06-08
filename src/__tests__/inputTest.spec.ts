// 初期描写以降にアクションを加えたテスト  setValue() inputなどを再現

import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import inputTest from '@/inputTest.vue'

describe('inputしたnum1とnum2の割り算', () => {
  test('初期値のnum1=6,num2=3の場合', () => {
    const wrapper = mount(inputTest)
    const actual = wrapper.get(`[data-testid="ans"]`).text()
    const expected = '2'
    expect(actual).toBe(expected)
  })
  test('num1=8,num2=2が入力された場合の想定--!setValueで入力値を設定する!--', async () => { //  初期状態より後の状態にしたいのでasync awaitを使う
    const wrapper = mount(inputTest)
    await wrapper.get(`[data-testid="num1"]`).setValue(8)
    await wrapper.get(`[data-testid="num2"]`).setValue(2)
    const actual = wrapper.get(`[data-testid="ans"]`).text()
    const expected = '4'
    expect(actual).toBe(expected)
  })
})
