import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Foo from '@/Foo.vue'

test('setSelected demo', async () => {
  const wrapper = mount(Foo)
  const options = wrapper.find('select').findAll('option')

  await options.at(1).setSelected()

  expect(wrapper.find('option:checked').element.value).toBe('bar')
})
