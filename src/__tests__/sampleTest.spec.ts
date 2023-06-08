// 初期描写の状態のみをテストする  mount() vueページを擬似的にmountする
// function.ts 機能のみ

import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import sampleTest from '@/sampleTest.vue'

describe('sampleTest.vueのテスト', () => {
  test('初期値での表示内容テスト', () => {
    const wrapper = mount(sampleTest)
    const actual = wrapper.get('p').text()
    const expected = '6÷3=2'
    expect(actual).toBe(expected)
  })
})
