<template>
  <v-card>
    <v-tabs v-model="tab" icons-and-text>
      <v-tabs-slider></v-tabs-slider>
      <v-tab v-for="tab in this.showTabs" :key="tab.name" :href="'#' + tab.id">
        {{ tab.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="tab in this.showTabs" :key="tab.name" :value="tab.id">
        <v-card flat>
          <slot :name="tab.id"></slot>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      normalizedTabs: []
    };
  },
  props: {
    tabs: Array,
    value: {
      type: String,
      default: null
    },
    onChangeTab: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    tab: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    showTabs() {
      this.normalizeTabs();
      return this.normalizedTabs.filter(tab => tab.show !== false);
    }
  },
  methods: {
    normalizeTabs() {
      this.normalizedTabs = this.tabs.map(tab => {
        if (!Object.prototype.hasOwnProperty.call(tab, "id")) {
          tab.id = tab.name.replace(" ", "_").toLowerCase();
        }
        return tab;
      });
    }
  },
  watch: {
    tab: {
      handler: function(newVal) {
        if (newVal !== null) {
          this.onChangeTab(newVal);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .v-tabs > .v-tabs-bar {
  background: #f6f4f4;
  .v-tab {
    color: #a9a8a8;
    opacity: 0.5;
  }
}
::v-deep .v-tab--active {
  background: #ffffff;
  border-radius: 4px 0px 0px 0px;

  color: #0894c0 !important;
  opacity: 1 !important;
}
::v-deep .v-tabs-slider {
  background-color: transparent;
}
::v-deep .v-slide-group__wrapper {
  max-height: 55px;
}
::v-deep .v-tabs {
  max-height: 55px;
  color: black;
}
::v-deep .v-tabs-items {
  padding: 20px;
}
::v-deep .v-card {
  color: black !important;
}
</style>
