
<template>
  <v-text-field
    background-color="white"
    dense
    outlined
    :label="label"
    v-model="localValue"
    :rules="rules"
    :append-icon="appendIcon"
  ></v-text-field>
</template>
<script>
export default {
    props: {
        label: {
            type: String
        },
        value: {
            type: String,
        },
        rules: {
            type: Array,
            default:() => ([])
        },
        'append-icon': {
            type: String,
            default: () => ('')
        }
    },
    computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
}
</script>