<template>
  <div>
    <v-tooltip top :content-class="`tooltipDefault ${contentClass}`">
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on">
          <v-btn
            @click="onClick"
            x-large
            rounded
            :color="colorBtn"
            :class="`pr-15 pl-15 elevation-0 white--text mx-3  ${contentClassBtn}`"
            :disabled="!conditionToShow"
          >
            <v-icon v-if="titleIcon" left size="25" class="mr-3"> {{ titleIcon }} </v-icon>
            {{ titleBtn }}
          </v-btn>
        </div>
      </template>
        <span v-if="conditionToShow">{{ titleToWhenActiveTooltip }}</span>
          <span v-else>{{ titleToWhenDisabledTooltip }}</span>
    </v-tooltip>
   
  </div>
</template>

<script>
export default {
  props: {
    contentClass: {
      type: String,
      default: '',
    },
    contentClassBtn: {
      type: String,
      default: '',
    },
    colorBtn: {
      type: String,
      default: '',
    },
    
    conditionToShow: {
      type: Boolean,
      default: true,
    },
    onClick: {
      type: Function,
      default: () => {}
    },
    titleBtn: String,
    titleIcon: String,
    titleToWhenActiveTooltip: String,
    titleToWhenDisabledTooltip: String
  },
};
</script>
<style lang="scss" scoped>

.tooltipDefault {
  border: 1px solid #eee9c0 !important;
  background: #fef2c9 !important;
  color: #ad6b03 !important;
  font-weight: normal !important;
  font-size: 14px !important;
  line-height: 1;
  margin-left: -30px;
}
</style>
