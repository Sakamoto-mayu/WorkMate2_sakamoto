<!-- Foo.vue -->
<template>
  <div>
    <select v-model="selectedOption">
      <option value="foo">Foo</option>
      <option value="bar">Bar</option>
      <option value="baz">Baz</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedOption: ''
    }
  }
}
</script>
