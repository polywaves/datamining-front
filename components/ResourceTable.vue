<template>
  <div class="table-container">
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-size-7">
      <thead>
      <tr>
        <th></th>
        <th>Формула</th>
        <th>Результат</th>
        <th>Ожидаемый SE</th>
        <th>Сила на Em</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(field, index) in resources" :key="field.name">
        <td>
          <FormField v-bind:field="field" v-bind:index="'resources.' + index" @update-field="$parent.updateField" />
        </td>
        <td>{{ field.name }}</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import FormField from './Form/Field'

export default {
  name: "FormResourceTable",
  components: {
    FormField
  },
  props: ['resources']
}
</script>
