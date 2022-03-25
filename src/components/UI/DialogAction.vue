<template>
  <v-row justify="center">
    <v-dialog :retain-focus="false" v-model="localValue" width="600px">
      <v-card :class="cssClass" :style="` margin: 0 !important;`">
        <v-card-title class="no-padding-bottom">
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
        <div v-if="customContent">
          <slot name="customContent" />
        </div>
        <div v-else>
          <v-card-title class="no-padding-top">
            <v-row>
              <v-col class="container-center no-padding-bottom no-padding-top">
                <label class="title d-flex align-center">
                  <span
                    v-if="icon"
                    class="icon-danger"
                    style="font-size: 70px; margin-right: 20px"
                  ></span>
                  {{ texts.text }}
                </label>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text class="">
            <div v-if="type == 'success'">
              <v-col class="container-center no-padding-top">
                <label class="message">{{ texts.message }}</label>
              </v-col>
            </div>
            <div v-else>
              <div v-if="showInfo">
                <v-col class="container-center no-padding-top">
                  <label class="message">{{ texts.message }}</label>
                </v-col>
              </div>

              <div v-if="addElement">
                <slot name="addElement" />
              </div>

              <v-row>
                <v-col class="container-center" cols="4" offset="2">
                  <v-btn
                    x-large
                    block
                    class="btn-cancelar"
                    @click="onClickCancel"
                    >{{ texts.textBtnCancel }}</v-btn
                  >
                </v-col>
                <v-col cols="4">
                  <v-btn
                    x-large
                    block
                    class="btn-concluir"
                    @click="restore == true ? restoreItem() : deleteItem()"
                    >{{ texts.textBtnConfirm }}</v-btn
                  >
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </div>
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
      default: false
    },
    icon: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "success"
    },
    showInfo: {
      type: Boolean,
      default: false
    },
    onClickCancel: {
      type: Function,
      default() {
        this.changeToFalse();
      }
    },
    onClickClose: {
      type: Function,
      async default() {
        this.changeToFalse();
      }
    },
    onClickConfirm: {
      type: Function,
      default: () => {}
    },
    texts: {
      type: Object,
      default: () => ({
        text: "",
        message: "",
        textBtnConfirm: "",
        textBtnCancel: "",
        title: ""
      })
    },
    customContent: {
      type: Boolean,
      default: false
    },
    /*
      Add addElement para não ferir a implementação de customContent. Nesse caso addElement
      reaproveita a estrutura de btns e textos
    */
    addElement: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      title: "",
      message: "",
      text: "",
      textBtn: ""
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
          }
        })
        .then(result => {
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
      // await this.$store.dispatch("$_tipoProcesso/deleteTipoProcesso", this.cd_tipo_processo);
      await this.onClickConfirm();
    },
    async restoreItem() {
      //await this.$store.dispatch("$_tipoProcesso/restoreTipoProcesso", this.cd_tipo_processo);
      this.showMessage();
    }
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      async set(value) {
        if (!value) {
          // await this.$store.dispatch("$_tipoProcesso/get");
          this.$forceUpdate();
        }
        this.$emit("input", value);
      }
    },
    cssClass: function() {
      return {
        "warning-class":
          this.type == "warning-action" || this.type == "warning",
        "success-class":
          this.type === "success-class" || this.type == "success",
        "success2-class":
          this.type === "success2" || this.type == "success-alt",
        "info-class": this.type === "info"
      };
    }
  }
};
</script>
<style lang="scss" scoped>
$warning: #f39c12;
$info: #007bc3;
$success: #2ecc71;
.warning-class {
  background-color: white;
  border: 5px solid $warning !important;
  .v-card__text {
    background-color: white !important;
  }
  .title {
    color: $warning;
    word-break: break-word;
  }
  .btn-cancelar {
    background-color: #eeeeee !important;
  }
  .btn-concluir {
    background-color: $warning !important;
  }
  .message {
    font-size: 16px;
    line-height: 24px;
    color: $warning;
  }
  ::v-deep .v-skeleton-loader .v-skeleton-loader__bone {
    background: $warning !important;
    opacity: 0.7;
  }
}

.success-class {
  background-color: #94f4e1;
  border: 5px solid $success !important;
  .v-card__text {
    background-color: #94f4e1 !important;
  }
  .title {
    color: $success;
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
    color: $success;
  }
}

.success2-class {
  background-color: white;
  border: 5px solid $success !important;
  .v-card__text {
    background-color: white !important;
  }
  .title {
    color: $success;
  }
  .btn-cancelar {
    background-color: #eeeeee !important;
  }
  .btn-concluir {
    background-color: $success !important;
  }
  .message {
    font-size: 16px;
    line-height: 24px;
    color: $success;
  }
}

.info-class {
  background-color: white;
  border: 5px solid $info !important;
  .v-card__text {
    background-color: white !important;
  }
  .title {
    color: $info;
  }
  .btn-cancelar {
    background-color: #eeeeee !important;
  }
  .btn-concluir {
    background-color: $info !important;
  }
  .message {
    font-size: 16px;
    line-height: 24px;
    color: $info;
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
