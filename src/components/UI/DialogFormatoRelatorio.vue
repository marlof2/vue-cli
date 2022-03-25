<template>
  <div class="text-center">
    <v-dialog v-model="dialog" class="rounded-lg" width="650">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          class="ml-auto my-auto"
          x-medium
          ><div class="d-flex">
            <span style="font-size: 27px" class="icon-excel mr-1"></span>
            <span class="my-auto">GERAR EXCEL</span>
          </div></v-btn
        >
      </template>

      <v-card>
        <v-card-title class="text-h5 black--text"> Gerar Excel </v-card-title>

        <v-card-text class="text-center">
          Em que formato você deseja baixar a planilha?
          <div class="mx-auto my-5">
            <v-btn
              outlined
              x-large
              rounded
              elevation="11"
              style="height: 200px; width: 200px"
              @click="
                () => {
                  $emit('screenReportSelected');
                  dialog = false;
                }
              "
              class="mr-7"
            >
              <div class="">
                <div class="mb-4">
                  <span style="font-size: 52px" class="icon-conforme_tela"></span>
                </div>
                <div>Conforme tela</div>
              </div>
            </v-btn>
            <v-btn
              outlined
              x-large
              rounded
              elevation="11"
              style="height: 200px; width: 200px"
              @click="
                () => {
                  $emit('listReportSelected');
                  dialog = false;
                }
              "
            >
              <div class="">
                <div class="mb-4">
                  <span style="font-size: 52px" class="icon-forma_lista"></span>
                </div>
                <div>Formato de lista</div>
              </div>
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    };
  },
};
</script>