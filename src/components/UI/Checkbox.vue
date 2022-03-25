<template>
  <div>

 <v-checkbox
    v-if="noModel"
    :input-value="valueCheckbox"
    :label="label"
    on-icon="icon-tick"
    :class="type=='with-border'? 'with-border': ''"
    @click.stop="onClick"
    :disabled="disabled"
     
  />
  <v-checkbox
    v-else
    v-model="localValue"
    :value="valueCheckbox"
    :label="label"
    on-icon="icon-tick"
    :class="type=='with-border'? 'with-border': ''"
    @click.stop="onClick"
    :disabled="disabled"
    :hide-details="hideDetails"
     
  /> 
    <!-- <v-checkbox
            v-model="localValue"
            :value="valueCheckbox"
            :label="label"
            on-icon="icon-tick"
            class="custom-checkbox"
          />-->
  </div>
</template>

<script>
export default {
  props: {
    hideDetails: {
      type: Boolean,
      default: false,
    },
    value: [Boolean, Array], 
    label: String, 
    valueCheckbox: [Boolean, Number, String], 
    "hide-details": Boolean,
    type: String,
    noModel: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function,
      default: () => ({
      })
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
};
</script>
<style lang="scss" scoped>
.with-border {
::v-deep  .v-input__slot .v-input--selection-controls__input .v-icon {
border: 1px solid #8A8A8A;
      box-sizing: border-box;
      border-radius: 4px;
  }
      
}
.v-input--checkbox {
  margin-top: 0 !important;
}

::v-deep .v-input__control .v-input__slot {
  .v-input--selection-controls__input .v-icon {
    background: white !important;
    color: white !important;

  }
  label {
    margin-bottom: 0;
  }
}

::v-deep .icon-tick {
  background-color: white !important;

  &::before {
    color: #7692DB !important;
  }
  font-size: 15px !important;
}
</style>