<template>
  <div>
    <div v-if="dataItem.length">
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <v-simple-table style="padding-top: 0">
            <template v-slot:default>
              <thead>
                <tr></tr>
              </thead>
              <tbody>
                <tr v-for="item in dataItem" :key="item.cd_tipo_processo">
                  <td style="width: 15%">
                    <div style="display: inline-flex">
                      <span
                        @click="handlerEdit(item.cd_tipo_processo)"
                        class="icon-pencil icon-custom container-items-center"
                      ></span>

                      <span
                        @click.stop="handlerShow(item.cd_tipo_processo)"
                        style="margin-right: 5px"
                        class="icon-eye icon-custom container-items-center"
                      ></span>

                      <v-switch
                        v-model="itemInativo[item.cd_tipo_processo]"
                        color="#0894C0"
                        @change="handlerRemove(item.cd_tipo_processo)"
                      ></v-switch>
                    </div>
                  </td>

                  <td>{{ item.nm_tipo_processo }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <show-data
            v-if="showDataProcess"
            v-model="showDataProcess"
            :cd_tipo_processo="cd_tipo_processo"
          />
          <remove-data
            v-model="removeDataProcess"
            v-if="removeDataProcess"
            :cd_tipo_processo="cd_tipo_processo"
            :restore="itemInativo[cd_tipo_processo]"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-pagination
            v-model="currentPage"
            :length="lastPage"
            class="pagination"
          ></v-pagination>
        </v-col>
      </v-row>
    </div>
    <v-row v-else>
      <v-col class="information">
        <span>Sem Registros</span>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import show from "./show";
import remove from "./remove";
export default {
  components: {
    "show-data": show,
    "remove-data": remove,
  },
  props: ["value", "data", "getData"],
  // beforeMount() {
  //   if (Object.prototype.hasOwnProperty.call(this.data, "current_page")) {
  //     this.checkData(this.data.data);
  //     this.currentPage = this.data.current_page;
  //     this.lastPage = this.data.last_page;

  //     this.dataItem = this.data.data;
  //   }
  // },
  data() {
    return {
      dataItem: [],
      itemInativo: [],
      currentPage: 1,
      lastPage: 1,
      showDataProcess: false,
      removeDataProcess: false,
      editDataProcess: false,
      cd_tipo_processo: null,
    };
  },
  methods: {
    checkData(data) {
      data.forEach((dataItem) => {
        this.itemInativo[dataItem.cd_tipo_processo] =
          dataItem.deleted_at == null;
      });
    },

    handlerRemove(cd_tipo_processo) {
      this.cd_tipo_processo = cd_tipo_processo;
      this.removeDataProcess = true;
    },
    handlerShow(cd_tipo_processo) {
      this.cd_tipo_processo = cd_tipo_processo;
      this.showDataProcess = true;
    },
    async handlerEdit(cd_tipo_processo) {
      this.$router.push({
        name: `tipo_processo.edit`,
        params: { id: cd_tipo_processo },
      });
    },
  },
  watch: {
    currentPage: {
      handler: function (newVal) {
        if (this.data.current_page != this.currentPage) {
          this.getData({
            page: newVal,
          });
        }
      },
    },
    data: {
      handler: function (data) {
        if (Object.prototype.hasOwnProperty.call(data, "current_page")) {
          this.checkData(data.data);
          this.currentPage = data.current_page;
          this.lastPage = data.last_page;

          this.dataItem = data.data;
        }
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .v-data-table__wrapper {
  overflow-x: hidden !important;
}
::v-deep td {
  border: 1px solid white;
}
::v-deep tr:hover {
  opacity: 0.8 !important;
}
::v-deep tr:nth-child(even) {
  background-color: #ebe6e6;
}
::v-deep tr:nth-child(odd) {
  background-color: #f6f4f4;
}
.icon-custom {
  font-size: 25px;
  padding-left: 0.5rem;
  cursor: pointer;
  &:hover {
    opacity: 0.3;
  }
}
::v-deep .information {
  margin-bottom: 0.5rem;
  background: #e9edf4;
  height: 56px;
  box-sizing: border-box;
  border-radius: 7px;
  span {
    font-size: 18px;
    color: #0894c0;
  }
}
</style>
