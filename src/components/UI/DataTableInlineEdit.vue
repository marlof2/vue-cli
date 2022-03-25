<template>
  <div>
    <v-form ref="form" lazy-validation>
      
          <v-data-table
            :header-props="{ sortIcon: null }"
            :headers="headers"
            :items="dataItems"
            :hide-default-footer="hideDefaultFooter"
            :hide-default-header="hideDefaultHeader"
            sort-by="calories"
            :single-select="true"
            class="table-crud"
            :items-per-page="20"
          >
            <template v-slot:top>
              <div style="padding-left: 1.2rem">
                <v-row v-if="!actions.notCreate">
                  <v-col>
                    <v-btn class="btn-add" @click="handleAdd">
                      <v-icon style="padding-right: 5px; font-size: 12px">
                        icon-plus-1</v-icon
                      >
                      Novo</v-btn
                    >
                  </v-col>
                </v-row>
                
              <v-row v-if="actions.search">
                  <v-col cols="9" sm="9" md="9">
                    <simple-search class="search" :searchFunction="searchFunction" />
                  </v-col>
                  <v-col cols="3" sm="3" md="3" align-self="center">
                    <v-btn
                      outlined
                      rounded
                      large
                      class="grey--text text--darken-2 filtro_avancado"
                    >
                      FILTRO AVANÇADO
                      <span style="font-size: 32px" class="icon-Filter"></span>
                    </v-btn>
                  </v-col>
              </v-row>
                <v-row v-if="actions.delete">
                  <v-col sm="2" cols="2" md="2">
                    <checkbox
                      type="with-border"
                      label="Marcar Todos"
                      v-model="checkAll"
                      :onClick="() => checkAllItems()"
                    />
                  </v-col>
                  <v-col sm="10" cols="10" md="10">
                    <v-btn @click="activeDeleteBatch" class="btn-delete">
                      <v-icon style="padding-right: 5px; font-size: 18px">
                        icon-lixeira
                      </v-icon>
                      Excluir
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </template>
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="(item, index) in items" :key="item.name">
                  <td v-if="editing !== index">
                    <div style="display: inline-flex">
                      <checkbox
                        v-if="actions.delete"
                        v-model="deleteItems[dataEssential[index].primaryKey]"
                        :hideDetails="true"
                        type="with-border"
                        class="container-items-center"
                      />
                      <v-icon
                        medium
                        v-if="actions.edit"
                        color="grey-acp darken-2"
                        class="mr-2"
                        @click="handleEdit(item, index)"
                        >icon-pencil</v-icon
                      >
                      <v-icon
                        medium
                        v-if="actions.view"
                        color="grey-acp darken-2"
                        class="mr-2"
                        @click="
                          $router.push({
                            name: `${featureName}.view`,
                            params: { id: dataEssential[index].primaryKey },
                          })
                        "
                        >icon-eye</v-icon
                      >
                      <v-switch
                        v-if="actions.inativation"
                        v-model="dataEssential[index].situationItem"
                        color="#0894C0"
                        @change="activeDeleteItemToSituation(index)"
                      ></v-switch>
                      <!--<v-icon
                medium
                v-if="actions.delete"
                color="grey-acp darken-2"
                @click="deleteItem(item)"
                >icon-lixeira</v-icon
              > -->
                    </div>
                  </td>
                  <td v-else>
                    <img
                      @click="handleSave(index)"
                      width="30px"
                      src="../../assets/img/ok.svg"
                    />
                    <img
                      @click="cancelEdit(item)"
                      width="30px"
                      src="../../assets/img/close.svg"
                    />
                  </td>
                  <td
                    v-for="(value, idx) in item"
                    :key="recuperaChave(value, item, idx)"
                  >
                    <div>
                      <v-text-field
                        class="input-table-inline"
                        background-color="white"
                        style="min-width: 7rem"
                        :value="item[idx]"
                        :rules="getRules(item, idx)"
                        hide-details
                        v-if="
                          editing === index &&
                          verificarOpcoesCampo(idx, 'editable') &&
                          verificarOpcoesCampo(idx, 'type', 'input') &&
                          editable[idx].decimal
                        "
                        ref="input-text"
                        outlined
                        dense
                        v-money="money"
                        v-model.lazy="editable[idx].value"
                      ></v-text-field>
                      <v-text-field
                        class="input-table-inline"
                        background-color="white"
                        style="min-width: 7rem"
                        :value="item[idx]"
                        :rules="getRules(item, idx)"
                        hide-details
                        v-else-if="
                          editing === index &&
                          verificarOpcoesCampo(idx, 'editable') &&
                          verificarOpcoesCampo(idx, 'type', 'input')
                        "
                        ref="input-text"
                        outlined
                        dense
                        v-model="editable[idx].value"
                      ></v-text-field>
                      <v-simple-checkbox
                        v-else-if="
                          verificarOpcoesCampo(idx, 'type', 'checkbox')
                        "
                        :disabled="!verificarOpcoesCampo(idx, 'editable')"
                        v-model="item[idx]"
                      ></v-simple-checkbox>
                      <v-select
                        :rules="getRules(item, idx)"
                        v-else-if="
                          editing === index &&
                          verificarOpcoesCampo(idx, 'editable') &&
                          verificarOpcoesCampo(idx, 'type', 'select', item)
                        "
                        :height="32"
                        :items="recuperaItemSelect(idx)"
                        :item-text="editable[idx].itemText"
                        :item-value="editable[idx].itemValue"
                        :value="recuperaValorSelect(item, idx)"
                        v-model="editable[idx].value"
                        outlined
                        hide-details="true"
                      ></v-select>
                      <div v-else>
                        <slot v-if="hasContentSlot"
                          name="content"
                          v-bind:item="{
                            item, 
                            index: idx, 
                            value: recuperarItemLabel(item, idx),
                            id: dataEssential[index].primaryKey
                          }"
                        />
                        <span v-else>{{ recuperarItemLabel(item, idx) }}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </template>

            <template v-slot:footer>
              <div class="text-center">
                <v-pagination
                  class="pagination"
                  v-model="currentPage"
                  :length="lastPage"
                  @input="changePage"
                ></v-pagination>
              </div>
            </template>
          </v-data-table>
          <dialog-action v-model="showSuccess" :texts="texts" />
          <dialog-action
            v-model="showDelete"
            type="warning-action"
            :texts="texts"
            :onClickConfirm="handleDeleteItem"
            :onClickCancel="checkValueSituation"
          />
    </v-form>
  </div>
</template>
<script>
import _ from "lodash";
import SimpleSearch from "../../components/UI/SimpleSearch";
import checkbox from "../../components/UI/Checkbox";
import dialogAction from "../../components/UI/DialogAction";
import { mapGetters } from "vuex";
import { VMoney } from "v-money";
import Vue from "vue";

export default {
  props: {
    textsAction: {
      type: Object,
      default: () => {
        return {};
      },
    },
    actionItem: String,
    structureToAdd: Object,
    actionEdit: String,
    onSubmit: {
      type: Function,
      default: () => ({}),
    },
    editable: Object,
    featureName: String,
    idField: String,
    headers: Array,
    hideDefaultFooter: {
      type: Boolean,
      default: true,
    },
    hideDefaultHeader: {
      type: Boolean,
      default: true,
    },
    actions: {
      type: Object,
      default: () => {
        return { delete: true, view: true, edit: true, inativation: true, notCreate: false, search: false };
      },
    },
    items: Object,
    searchFunction: {
      type: Function,
      default: () => () => {}
    },
    messages: {
      type: Object,
      default: () => {
        return {};
      },
    }
  },
  directives: { money: VMoney },
  beforeMount() {
    if (Object.prototype.hasOwnProperty.call(this.items, "data")) {
      if (this.currentPage != this.items.currentPage) {
        this.currentPage = this.items.currentPage;
      }

      //this.currentPage = this.items.currentPage;
      this.lastPage = this.items.lastPage;

      this.items.data.forEach((item, index) => {
        const cpItem = _.cloneDeep(item);
        this.dataEssential[index] = {
          primaryKey: cpItem.primaryKey,
          situationItem: cpItem.situationItem,
        };
        delete cpItem.primaryKey;
        delete cpItem.situationItem;
        this.dataItems.push(cpItem);
        this.checkTextsExists();
      });
    }
  },
  data() {
  const self = this
  return {
    minValue: 0,
    rules: {
      required: (value) => !!value || "Campo Obrigatório!",
      min: (value) => {
        let valueToCompare = 0
        if(value) {
          valueToCompare = parseFloat(value.replaceAll('.', '').replaceAll(',', '.'))
        }
        return valueToCompare >= self.minValue || `Valor minimo é de ${self.minValue}`
      }
    },
    money: {
      decimal: ",",
      thousands: ".",
      prefix: "",
      precision: 2,
      masked: false,
    },
    loading: false,
    showDelete: false,
    deleteInBatch: false,
    texts: {},
    indexItemInativation: null,
    textsDelete: {
      text: this.messages.delete ?? "Você deseja excluir este item?",
      message: "Registro foi excluido com sucesso!",
      textBtnConfirm: "SIM",
      textBtnCancel: "Não",
      title: "TEM CERTEZA QUE DESEJA EXCLUIR ESTE REGISTRO?",
    },
    textsSucessDelete: {
      text: "Sucesso",
      message: "Registro foi excluido com sucesso!",
    },
    textsInactivation: {
      text: this.messages.inativation ?? "Você deseja inativar este item?",
      message: "Registro foi inativo com sucesso!",
      textBtnConfirm: "SIM",
      textBtnCancel: "Não",
      title: "TEM CERTEZA QUE DESEJA INATIVAR ESTE REGISTRO?",
    },
    textsSucessInativation: {
      text: "Sucesso",
      message: "Registro foi inativado com sucesso!",
    },
    textsActivation: {
      text: this.messages.activation ?? "Você deseja ativar este item?",
      message: "Registro foi ativo com sucesso!",
      textBtnConfirm: "SIM",
      textBtnCancel: "Não",
      title: "TEM CERTEZA QUE DESEJA ATIVAR ESTE REGISTRO?",
    },
    textsSucessActivation: {
      text: "Sucesso",
      message: "Registro foi ativado com sucesso!",
    },
    textsSuccessAdd: {
      text: "Sucesso",
      message: "Registro criado com sucesso!",
      title: "Sucesso",
    },
    textsSuccessEdit: {
      text: "Sucesso",
      message: "Registro editado com sucesso!",
      title: "Sucesso",
    },
    checkAll: false,
    currentPage: 1,
    lastPage: 1,
    showSuccess: false,
    editedValues: "",
    editing: "",
    selected: [],
    dataAux: [],
    dataItems: [],
    dataEssential: [],
    deleteItems: [],
  }
  },

  computed: {
    ...mapGetters({
      errorsField: "$_error/errors",
    }),
    hasContentSlot() {
      return !!this.$scopedSlots.content
    }
  },
  components: {
    checkbox: checkbox,
    "dialog-action": dialogAction,
    "simple-search": SimpleSearch
  },
  methods: {
    checkTextsExists() {
      if (Object.prototype.hasOwnProperty.call(this.textsAction, "textsActivation")) {
        this.textsActivation = this.textsAction.textsActivation;
      }
      if (Object.prototype.hasOwnProperty.call(this.textsAction, "textsSucessActivation")) {
        this.textsSucessActivation = this.textsAction.textsSucessActivation;
      }
      if (Object.prototype.hasOwnProperty.call(this.textsAction, "textsDelete")) {
        this.textsDelete = this.textsAction.textsDelete;
      }
      if (Object.prototype.hasOwnProperty.call(this.textsAction, "textsSucessDelete")) {
        this.textsSucessDelete = this.textsAction.textsSucessDelete;
      }
      if (Object.prototype.hasOwnProperty.call(this.textsAction, "textsInactivation")) {
        this.textsInactivation = this.textsAction.textsInactivation;
      }
      if (Object.prototype.hasOwnProperty.call(this.textsAction, "textsSucessInativation")) {
        this.textsSucessInativation = this.textsAction.textsSucessInativation;
      }
      if (Object.prototype.hasOwnProperty.call(this.textsAction, "textsSuccessAdd")) {
        this.textsSuccessAdd = this.textsAction.textsSuccessAdd;
      }
      if (Object.prototype.hasOwnProperty.call(this.textsAction, "textsSuccessEdit")) {
        this.textsSuccessEdit = this.textsAction.textsSuccessEdit;
      }
    },
     getRules(item, index) {
      const rules = [];
      if (Object.prototype.hasOwnProperty.call(this.editable[index], "rules")) {
        this.editable[index].rules.forEach((rule) => {
          if(rule == 'min' && this.editable[index]['minValue']) {
            this.minValue = parseFloat(this.editable[index]['minValue'].replaceAll('.', '').replaceAll(',', '.'))
          }
          rules.push(this.rules[rule]);
        });
      }
      return rules;
    },
    async activeDeleteBatch() {
      this.deleteInBatch = await true;
      this.texts = this.textsDelete;
      this.showDelete = true;
      this.handleDeleteItem = () => this.deleteItemsCheck();
    },
    async checkValueSituation() {
      if (this.deleteInBatch) {
        this.deleteInBatch = await false;
      } else {
        //Utilizado para voltar ao estado original do v-switch se o usuario clicar em nao
        const data = { ...this.dataEssential[this.indexItemInativation] };
        data.situationItem = !data.situationItem ? 1 : 0;
        Vue.set(this.dataEssential, this.indexItemInativation, data);
      }
      this.showDelete = false;
    },
    async activeDeleteItemToSituation(index) {
      const data = this.dataEssential[index];
      this.indexItemInativation = index;

      if (data.situationItem) {
        this.texts = this.textsActivation;
      } else {
        this.texts = this.textsInactivation;
      }
      this.showDelete = await true;
      this.handleDeleteItem = () => this.handleSituation(data);
    },
    handleDeleteItem() {},

    async handleSituation(item) {
      const id = item.primaryKey;
      const situationItem = item.situationItem;
      this.loading = await true;
      if (situationItem) {
        this.texts = this.textsActivation;
        await this.$store.dispatch(`${this.actionItem}/activeItem`, id);
        this.texts = this.textsSucessActivation;
      } else {
        this.texts = this.textsInactivation;
        await this.$store.dispatch(`${this.actionItem}/inactivateItem`, id);
        this.texts = this.textsSucessInativation;
      }
      await this.$store.dispatch(`${this.actionItem}/get`, {
        ...this.$route.query,
      });
      this.loading = await false;

      this.showDelete = await false;

      if (!this.errorsField.length) {
        this.showMessage();
        //this.showSuccess = true;
      }
    },
    changePage(newCurrentPage) {
      const query = { ...this.$route.query };
      if (query.page != newCurrentPage) {
        query.page = newCurrentPage;
        this.$router.push({
          query,
        });
      }
    },
    checkAllItems() {
      this.dataEssential.forEach((data) => {
        Vue.set(this.deleteItems, data.primaryKey, this.checkAll);
      });
    },
    async deleteItemsCheck() {
      const deleteItems = [];
      this.deleteItems.forEach((item, key) => {
        if (item) {
          deleteItems.push(key);
        }
      });
      this.loading = await true;
      await this.$store.dispatch(`${this.actionItem}/deleteItems`, {
        ids: deleteItems,
      });
      this.loading = await false;
      this.showDelete = await false;

      if (!this.errorsField.length) {
        this.texts = this.textsSucessDelete;
        //this.showSuccess = await true;
        this.showMessage();
        await this.$store.dispatch(`${this.actionItem}/get`, {
          ...this.$route.query,
        });
      }
    },
    async showMessage() {
      await this.$store.dispatch("$_messages/setErrors", {
            title: this.texts.text,
            message: this.texts.message,
            type: "success",
            timeout: 10000
          });
    },
    handleAdd() {
      
      if(!this.dataEssential.length || (this.dataEssential[0].primaryKey != undefined && Object.prototype.hasOwnProperty.call(this.dataEssential[0],'primaryKey'))) {
          this.dataItems.unshift({ ...this.structureToAdd });
          this.dataEssential.unshift({
            primaryKey: undefined,
            situationItem: false,
          });
          this.editing = 0;
          _.forEach(this.editable, (element, key) => {
            this.editable[key].value = null;
            this.dataAux[key] = null;
          });
      }
    },
    handleEdit(item, index) {
      this.editing = index;
      _.forEach(item, (element, key) => {
        if (typeof item[key] == "object" && item[key] != null) {
          this.editable[key].value = item[key][this.editable[key].itemValue];
          this.dataAux[key] = item[key][this.editable[key].itemValue];
        } else {
          this.editable[key].value = item[key];
          this.dataAux[key] = item[key];
        }
      });
    },
    cancelEdit(item) {

       if(this.dataEssential[0].primaryKey == undefined || !Object.prototype.hasOwnProperty.call(this.dataEssential[0],'primaryKey')) { 
          this.dataItems.shift();
          this.dataEssential.shift();
       }

      _.forEach(item, (element, key) => {
        this.editable[key].value = this.dataAux[key];
        this.editing = null;
      });
    },
    async handleSave(index) {
      const dataForm = [];

      this.formValidated = await this.$refs.form.validate();
      if (!this.formValidated) {
        return false;
      }

      _.forEach(this.editable, (value, key) => {
        if (value.type == "select") {
          dataForm[value.itemValue] = value.value;
        } else {
          if (Object.prototype.hasOwnProperty.call(value, "decimal")) {
            dataForm[key] = value.value.replaceAll(".", "").replace(",", ".");
          } else {
            dataForm[key] = value.value;
          }
        }
      });
      this.loading = await true;
      if (this.dataEssential[index].primaryKey != undefined) {
        dataForm["id"] = this.dataEssential[index].primaryKey;

        this.texts = this.textsSuccessEdit;
        await this.$store.dispatch(`${this.actionItem}/update`, {
          ...dataForm,
        });
      } else {
        this.texts = this.textsSuccessAdd;
        await this.$store.dispatch(`${this.actionItem}/post`, { ...dataForm });
      }

      this.loading = await false;

      if (!this.errorsField.length) {
        this.showMessage();
        //this.showSuccess = true;
        await this.$store.dispatch(`${this.actionItem}/get`, {
          ...this.$route.query,
        });
        this.editing = null;
        this.onSubmit();
      } else {
        //call funtction error
      }
    },
    recuperaChave(value, item, idx) {
      if (typeof value == "object" && value != null) {
        if (value[idx] != null) {
          if (Object.prototype.hasOwnProperty.call(value[idx], [this.editable[idx].itemValue])) {
            return value[idx][this.editable[idx].itemValue];
          }
          return value[idx];
        } else {
          return value[idx];
        }
      }
      return value;
    },
    formatMoney(value) {
      var formatter = new Intl.NumberFormat([], {
        style: "currency",
        currency: "BRL",
      });
      return formatter.format(value);
    },

    recuperarItemLabel(item, index) {
      if (typeof item[index] == "object" && item[index] != null) {
        return item[index][index];
      }

      if (this.editable[index].decimal) {
        return this.formatMoney(item[index]);
      }
      return item[index];
    },

    recuperaValorSelect(item, index) {
      return item[index][this.editable[index].itemValue]; //this.editable[index].idItem;
    },
    recuperaItemSelect(index) {
      return this.editable[index].items;
    },

    verificarOpcoesCampo(index, field, value) {
      if (Object.prototype.hasOwnProperty.call(this.editable, index)) {
        if (value) {
          if (value == "select") {
            return true;
          }
          if (this.editable[index][field] === value) {
            return true;
          }
          return false;
        }
        if (this.editable[index][field]) return true;
        return false;
      } else {
        return false;
      }
    },
  },
  watch: {
    $route: {
      handler: async function (newRoute, oldRoute) {
        if (
          (!Object.prototype.hasOwnProperty.call(oldRoute.query, "action") ||
            oldRoute.query.action == newRoute.query.action) &&
          oldRoute.name.split(".")[1] != "show" &&
          newRoute.name.split(".")[1] != "show"
        ) {
          if (newRoute.name.split(".")[1] != "edit") {
            this.loading = await true;
            await this.$store.dispatch(`${this.actionItem}/get`, {
              ...newRoute.query,
            });
            this.loading = await false;
          }
        }
      },
    },
    items: {
      handler: function (newItems) {
        this.dataItems = [];
        this.dataEssential = [];
        if (this.currentPage != newItems.currentPage) {
          this.currentPage = newItems.currentPage;
        }
        this.lastPage = newItems.lastPage;
        newItems.data.forEach((item, index) => {
          const cpItem = _.cloneDeep(item);
          this.dataEssential[index] = {
            primaryKey: cpItem.primaryKey,
            situationItem: cpItem.situationItem,
          };
          delete cpItem.primaryKey;
          delete cpItem.situationItem;

          this.dataItems.push(cpItem);
        });
      },
    },
  },
};
</script>
 
<style lang="scss" scoped>
::v-deep .search > .v-input__control > .v-input__slot {
    .v-text-field__slot {
      min-height: 48px !important;
      display: initial !important;
      input {
        padding-top: 1.3rem;
      }
    }
    .v-input__append-inner {
      margin-top: 12px;
    }
}
::v-deep form {
  background: transparent !important;
  border-radius: 0 !important;
  padding: 0 !important;
}
::v-deep .v-select,
::v-deep .v-input__slot {
  min-height: auto !important;
  display: flex !important;
  align-items: center !important;
  
}
::v-deep .btn-delete {
  box-shadow: none;
  background: #eeeeee;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  border-radius: 4px;
  span {
    font-weight: 300;
    color: #000000;
  }
}
::v-deep .btn-add {
  background: #ebe6e6 !important;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
  border-radius: 46px !important;
  padding: 0 20px 0 20px !important;
  span {
    font-weight: 300;
    font-size: 15px;
    line-height: 29px;
    text-align: center;

    color: #444444;
  }
}
::v-deep .v-input__control .v-input__slot label {
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  color: #444444;
}
</style>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
