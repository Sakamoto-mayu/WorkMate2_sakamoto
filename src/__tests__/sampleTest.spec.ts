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
