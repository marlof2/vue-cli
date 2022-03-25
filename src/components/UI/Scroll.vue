<template>
  <div :style="'height:' + this.height" v-bar>
    <div>
      <slot> </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: "100hv"
    }
  }
};
</script>

<style lang="scss" scoped>
.vb-dragger {
  width: 12px;
  right: 0;
}
.vb-dragger .vb-dragger-styler {
  backface-visibility: hidden;
  transform: rotate3d(0, 0, 0, 0);
  transition: background-color 0.5s ease-out, margin 100ms ease-out,
    height 100ms ease-out;
  background-color: #0875ba !important;
  margin: 5px 5px 5px 3px;
  border-radius: 20px;
  height: calc(100% - 10px);
  display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger .vb-dragger-styler {
  background-color: #0875ba45 !important;
}

.vb-dragger:hover .vb-dragger-styler {
  background-color: rgba(255, 255, 255, 0.5) !important;
  margin: 0px 3px 3px 1px;
  height: 100%;
}

.vb.vb-dragging > .vb-dragger .vb-dragger-styler {
  background-color: #0875ba !important;
  margin: 0px 3px 3px 1px;
  height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger .vb-dragger-styler {
  background-color: #0875ba !important;
}
</style>
