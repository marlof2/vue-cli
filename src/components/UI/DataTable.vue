<template>
  <div>
    <v-col cols="auto" v-if="isFilterAdvanced">
      <v-navigation-drawer :value="isFilterAdvanced" right absolute width="20%">
        <v-row>
          <v-col style="text-align: right" class="pb-0 pr-5 pt-0">
            <v-btn @click="isFilterAdvanced = false" icon color="black">
              <v-icon x-large>close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <slot name="filter"></slot>
      </v-navigation-drawer>
    </v-col>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :header-props="{ sortIcon: null }"
          :headers="headers"
          :items="itemsData"
          :hide-default-footer="hideDefaultFooter"
          :hide-default-header="hideDefaultHeader"
          class="table-crud"
          :items-per-page="20"
          :no-data-text="noDataText"
          :item-class="rowClass"
        >
          <template v-slot:top>
            <v-row v-if="actions.create && create">
              <v-col cols="12" sm="12" md="12">
                <v-btn
                  id="novo"
                  outlined
                  rounded
                  large
                  class="mt-1 mb-4 pr-7 pl-7"
                  @click="
                    () => {
                      $router.push({
                        name: `${$route.name.split('.')[0]}.create`,
                      });
                    }
                  "
                >
                  <span class="icon-plus-1"> </span> <span> NOVO</span>
                </v-btn>
              </v-col>
            </v-row>

            <v-row v-if="search">
              <v-col cols="9" sm="9" md="9">
                <simple-search :searchFunction="searchFunction" />
              </v-col>

              <v-col cols="3" sm="3" md="3" align-self="center">
                <v-btn
                  outlined
                  rounded
                  large
                  class="grey--text text--darken-2 filtro_avancado"
                  @click="openAdvancedFilter()"
                >
                  FILTRO AVANÇADO
                  <span style="font-size: 32px" class="icon-Filter"></span>
                </v-btn>
              </v-col>
            </v-row>

            <slot name="otherFilters" />
            <v-row class="pl-3" v-if="deleteAll">
              <v-col cols="auto">
                <checkbox
                  type="with-border"
                  label="Marcar Todos"
                  v-model="selectDeleteAll"
                  :onClick="() => changeDeleteCheckbox()"
                  :hideDetails="true"
                />
              </v-col>
              <v-col cols="auto">
                <v-btn
                  depressed
                  color="default elevation-2"
                  @click="activeDeleteBatch"
                >
                  <v-icon left>icon-lixeira </v-icon>excluir
                </v-btn>
              </v-col>
            </v-row>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-row align="center" class="pl-2">
              <checkbox
                v-if="deleteAll"
                type="with-border"
                v-model="selected[item[idField]]"
                :hideDetails="true"
              />
              <v-icon
                medium
                color="grey-acp darken-2"
                class="mr-2"
                v-if="
                  (actions.edit &&
                    Object.prototype.hasOwnProperty.call(
                      authorizedActions,
                      'edit'
                    )) ||
                  authorizedActions.hasOwnProperty('edit') == ''
                "
                @click.stop.prevent="editItem(item)"
                >icon-pencil</v-icon
              >
              <v-icon
                medium
                v-if="
                  (actions.view &&
                    Object.prototype.hasOwnProperty.call(
                      authorizedActions,
                      'index'
                    )) ||
                  authorizedActions.hasOwnProperty('index') == ''
                "
                color="grey-acp darken-2"
                class="mr-2"
                @click.stop.prevent="viewItem(item)"
                >icon-eye</v-icon
              >
              <template v-if="!useSwitch && !useSwitchByValue.value">
                <v-icon
                  medium
                  v-if="
                    actions.delete &&
                    Object.prototype.hasOwnProperty.call(
                      authorizedActions,
                      'delete'
                    )
                  "
                  color="grey-acp darken-2"
                  @click="deleteItem(item)"
                  >icon-lixeira</v-icon
                >
              </template>
              <template v-else-if="useSwitch && !useSwitchByValue.value">
                <v-switch
                  value
                  true-value
                  input-value="true"
                  v-if="actions.delete"
                  color="#0894C0"
                  @click="deleteItem(item)"
                ></v-switch>
              </template>
              <template v-else>
                <v-switch
                  v-model="itemSwitch[item[idField]]"
                  v-if="actions.delete"
                  class="switch"
                  color="#0894C0"
                  @click="deleteItemById(item)"
                ></v-switch>
              </template>
            </v-row>
          </template>
          <template v-slot:[`item.ie_validado`]="{ item }">
            <v-simple-checkbox v-model="item.ie_validado"></v-simple-checkbox>
          </template>
          <template
            v-for="headerValue in this.customItems"
            v-slot:[`item.${headerValue}`]="{ item }"
          >
            <slot :name="headerValue" v-bind:item="item" />
          </template>
          <template v-slot:no-data> </template>

          <template v-slot:footer>
            <v-row v-if="pagination && currentPage" justify="end">
              <v-col cols="auto">
                <v-pagination
                  v-model="currentPage"
                  :length="lastPage"
                  class="pagination"
                ></v-pagination>
              </v-col>
            </v-row>
          </template>
        </v-data-table>

        <modal
          :title="this.modal.title"
          :showModal="openModal"
          @closeModal="() => closeModal()"
        >
          <template v-slot:modalContent>
            <slot name="modal" v-bind:item="modalItem"> </slot>
          </template>
        </modal>

        <dialog-remove
          v-model="removeData"
          v-if="removeData"
          :primaryKeyValue="primaryKeyValue"
          :restore="!!itemSwitch[primaryKeyValue]"
          :storeKey="storeKey"
          :texts="texts"
          :onClickCancel="() => onClickCancel(primaryKeyValue)"
          :onClickCustom="onClickCustom"
          :onClickSend="deleteBatch"
          :deleteItem="activeDeleteItem"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import checkbox from "./Checkbox";
import dialogRemove from "./DialogRemove";
import SimpleSearch from "./SimpleSearch";
import modal from "./Modal";
import Vue from "vue";
import _ from "lodash";

export default {
  props: {
    hasAdvancedFilter: {
      type: Boolean,
      default: () => false,
    },
    create: {
      type: Boolean,
      default: () => true,
    },
    search: {
      type: Boolean,
      default: () => false,
    },
    pagination: {
      type: Boolean,
      default: () => false,
    },
    storeKey: {
      type: String,
      default: "",
    },
    noDataText: {
      type: String,
      default: "Não há dados disponíveis",
    },
    texts: {
      type: Object,
      default: () => ({
        restore: {
          text: "Você deseja restaurar este item?",
          title: "Registro Restaurado com Sucesso!",
          message: "Registro Foi Resturado com Sucesso!",
        },
        inactive: {
          text: "Você deseja inativar este item?",
          title: "Registro Inativado com Sucesso!",
          message: "Registro Foi Inativado com Sucesso!",
        },
        delete: {
          text: "Você deseja excluir este(s) item(ns)?",
          title: "Registro(s) Excluido(s) com Sucesso!",
          message: "Registro(s) Excluido(s) com Sucesso!",
        },
      }),
    },
    automaticGetData: {
      type: Boolean,
      default: false,
    },
    deleteAll: Boolean,
    featureName: String,
    idField: String,
    headers: Array,
    textsSucessDelete: {
      type: Object,
      default: () => {
        return {
          text: "Sucesso",
          message: "Registro foi excluido com sucesso!",
        };
      },
    },
    hideDefaultFooter: {
      type: Boolean,
      default: true,
    },
    hideDefaultHeader: {
      type: Boolean,
      default: true,
    },
    useSwitch: {
      type: Boolean,
      default: false,
    },
    getterData: {
      type: String,
      default: "",
    },
    useSwitchByValue: {
      type: Object,
      default: () => {
        return {
          value: false,
        };
      },
    },
    redirectPfo: {
      type: String,
    },
    queryString: {
      type: String,
    },
    actions: {
      type: Object,
      default: () => {
        return { delete: true, view: true, edit: true, create: false };
      },
    },
    items: Array,
    customItems: {
      type: Array,
    },
    modal: {
      type: Object,
      default: () => {
        return { view: false, edit: false, title: "" };
      },
    },
    rowClass: {
      type: Function,
      default: (item) => {
        return item.rowClass || "";
      },
    },
  },
  data: () => ({
    isFilterAdvanced: false,
    right: null,
    activeDeleteItem: false,
    onClickCustom: false,
    localLoading: false,
    itemsData: [],
    lastPage: 1,
    currentPage: 0,
    primaryKeyValue: null,
    removeData: false,
    selectDeleteAll: false,
    selected: [],
    editedIndex: -1,
    authorizedActions: {},
    openModal: false,
    modalItem: {},
    itemSwitch: [],
  }),
  computed: {
    indeterminate() {
      return this.checkIndeterminate();
    },
    getterDataItem() {
      if (this.getterData != "") {
        if (this.$store.getters[`${this.storeKey}/${this.getterData}`]) {
          return this.$store.getters[`${this.storeKey}/${this.getterData}`];
        }
      }
      return [];
    },
    ...mapGetters({
      actualAuthorization: "$_auth/actualAuthorization",
      errors: "$_messages/errors",
    }),
  },
  async beforeMount() {
    if (!Object.prototype.hasOwnProperty.call(this.$route.query, "page")) {
      this.currentPage = 1;
    } else if (this.automaticGetData) {
      this.currentPage = parseInt(this.$route.query.page);
      await this.getData(this.$route.query);
      this.checkVisualizationModal();
    }

    if (this.items) {
      this.itemsData = this.items;
    }
  },
  mounted() {
    if (
      _.hasIn(this, "actualAuthorization.funcionalidade") &&
      this.featureName === this.actualAuthorization.funcionalidade.split(".")[0]
    ) {
      this.actualAuthorization.acao.forEach((element) => {
        this.authorizedActions[element.ds_acao_permissao] = true;
      });
    }
  },
  components: {
    checkbox: checkbox,
    modal,
    "dialog-remove": dialogRemove,
    "simple-search": SimpleSearch,
  },
  methods: {
    openAdvancedFilter() {
      this.isFilterAdvanced = true;
    },
    checkVisualizationModal() {
      if (this.$route.name.split(".")[1] == "view") {
        this.openModal = true;

        this.itemsData.forEach((item) => {
          if (item[this.idField] == this.$route.params.id) {
            this.modalItem = item;
          }
        });
      }
    },
    searchFunction: _.debounce(async function () {}, 500),
    closeModal() {
      this.openModal = false;
      this.$router.push({
        name: `${this.featureName}.index`,
        query: this.$route.query,
      });
    },
    async getData(params) {
      this.selectDeleteAll = false;
      this.selected = [];
      if (this.automaticGetData) {
        this.localLoading = true;
        await this.$store.dispatch(`${this.storeKey}/get`, {
          ...params,
        });
        await this.checkDataToSwitch(this.getterDataItem);
        this.localLoading = false;
      }
      return await true;
    },
    deleteItemById(item) {
      this.primaryKeyValue = item[this.idField];
      this.removeData = true;
    },
    onClickCancel(idField) {
      if (!this.activeDeleteItem) {
        if (this.itemSwitch[idField]) {
          Vue.set(this.itemSwitch, idField, 0);
        } else {
          Vue.set(this.itemSwitch, idField, 1);
        }
      }
      this.onClickCustom = false;
      this.activeDeleteItem = false;
    },
    checkDataToSwitch(items) {
      let dataSwitch = items;
      if (Object.prototype.hasOwnProperty.call(items, "data")) {
        dataSwitch = items.data;
      }

      if (Array.isArray(dataSwitch) && this.useSwitchByValue.value) {
        dataSwitch.forEach((dataItem) => {
          let valueSwitch =
            dataItem[this.useSwitchByValue.fieldCompare] ==
            this.useSwitchByValue.valueCompare;
          Vue.set(this.itemSwitch, dataItem[this.idField], valueSwitch);
        });
      }
    },
    viewItem(item) {
      if (this.redirectPfo) {
        window.open(
          this.redirectPfo + item.id + "/visualizar" + this.queryString,
          "_blank"
        );
        return;
      }
      // if (this.model.view) {
      // this.modalItem = item;
      this.$router.push({
        name: `${this.featureName}.view`,
        params: { id: item[this.idField] },
        query: this.$route.query,
      });
      // }
    },
    editItem(item) {
      if (this.redirectPfo) {
        window.open(
          this.redirectPfo + item.id + "/editar" + this.queryString,
          "_blank"
        );
        return;
      }
      if (this.modal.edit) {
        this.openModal = true;
        this.modalItem = item;
      } else {
        this.$router.push({
          name: `${this.featureName}.edit`,
          params: { id: item[this.idField] },
        });
      }
    },
    activeDeleteBatch() {
      this.removeData = true;
      this.onClickCustom = true;
      this.activeDeleteItem = true;
    },
    async deleteBatch() {
      this.removeData = false;
      const deleteItems = [];
      this.selected.forEach((item, index) => {
        if (item) {
          deleteItems.push(index);
        }
      });

      this.loading = await true;
      await this.$store.dispatch(`${this.storeKey}/deleteItems`, {
        [this.idField]: deleteItems,
      });

      this.loading = await false;
      this.showDelete = await false;
      if (!Object.prototype.hasOwnProperty.call(this.errors, "message")) {
        await this.$store.dispatch("$_messages/setErrors", {
          title: "EXCLUIDO COM SUCESSO",
          message: `Os registros foram excluidos`,
          type: "success",
          timeout: 10000,
        });

        await this.getData(this.$route.query);
      }

      this.onClickCustom = false;
      this.activeDeleteItem = false;
    },
    deleteItem(item) {
      this.$emit("deletedId", item[this.idField]);
    },

    changeDeleteCheckbox() {
      if (this.selectDeleteAll) {
        this.itemsData.forEach((element) => {
          Vue.set(this.selected, element[this.idField], this.selectDeleteAll);
        });
      } else {
        this.selected = [];
      }
    },
    checkIndeterminate() {
      if (
        this.selected.length > 0 &&
        this.selected.length != this.itemsData.length
      ) {
        this.selectDeleteAll = false;
        return true;
      } else if (this.selected.length == this.itemsData.length) {
        this.selectDeleteAll = true;
      }
      return false;
    },
    removeAll() {
      if (
        this.selected.length > 0 &&
        this.selected.length != this.itemsData.length
      )
        return true;
      return false;
    },
  },
  watch: {
    items(newValue) {
      this.itemsData = newValue;
    },
    getterDataItem: {
      handler: function (items) {
        if (this.getterData != "" && this.automaticGetData) {
          this.itemsData = items.data;
          if (this.pagination) {
            if (Object.prototype.hasOwnProperty.call(items, "current_page")) {
              this.currentPage = items.current_page;
              this.lastPage = items.last_page;
            }
          }
        }
      },
      deep: true,
    },
    $route: {
      handler: async function (routeNext, routePrev) {
        //Se a pagina foi atualizada na tela de visualizacao
        const splitNameRoutePrev = routePrev.name.split(".");
        const splitNameRouteNext = routeNext.name.split(".");

        if (
          splitNameRoutePrev[splitNameRoutePrev.length - 1] == "view" &&
          splitNameRouteNext[splitNameRouteNext.length - 1] == "view"
        ) {
          await this.getData(routeNext.query);
          this.checkVisualizationModal();
          this.openModal = true;
        } else if (
          splitNameRouteNext[splitNameRouteNext.length - 1] == "view"
        ) {
          this.openModal = true;
        } else if (
          splitNameRoutePrev[splitNameRoutePrev.length - 1] != "view"
        ) {
          this.getData(routeNext.query);
        }
      },
      deep: true,
    },
    currentPage: {
      handler: async function (currentPage) {
        if (currentPage != this.$route.query.page && this.pagination) {
          await this.$router.push({
            query: {
              ...this.$route.query,
              page: currentPage,
            },
          });
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .switch {
  .v-input__control > .v-input__slot {
    margin-bottom: 0 !important;
  }
}
</style>

<style lang="scss">
.v-input--selection-controls {
  margin-top: 10px !important;
  padding-top: 4px;
}
// .theme--light.v-data-table .v-data-table-header th.sortable .v-data-table-header__icon {
//     display: none;
// }
</style>
