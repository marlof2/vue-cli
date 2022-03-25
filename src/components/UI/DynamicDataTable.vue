<template>
  <div>
    <v-form ref="form">
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="itemsPerPage"
        :item-key="idField"
        class="base-crud cyan-grey table-crud"
        hide-default-footer
        :loading="isLoading || internalLoading"
        @update:options="activateAllSwitches"
      >
        <template v-slot:top>
          <div style="padding-left: 1.2rem">
            <v-row>
              <v-col>
                <v-btn class="btn-add" @click="currentAdding = true">
                  <v-icon style="padding-right:5px; font-size:12px">
                    icon-plus-1</v-icon
                  >
                  Novo</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="2" cols="2" md="2">
                <v-checkbox
                  v-if="actions.massSelect"
                  type="with-border"
                  label="Marcar Todos"
                  v-model="checkAllItems"
                  on-icon="icon-tick"
                  :hideDetails="true"
                  class="container-items-center with-border"
                />
              </v-col>
              <v-col sm="10" cols="10" md="10">
                <v-btn
                  v-if="actions.massSelect && actions.delete"
                  @click="handleDeleteBatch(massSelectBatch)"
                  class="mr-4 btn-delete"
                >
                  <v-icon style="padding-right: 5px; font-size: 18px">
                    icon-lixeira
                  </v-icon>
                  Excluir
                </v-btn>
                <v-btn
                  v-if="actions.massSelect && actions.inativation"
                  @click="handleInactivateBatch(massSelectBatch)"
                  class="btn-delete"
                >
                  <v-icon style="padding-right: 5px; font-size: 18px">
                    icon-lixeira
                  </v-icon>
                  Excluir
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div v-if="currentEdit !== item[idField]" style="display: inline-flex">
            <v-checkbox
              on-icon="icon-tick"
              v-if="actions.massSelect"
              v-model="massSelectBatch"
              :value="item[idField]"
              multiple
              :hideDetails="true"
              class="container-items-center with-border"
            />
            <v-icon
              medium
              v-if="actions.edit"
              color="grey-acp darken-2"
              class="mr-2"
              @click="currentEdit = item[idField]"
              >icon-pencil</v-icon
            >
            <v-icon medium v-if="actions.view" color="grey-acp darken-2" class="mr-2"
              >icon-eye</v-icon
            >
            <v-switch
              v-if="actions.inativation"
              v-model="isActiveBatch"
              color="#0894C0"
              :value="item[idField]"
              multiple
              @change="handleInactivate(item[idField])"
            ></v-switch>
            <v-switch
              v-if="actions.reactivate"
              v-model="isInactiveBatch"
              color="#0894C0"
              :value="item[idField]"
              multiple
              @change="handleReactivate(item[idField])"
            ></v-switch>
          </div>
          <div v-else>
            <img
              class="cursor-pointer"
              @click="handleEdit(item)"
              width="30px"
              src="@/assets/img/ok.svg"
            />
            <img
              class="cursor-pointer"
              @click="
                () => {
                  currentEdit = 0;
                  handleReload();
                }
              "
              width="30px"
              src="@/assets/img/close.svg"
            />
          </div>
        </template>

        <!-- LOGICA PARA ADICIONAR ITENS -->
        <template v-if="currentAdding" v-slot:[`body.prepend`]="{}">
          <tr>
            <td>
              <div>
                <img
                  class="cursor-pointer"
                  @click="handleAdd(toAddObject)"
                  width="30px"
                  src="@/assets/img/ok.svg"
                />
                <img
                  class="cursor-pointer"
                  @click="
                    () => {
                      currentAdding = false;
                      clearAddFields();
                    }
                  "
                  width="30px"
                  src="@/assets/img/close.svg"
                />
              </div>
            </td>
            <td v-bind:key="header.value" v-for="header in headersWithoutAction">
              <template
                v-if="
                  objectStructure[header.value] && objectStructure[header.value].editable
                "
              >
                <v-select
                  v-if="objectStructure[header.value].type == 'select'"
                  @input="
                    (value) => {
                      $emit(`select_${header.value}`, value);
                    }
                  "
                  v-bind:key="header.value"
                  dense
                  :id="header.value"
                  :height="30"
                  :rules="objectStructure[header.value].rules"
                  :items="objectStructure[header.value].items"
                  :item-text="objectStructure[header.value].itemText"
                  :item-value="objectStructure[header.value].itemValue"
                  v-model="toAddObject[header.value]"
                  outlined
                  hide-details="true"
                ></v-select>
                <v-text-field
                  v-else
                  background-color="white"
                  outlined
                  v-model="toAddObject[header.value]"
                  v-mask="objectStructure[header.value].mask"
                  v-bind:key="header.value"
                  :id="header.value"
                  hide-details
                  class="input-table-inline"
                  dense
                ></v-text-field>
              </template>
            </td>
          </tr>
        </template>

        <!-- LOGICA PARA ADICIONAR TODAS AS COLUNAS DA TABELA E EDIÇÃO DE CAMPOS -->
        <template
          v-for="header in headersWithoutAction"
          v-slot:[`item.${header.value}`]="{ item }"
        >
          <template
            v-if="
              objectStructure[header.value] &&
              objectStructure[header.value].editable &&
              isCurrentEdit(item)
            "
          >
            <v-select
              v-if="objectStructure[header.value].type == 'select'"
              v-bind:key="header.value"
              dense
              height="30"
              :id="header.value"
              :rules="objectStructure[header.value].rules"
              :items="objectStructure[header.value].items"
              :item-text="objectStructure[header.value].itemText"
              :item-value="objectStructure[header.value].itemValue"
              :value="forceNumeric(item[header.value])"
              @input="
                (newValue) => {
                  item[header.value] = newValue;
                  $emit(`select_${header.value}`, newValue);
                }
              "
              outlined
              hide-details="true"
            ></v-select>

            <v-text-field
              v-else
              :background-color="'transparent'"
              v-model="item[header.value]"
              :id="header.value"
              :rules="objectStructure[header.value].rules"
              v-mask="objectStructure[header.value].mask"
              outlined
              v-bind:key="header.value"
              hide-details
              class="input-table-inline"
              dense
            ></v-text-field>
          </template>

          <template v-else>
            <template v-if="objectStructure[header.value].type == 'select'">
              {{
                getSelectValue(
                  objectStructure[header.value].items, 
                  objectStructure[header.value].itemValue,
                  objectStructure[header.value].itemText, 
                  item[header.value] 
                )
              }}
            </template>
            <template v-else>
              {{ item[header.value] }}
            </template>
          </template>
        </template>

        <!-- PAGINAÇÃO -->
        <template v-slot:footer>
          <v-row justify="end">
            <v-col cols="auto" align-self="center">
              <span v-if="totalItemsAmmount" class="paginate-total-items"
                >({{ totalItemsAmmount }}) Resultados encontrados</span
              >
            </v-col>
            <v-col cols="auto">
              <v-pagination
                class="pagination"
                v-model="internalCurrentPage"
                :total-visible="7"
                :length="lastPage"
                @input="
                  (newPage) => {
                    $emit('page-change', newPage);
                  }
                "
              ></v-pagination>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-form>
    <DialogAction v-model="showSuccess" :texts="dialogText" />
  </div>
</template> 

<script>
import DialogAction from "@/components/UI/DialogActionOS38";
import Swal from "sweetalert2";
import { createNamespacedHelpers } from "vuex";

const { mapGetters } = createNamespacedHelpers("$_error");

export default {
  props: {
    items: {
      required: true,
      type: Array,
    },
    headers: {
      required: true,
      type: [Array],
    },
    toAddObject: {
      // O objeto sendo adicionado atualmente
      required: false,
      type: Object,
      default: () => {
        return {};
      },
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    lastPage: {
      type: Number,
      default: 1,
    },
    objectStructure: {
      type: Object,
      default: () => {
        return {};
      },
    },
    idField: {
      type: String,
      required: true,
    },
    actions: {
      type: Object,
      default: () => {
        return { view: false, edit: true, inativation: true, massSelect: true };
      },
    },
    itemsPerPage: {
      type: Number,
      default: 15,
    },
    totalItemsAmmount: {
      type: Number,
      default: 0,
    },
    viewFunction: {
      type: Function,
    },
    reloadItemsFunction: {
      type: Function,
    },
    addFunction: {
      type: Function,
    },
    editFunction: {
      type: Function,
    },
    deleteFunction: {
      type: Function,
    },
    deleteBatchFunction: {
      type: Function,
    },
    inactivateFunction: {
      type: Function,
    },
    reactivateFunction: {
      type: Function,
    },
    inactivateBatchFunction: {
      type: Function,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      storeInternalCurrentPage: this.currentPage,
      isActiveBatch: [],
      isInactiveBatch: [],
      massSelectBatch: [],
      inputValue: [],
      currentAdding: false,
      showSuccess: false,
      showDelete: false,
      dialogText: {},
      internalLoading: false,
      currentEdit: 0,
    };
  },
  created() {
    if (this.actions.inativation) {
      this.activateAllSwitches();
    }
  },
  computed: {
    ...mapGetters({ errors: "errors" }),
    checkAllItems: {
      get() {
        if (this.items.length == 0) {
          return false;
        }

        for (let i1 in this.items) {
          let item = this.items[i1];
          let hasMatch = false;
          for (let i2 in this.massSelectBatch) {
            let idSelected = this.massSelectBatch[i2];
            if (item[this.idField] == idSelected) {
              hasMatch = true;
            }
          }
          if (!hasMatch) {
            return false;
          }
        }
        return true;
      },
      set(val) {
        if (val) {
          this.massSelectBatch = [];
          for (const i1 in this.items) {
            let item = this.items[i1];

            this.massSelectBatch.push(item[this.idField]);
          }
        } else {
          this.massSelectBatch = [];
        }
      },
    },
    headersWithoutAction() {
      let headersClone = JSON.parse(JSON.stringify(this.headers));
      headersClone.forEach((element) => {
        if (element.value == "actions") {
          const index = headersClone.indexOf(element);
          headersClone.splice(index, 1);
        }
      });
      return headersClone;
    },
    internalCurrentPage: {
      get() {
        return this.currentPage;
      },
      set(newItem) {
        this.storeInternalCurrentPage = newItem;
      },
    },
  },
  methods: {
    async handleReload() {
      this.clearAddFields();

      if (this.reloadItemsFunction) {
        this.internalLoading = true;
        await this.reloadItemsFunction();
        this.internalLoading = false;
      } else {
        this.$emit("reloadItems");
      }
    },
    async handleAdd(item) {
      if (this.addFunction) {
        this.internalLoading = true;
        await this.addFunction(item);
        if (!this.errors.message || this.errors.message.length == 0) {
          this.dialogText = {
            text: "Sucesso",
            message: "Registro adicionado com sucesso!",
            title: "Sucesso",
          };
          this.showSuccess = true;
          this.currentAdding = false;
        }
        this.clearAddFields();
        this.internalLoading = false;
        this.handleReload();
      } else {
        this.$emit("add", item);
      }
    },
    async handleEdit(item) {
      if (this.editFunction) {
        this.internalLoading = true;
        item = this.getItemEditableFields(item);
        await this.editFunction(item);
        if (!this.errors.message || this.errors.message.length == 0) {
          this.dialogText = {
            text: "Sucesso",
            message: "Registro alterado com sucesso!",
            title: "Sucesso",
          };
          this.showSuccess = true;
        }
        this.currentEdit = 0;
        this.internalLoading = false;
        this.handleReload();
      } else {
        this.$emit("edit", item);
      }
    },
    async handleInactivate(id) {
      if (this.inactivateFunction) {
        await Swal.fire({
          title: "",
          text: "Deseja inativar este item?",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "Não",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim",
        }).then(async (result) => {
          if (result.value) {
            await this.inactivateFunction(id);

            if (!this.errors.message || this.errors.message.length == 0) {
              this.dialogText = {
                text: "Sucesso",
                message: "Registro inativado com sucesso!",
                title: "Sucesso",
              };
              this.showSuccess = true;
            } else {
              //Swal.fire("", this.errors.message[0], "error");
            }
          }
        });
        this.handleReload();
      } else {
        this.$emit("inactivate", id);
      }
    },
    async handleReactivate(id) {
      if (this.reactivateFunction) {
        await Swal.fire({
          title: "",
          text: "Deseja reativar este item?",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "Não",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim",
        }).then(async (result) => {
          if (result.value) {
            await this.reactivateFunction(id);

            if (!this.errors.message || this.errors.message.length == 0) {
              this.dialogText = {
                text: "Sucesso",
                message: "Registro reativado com sucesso!",
                title: "Sucesso",
              };
              this.showSuccess = true;
            } else {
              //Swal.fire("", this.errors.message[0], "error");
            }
          }
        });
        this.handleReload();
      } else {
        this.$emit("reactivate", id);
      }
    },
    async handleInactivateBatch(ids) {
      if (ids.length <= 0) {
        Swal.fire("", "Nenhum registro selecionado", "error");
      }
      if (this.inactivateBatchFunction) {
        await Swal.fire({
          title: "",
          text: "Deseja excluir todos os itens selecionados?",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "Não",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim",
        }).then(async (result) => {
          if (result.value) {
            await this.inactivateBatchFunction(ids);

            if (!this.errors.message || this.errors.message.length == 0) {
              this.dialogText = {
                text: "Sucesso",
                message: "Registros excluídos com sucesso!",
                title: "Sucesso",
              };
              this.showSuccess = true;
            } else {
              //Swal.fire("", this.errors.message[0], "error");
            }
          }
        });
        this.handleReload();
      } else {
        this.$emit("inactivateBatch", ids);
      }
    },
    async handleDelete(id) {
      if (this.deleteFunction) {
        await Swal.fire({
          title: "",
          text: "Deseja deletar este item?",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "Não",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim",
        }).then(async (result) => {
          if (result.value) {
            await this.deleteFunction(id);

            if (!this.errors.message || this.errors.message.length == 0) {
              Swal.fire("", "Registro deletado com sucesso.", "success");
            } else {
              ////Swal.fire("", this.errors.message[0], "error");
            }
          }
        });
        this.handleReload();
      } else {
        this.$emit("delete", id);
      }
    },
    async handleDeleteBatch(ids) {
      if (ids.length <= 0) {
        Swal.fire("", "Nenhum registro selecionado", "error");
      }
      if (this.deleteBatchFunction) {
        await Swal.fire({
          title: "",
          text: "Deseja deletar todos os itens selecionados?",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "Não",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim",
        }).then(async (result) => {
          if (result.value) {
            await this.deleteBatchFunction(ids);

            if (!this.errors.message || this.errors.message.length == 0) {
              Swal.fire("", "Registros deletados com sucesso.", "success");
            } else {
              ////Swal.fire("", this.errors.message[0], "error");
            }
          }
        });
        this.handleReload();
      } else {
        this.$emit("deleteBatch", ids);
      }
    },
    isCurrentEdit(item) {
      return this.currentEdit == item[this.idField];
    },
    activateAllSwitches() {
      this.items.forEach((item) => {
        this.isActiveBatch.push(item[this.idField]);
      });
    },
    getItemEditableFields(item) {
      let result = {};
      this.headers.forEach((header) => {
        if (
          this.objectStructure[header.value] &&
          this.objectStructure[header.value].editable
        ) {
          if (this.objectStructure[header.value].type == "select") {
            let itemValueName = header.value;
            let itemValueKey = header.value;
            result[itemValueKey] = item[itemValueName];
          } else {
            let itemValueKey = header.value;
            result[itemValueKey] = item[header.value];
          }
        }
      });

      result[this.idField] = item[this.idField];
      return result;
    },
    forceNumeric(value) {
      let rtrnVl = value;
      if (parseInt(value)) {
        rtrnVl = parseInt(value);
      }
      return rtrnVl;
    },
    getSelectValue(selectListObject, fieldValueName, fieldTextName, fieldValue) {
      for (const key in selectListObject) {
        const element = selectListObject[key];
        if (element[fieldValueName] == fieldValue) {
          return element[fieldTextName];
        }
      }
    },
    clearAddFields() {
      this.$emit("clearAddFields");
      if (this.toAddObject != {}){
        this.toAddObject = {};
      }
    },
  },
  watch: {
    items() {
      this.activateAllSwitches();
    },
    currentEdit() {
      this.$emit("currentEditChanged", this.currentEdit);
    },
  },
  components: {
    DialogAction,
  },
};
</script>

<style lang="scss" scoped>
.with-border {
  ::v-deep .v-input__slot .v-input--selection-controls__input .v-icon {
    border: 1px solid #8a8a8a;
    box-sizing: border-box;
    border-radius: 4px;
  }
}
.v-input--checkbox {
  margin-top: 0 !important;
}

::v-deep .v-input__control .v-input__slot {
  .v-input--selection-controls__input .v-icon {
    background: white !important;
    color: white !important;
  }
  label {
    margin-bottom: 0;
  }
}

::v-deep .icon-tick {
  background-color: white !important;

  &::before {
    color: #7692db !important;
  }
  font-size: 15px !important;
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

.border-0 {
  border: none !important;
}

.cursor-pointer {
  cursor: pointer;
}

::v-deep table > tbody > tr:nth-child(even) {
  background-color: #f7f7f8 !important;
}
::v-deep table > tbody > tr:nth-child(even):hover {
  background-color: #f7f7f8 !important;
}

::v-deep table > tbody tr:nth-child(odd) {
  background-color: #e9edf4 !important;
}
::v-deep table > tbody tr:nth-child(odd):hover {
  background-color: #e9edf4 !important;
}
::v-deep table > tbody tr td {
  min-width: 80px;
  max-width: 300px;
}
</style>

<style lang="scss">
.default-view > .v-input__control > .v-input__slot:before {
  border: none !important;
  width: 0% !important;
}

.default-view > .v-input__control > .v-input__slot:after {
  border: none !important;
  width: 0% !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
