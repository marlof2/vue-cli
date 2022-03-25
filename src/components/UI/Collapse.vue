<template>
<div >
    <v-card :class="'style-no-crud mb-6' " :disabled="disabled">
      <v-row @click="onClickLocal">
        <v-col cols="auto" class="no-padding-right">
          <v-btn class="ml-5"  icon >
            <v-icon x-large>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="auto" align-self="center">
          <label class="card-title-not-crud">{{ title }}</label>
        </v-col>
      </v-row>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text class="accordion">
               <slot></slot>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
</div>
</template>
<script>

export default {
  beforeMount() {

  },   
  props: {
    
      title: String,
      onClick: {
          type: Function,
          default: () => ({})
      },
      disabled: {
        type: Boolean,
        default() {
          return false;
        }
      },
      close: {
        type: Boolean,
        default() {
          return false;
        }
      }
  },
  mounted() {
    if(this.close) {
      this.show = false;
    }
  },
  data() {
      return {
        show: false  
      }
  },  
  methods: {
    back() {
      if (this.backRoute != "") {
        this.$router.push({
          name: this.backRoute,
        });
      }
    },
    onClickLocal() {
        this.show = !this.show;
        if(this.show) {
            this.onClick();
        }
    }
  },
  watch: {
    close: {
      handler: function(newVal) {
        this.show = !newVal;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.style-no-crud {
  border-radius: 5px !important;
  background-color: #007BC3 !important;
  span {
    color: white;
  }
  .v-icon {
    color: white;
  }
}
</style>