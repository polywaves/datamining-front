<template>
  <b-field v-if="field.type === 'select'" :label="field.label" label-position="on-border" class="select is-primary is-fullwidth">
    <select :name="field.name" :id="field.name" v-model="value">
      <option v-for="(item, index) in field.items" :value="index">{{ item }}</option>
    </select>
  </b-field>

  <b-field v-else-if="field.type === 'checkbox'" :label="field.label" label-position="on-border">
    <b-checkbox :name="field.name" v-model="value"></b-checkbox>
  </b-field>

  <b-field v-else-if="field.type" :label="field.label" label-position="on-border">
    <input v-if="field.rules && field.rules.min && field.rules.max" :min="field.rules.min" :max="field.rules.max" class="input is-info" :name="field.name" :type="field.type" v-model="value" :step="field.rules.step" />
    <input v-else-if="field.rules && field.rules.required" required class="input is-info" :name="field.name" :type="field.type" v-model="value" :step="field.rules.step" />
    <input v-else class="input is-info" :name="field.name" :type="field.type" v-model="value" :step="field.step" />
  </b-field>
</template>

<script>
export default {
  name: "FormField",
  props: ['field', 'index'],
  data() {
    return {
      value: this.field.value
    }
  },
  watch: {
    value(val) {
      this.$emit('update-field', val, this.index)
    }
  }
}
</script>
