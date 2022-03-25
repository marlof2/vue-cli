<template>
  <v-row justify="center">
    <v-dialog :retain-focus="false" v-model="localValue" width="600px">
      <v-card
        :class="
          type == 'warning-action' || type == 'warning'
            ? 'warning-class'
            : 'success-class'
        "
        :style="` margin: 0 !important;`"
      >
        <v-card-title class="no-padding-bottom no-padding-top">
          <v-row>
            <v-col class="container-end">
              <span
                class="icon-close icon-to-close"
                @click="onClickClose()"
                style="font-size: 10px"
              >
              </span>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-title class="no-padding-top">
          <v-row>
            <v-col class="container-center no-padding-bottom no-padding-top">
              <label class="title">{{ texts.text }}</label>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text class="">
          <div v-if="type == 'success'">
            <v-col class="container-center no-padding-top">
              <label class="message">{{ texts.message }}</label>
            </v-col>
          </div>
          <div v-else-if="type == 'warning-action'">
            <div v-if="showInfo">
              <v-col class="container-center no-padding-top">
                <label class="message">{{ texts.message }}</label>
              </v-col>
            </div>
            <v-skeleton-loader
              :loading="loading"
              :transition="'scale-transition'"
              height="94"
              type="list-item-two-line"
              v-else
            >
              <v-row>
                <v-col class="container-center" cols="12" sm="12" md="12">
                  <v-btn class="btn-cancelar" @click="onClickCancel">{{
                    texts.textBtnCancel
                  }}</v-btn>
                  <v-btn
                    class="btn-concluir"
                    @click="restore == true ? restoreItem() : deleteItem()"
                    >{{ texts.textBtnConfirm }}</v-btn
                  >
                </v-col>
              </v-row>
            </v-skeleton-loader>
          </div>
          <div v-else-if="type == 'warning'">
            <div v-if="showInfo">
              <v-col class="container-center no-padding-top">
                <label class="message">{{ texts.message }}</label>
              </v-col>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import swal from "sweetalert2";

export default {
  props: {
    value: Boolean,
    restore: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "success",
    },
    showInfo: {
      type: Boolean,
      default: false,
    },
    onClickCancel: {
      type: Function,
      default() {
        this.changeToFalse();
      },
    },
    onClickClose: {
      type: Function,
      async default() {
        this.changeToFalse();
      },
    },
    onClickConfirm: {
      type: Function,
      default: () => {},
    },
    texts: {
      type: Object,
      default: () => ({
        text: "",
        message: "",
        textBtnConfirm: "",
        textBtnCancel: "",
        title: "",
      }),
    },
  },
  data() {
    return {
      loading: false,
      title: "",
      message: "",
      text: "",
      textBtn: "",
    };
  },

  methods: {
    showMessage() {
      swal
        .fire({
          type: "success",
          title: this.texts.title,
          text: this.texts.message,
          timer: 2000,
          showConfirmButton: false,
          onClose: () => {
            clearInterval("");
          },
        })
        .then((result) => {
          if (
            // Read more about handling dismissals
            result.dismiss === swal.DismissReason.timer
          ) {
            this.localValue = false;
          }
        });
    },
    async changeToFalse() {
      this.localValue = await false;
    },
    async deleteItem() {
      this.loading = await true;
      // await this.$store.dispatch("$_tipoProcesso/deleteTipoProcesso", this.cd_tipo_processo);
      await this.onClickConfirm();
      this.loading = await false;
    },
    async restoreItem() {
      this.loading = await true;
      //await this.$store.dispatch("$_tipoProcesso/restoreTipoProcesso", this.cd_tipo_processo);
      this.showMessage();
      this.loading = await false;
    },
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      async set(value) {
        if (!value) {
          this.loading = await true;
          // await this.$store.dispatch("$_tipoProcesso/get");
          this.loading = await false;
          this.$forceUpdate();
        }
        this.$emit("input", value);
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.warning-class {
  background-color: #fff9c4;
  .v-card__text {
    background-color: #fff9c4 !important;
  }
  .title {
    color: #f39c12;
  }
  .btn-cancelar {
    background-color: #eeeeee !important;
  }
  .btn-concluir {
    background-color: #f39c12 !important;
  }
  .message {
    font-size: 16px;
    line-height: 24px;
    color: #f39c12;
  }
  ::v-deep .v-skeleton-loader .v-skeleton-loader__bone {
    background: #f39c12 !important;
    opacity: 0.7;
  }
}
.success-class {
  background-color: #94f4e1;
  .v-card__text {
    background-color: #94f4e1 !important;
  }
  .title {
    color: #2ecc71;
  }
  .btn-cancelar {
    background-color: #eeeeee !important;
  }
  .btn-concluir {
    background-color: #f39c12 !important;
  }
  .message {
    font-size: 16px;
    line-height: 24px;
    color: #2ecc71;
  }
}
.icon-to-close {
  cursor: pointer;
  &:hover {
    opacity: 0.3;
  }
}

button {
  border: 1px solid #ffffff;
  box-sizing: border-box;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

::v-deep .btn-concluir {
  border-radius: 46px !important;
  margin-left: 1rem;
  font-weight: 300;
  span {
    color: white !important;
  }
  box-shadow: none;
}
::v-deep .btn-cancelar {
  border-radius: 46px !important;
  font-weight: 300;
  span {
    color: #444 !important;
  }
  box-shadow: none;
}
.title-text {
  font-size: 18px;
  font-weight: bold;
  color: #444;
}

::v-deep .v-card__title {
  background: none !important;
  color: black !important;
}
</style>
