<template>
  <v-row justify="center">
    <v-dialog v-model="localValue" width="600px" persistent>
      <v-card
        style="background-color: white !important;  margin: 0 !important;"
      >
        <v-card-title>
          <v-row>
            <v-col class="container-center">
              <label class="title">{{ text }}</label>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
            <v-row>
              <v-col class="container-center" cols="12" sm="12" md="12">
                <v-btn class="btn-cancelar" @click="cancelAction">Não</v-btn>
                <v-btn
                  class="btn-concluir"
                  @click="getAction()"
                  >{{ textBtn }}</v-btn
                >
              </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    value: Boolean,
    onClickCancel: {
      type: Function,
      default: () => ({
      })
    },
    onClickSend: {
      type: Function,
      default: () => ({
      })
    },
    onClickCustom: {
      type: Boolean,
      default: false
    },

    primaryKeyValue: {
      type: Number,
      default: null
    },
    restore: {
      type: Boolean,
      default: false
    },
    deleteItem: {
      type: Boolean,
      default: false
    },
    storeKey: {
      type: String,
      default: ''
    },
    texts: {
      type: Object,
      default: () => ({
        restore: {
          text: "Você deseja restaurar este item?",
          title: "Registro Restaurado com Sucesso!",
          message: "Registro Foi Resturado com Sucesso!"
        },
        inactive: {
          text: "Você deseja inativar este item?",
          title: "Registro Inativado com Sucesso!",
          message: "Registro Foi Inativado com Sucesso!"
        },
        delete: {
          text: "Você deseja excluir este(s) item(ns)?",
          title: "Registro(s) Excluido(s) com Sucesso!",
          message: "Registro(s) Excluido(s) com Sucesso!"
        }
      })
    }
    },
  data() {
    return {
      title: "",
      message: "",
      text: "",
      textBtn: "SIM"
    };
  },
  async beforeCreate() {},
  beforeMount() {
    if (this.deleteItem) {
      this.text = this.texts.delete.text;
      this.title = this.texts.delete.title;
      this.message = this.texts.delete.message;
    } else if(this.restore) {
      this.text = this.texts.restore.text;
      this.title = this.texts.restore.title;
      this.message = this.texts.restore.message;
    } else {
      this.text = this.texts.inactive.text;
      this.title = this.texts.inactive.title;
      this.message = this.texts.inactive.message;
    }
  },
  methods: {
   async getAction() {
      console.log("this.deleteItem ", this.deleteItem)
      if(this.deleteItem) {
         if(this.onClickCustom) {
          this.onClickSend();
        }
      } else if(this.restore) {
        this.restoreItem()
      } else {
        this.inactiveItem()
      }
    },
    cancelAction() {
      this.localValue = false;
      this.onClickCancel();
    },
    async showMessage() {

      this.$store
            .dispatch(`${this.storeKey}/get`, this.$route.query)
      
      await this.$store.dispatch("$_messages/setErrors", {
        title: this.title,
        message: this.message,
        type: "success",
        timeout: 10000
      });

    this.localValue = false;
          
    },
    async inactiveItem() {
      console.log('storeKey ', this.storeKey)
      if(this.storeKey != '') {
        await this.$store
        .dispatch(`${this.storeKey}/inactiveItem`, this.primaryKeyValue)
        .then(() => {
          this.showMessage();
          this.localValue = false;
        })
        .catch((error) => {
          console.log('catch ', error)
          this.onClickCancel();
          this.localValue = false;
        });
      } 
    },
    async restoreItem() {
      if(this.storeKey != '') {
        await this.$store
        .dispatch(`${this.storeKey}/restoreItem`, this.primaryKeyValue)
        .then(() => {
          this.showMessage();
          this.localValue = false;
        })
        .catch((error) => {
          console.log('catch ', error)
          this.onClickCancel();
          this.localValue = false;
        });
      }
    }
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      async set(value) {
        this.$emit("input", value);
      }
    },
    ...mapGetters({
      errorsField: "$_error/errors"
    })
  } 
};
</script>
<style lang="scss" scoped>
::v-deep .btn-concluir {
  background: #0894c0 !important;
  border-radius: 46px !important;
  margin-left: 1rem;
  font-weight: 300;
  span {
    color: white !important;
  }
  box-shadow: none;
}
::v-deep .btn-cancelar {
  background: #eee !important;
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

.container-center {
  word-break: break-word;
}
</style>
