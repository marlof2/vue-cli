<template>
  <div>
  <v-btn v-if="type == 'visualization-action'" @click="getClick" :class="focus ? 'btn-action-type' : 'btn-action-type-without-focus'">
    <span :class="classIcon" style="font-size: 1.5rem" />
    <span style="font-size: 19px">
    {{label}}
        </span>
  </v-btn>
  
   <span
      v-if="type == 'edit-action'"
      @click.stop="getClick"
      :class="disabledEditAction ? 'btn-ok  desable-span': 'btn-ok'"
        
    >OK</span>
    <span
      v-if="type == 'remove-action'"
      class="btn-remove icon-close"
      @click.stop="getClick"
    />
    <div v-else></div>
  </div>
</template>

<script>
export default {
    props: {
    value: String,
    label: String,
    classIcon: String,
    focus: Boolean,
    click: Function,
    disabledEditAction: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'visualization-action'
    },
  },
  methods: {
    clickEmpty() {
    },
    getClick() {
      return typeof this.click == 'function'? this.click() : this.clickEmpty
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
.desable-span {
  pointer-events: none;
  opacity: 0.3;
}
.btn-ok {
  background: #20e47b;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 100%;
  width: 30px;
  height: 29px;
  font-size: 13px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;
}
.btn-remove {
  background: #f45959;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 100%;
  width: 30px;
  height: 29px;
  font-size: 11px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 10px;
}

.btn-action-type {
  height: 3rem !important;
  color: #0894c0 !important;
  background: #f1f1f1;
  width: 15rem;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.25);
  border-radius: 8px !important;
  border: 1px solid #0894c0;
  box-sizing: border-box;
  span {
    
    color: #0894c0 !important;
  }
}
.btn-action-type-without-focus {
  height: 3rem !important;
  background: #ffffff !important;
  border: 1px solid #bab6b6 !important;
  box-sizing: border-box;

  width: 15rem;
  box-shadow: none;
  border-radius: 8px !important;

  box-sizing: border-box;
  span {
    font-size: 18px;
    color: #a9a8a8 !important;
  }
}

.v-text-field--outlined fieldset {
  top: -2px !important;
  height: 54px;
  background: #ffffff;

  box-sizing: border-box;
  border-radius: 5px;
}
 
</style>

