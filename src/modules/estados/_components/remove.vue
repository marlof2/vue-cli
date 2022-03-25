<template>
  <v-row justify="center">
    <v-dialog v-model="localValue" width="600px">
      <v-card style="background-color: white !important;  margin: 0 !important;">
        <v-card-title>
          <v-row>
            <v-col class="container-center">
              <label class="title">{{text}}</label>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-skeleton-loader
      :loading="loading"
      :transition="'scale-transition'"
      height="94"
      type="list-item-two-line"
    >
          <v-row>
            <v-col class="container-center" cols="12" sm="12" md="12">
              <v-btn class="btn-cancelar" @click="localValue = false">Cancelar</v-btn>
              <v-btn class="btn-concluir" @click="restore == true ? restoreItem() : deleteItem()">{{textBtn}}</v-btn>
            </v-col>
          </v-row>
          </v-skeleton-loader>
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
  
  props: ["value", "cd_tipo_processo", "restore"],
  data() {
    return {
      loading: false,
      title: '',
      message: '',
      text: '',
      textBtn: ''
    };
  },
  beforeMount() {
    if(this.restore) {
      this.text = 'Você deseja ativar este item?';
      this.title = 'Registro foi Ativado com Sucesso!';
      this.message = 'Tipo de Processo Foi Ativado com Sucesso!';
      this.textBtn = 'Ativar'
    } else {
      this.text = 'Você deseja inativar este item?';
      this.title = 'Registro Inativado com Sucesso!';
      this.message = 'Tipo de Processo Foi Inativado com Sucesso!';
      this.textBtn = 'Inativar';
    }

  },
  methods: {
    showMessage() {
      swal
        .fire({
          type: "success",
          title: this.title,
          text: this.message,
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
   async deleteItem() {
      this.loading = await true;
      await this.$store.dispatch("$_tipoProcesso/deleteTipoProcesso", this.cd_tipo_processo);
      this.showMessage();
      this.loading = await false;
    },
      async restoreItem() {
      this.loading = await true;
      await this.$store.dispatch("$_tipoProcesso/restoreTipoProcesso", this.cd_tipo_processo);
      this.showMessage();
      this.loading = await false;
    }
  },
  computed: {
   localValue: {
      get () {
        return this.value
      },
      async set (value) {
          if(!value) {
            this.loading = await true;  
          await this.$store.dispatch("$_tipoProcesso/get");
            this.loading = await false;
            this.$forceUpdate();
        }
        this.$emit('input', value)
      }
    }
  },

};
</script>
<style lang="scss" scoped>
::v-deep .btn-concluir {
  background: #0894C0 !important;
  border-radius: 46px !important;
  margin-left: 1rem;
  font-weight: 300;
    span {
    color: white !important;
  }
  box-shadow: none;
}
::v-deep .btn-cancelar {
  background: #EEE !important;
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