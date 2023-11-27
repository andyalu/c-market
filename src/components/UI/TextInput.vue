<template>
  <div class="input-wrapper flex center">
    <input
      type="text"
      class="text-input"
      :value="textInputData.modelValue"
      :id="textInputData.id"
      :placeholder="textInputData.placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <i class="bi bi-search"></i>
  </div>
</template>

<script setup>
const props = defineProps({
  textInputData: Object,
});

defineEmits(["update:modelValue"]);
</script>

<style>
.input-wrapper {
  min-height: 34px;
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid #ccc;
  padding-right: 0.5rem;
}
.text-input {
  height: 100%;
  padding: 0 1rem;
  font-size: 1rem;
  border-radius: 5px;
  background-color: #fff;
  border: none;
  outline: none;
}
</style>
