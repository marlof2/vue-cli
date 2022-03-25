<template>
  <v-row justify="center">
    <v-dialog
      v-model="showModal"
      :width="width"
      :min-height="minHeight"
      @click:outside="close()"
    >
      <v-card
        style="background-color: white !important; margin: 0 !important;"
        :min-height="minHeight"
      >
        <v-card-title>
          <v-container class="py-0 px-0">
          <v-row>
            <v-col
              align="start"
              cols="11"
              sm="11"
              md="11"
            >
              <label class="title">{{ title }}</label>
            </v-col>
            <v-col
              cols="1"
              sm="1"
              md="1"
              align="end"
            >
              <span class="icon-close close" @click="close()"></span>
            </v-col>
          
          </v-row>
          <v-row>
            
          <v-col 
              cols="12"
              sm="12"
              md="12"
              align="center"
              class="py-0"
              >
            <v-divider></v-divider>

          </v-col>
          </v-row>
          </v-container>
        </v-card-title>
        <v-card-text>
          <slot name="modalContent"></slot>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  props: {
    title: { type: String, default: "" },
    width: { type: String, default: "1120px" },
    minHeight: { type: String, default: "500px" },
    showModal: { type: Boolean, default: false }
  },
  methods: {
    close() {
      this.$emit("closeModal");
    }
  }
};
</script>

<style lang="scss" scoped>
.v-divider {
  border-top: 1px solid rgba(0, 0, 0, 1.5);
}
.close:hover {
  opacity: 0.3;
  cursor: pointer;
}
.btn-drap {
  background: #d0f6f9 !important;
  height: 35px;
  border-radius: 7px;
  span {
    color: #444;
  }
}
.title-text {
  font-size: 18px;
  font-weight: bold;
  color: #444;
}
.no-padding {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

::v-deep .v-card__title {
  background: none !important;
  color: black !important;
}

.p-text-custom {
  border: 1px #8a8a8a solid;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
}
</style>
