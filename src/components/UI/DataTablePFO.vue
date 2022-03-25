<template>
  <v-data-table
    :headers="headers"
    :items="items"
    disable-pagination
    hide-default-footer
    v-bind="$attrs"
  >
    <template v-slot:top>
      <v-row v-if="selectable" align="center">
        <v-col cols="auto">
          <v-checkbox
            v-model="checkAll"
            hide-details
            on-icon="icon-tick"
            label="Marcar todos"
            class="ma-0 pa-0 with-border"
            @change="selectAll"
          ></v-checkbox>
        </v-col>
        <v-col cols="auto" v-for="(action, i) in actions" :key="i">
          <v-btn
            v-bind="action.options"
            class="text-none font-weight-regular elevation-1"
            :class="action.classes"
            @click="$emit(action.click)"
          >
            <span class="d-flex align-center spacing">
              <v-icon v-if="action.icon" small>{{ action.icon }}</v-icon>
              {{ action.title }}
            </span>
          </v-btn>
        </v-col>
      </v-row>
    </template>
    <template v-for="(slot, name) in $scopedSlots" v-slot:[name]="item">
      <slot :name="name" v-bind="item"></slot>
    </template>
    <template slot="no-data">{{ noDataText }}</template>
    <template
      v-for="(header, i) in headers.filter(h => h.hasOwnProperty('format'))"
      v-slot:[`item.${header.value}`]="{ value }"
    >
      <span v-if="header.format === 'date'" :key="i">{{
        dateFormat(value)
      }}</span>
      <span v-else-if="header.format === 'currency'" :key="i">{{
        currencyFormat(value)
      }}</span>
    </template>
    <template
      v-for="(header2, i) in headers.filter(h => h.hasOwnProperty('actions'))"
      v-slot:[`item.${header2.value}`]="{ item }"
    >
      <v-row align="center" justify="start" :key="i">
        <v-checkbox
          v-if="selectable"
          v-model="selectedItems[item[keyItem]]"
          on-icon="icon-tick"
          class="ml-2 mb-0 mt-0 mr-0 pa-0 with-border"
          hide-details
          :input-value="item[keyItem]"
          @change="e => e || $delete(selectedItems, item[keyItem])"
        ></v-checkbox>
        <template v-for="(action, i) in header2.actions">
          <v-btn
            v-if="action.type === 'button' && execHide(action, item)"
            class="text-none font-weight-regular"
            v-bind="action.options"
            :disabled="execDisabled(action, item)"
            :key="i"
            :class="action.classes"
            @click="$emit(action.click, item)"
          >
            <span class="d-flex align-center spacing">
              <v-icon v-if="action.icon">
                {{ action.icon }}
              </v-icon>
              {{ action.title }}
            </span>
          </v-btn>
          <v-switch
            v-else-if="action.type === 'switch' && execHide(action, item)"
            v-bind="action.options"
            :disabled="execDisabled(action, item)"
            :key="i"
            :class="action.classes"
            :value="item[action.value]"
            @change="$emit(action.change, item)"
          ></v-switch>
        </template>
      </v-row>
    </template>
    <template v-if="pagination" v-slot:footer>
      <v-row align="center" :justify="justifyPagination">
        <v-col
          cols="auto"
          :class="{ 'order-2': justifyPagination === 'start' }"
        >
          <span v-if="total > 0">({{ total }}) Resultados encontrados</span>
        </v-col>
        <v-col cols="auto">
          <v-pagination
            class="pagination"
            :length="length"
            :value="page"
            @input="paginate"
          ></v-pagination>
        </v-col>
      </v-row>
    </template>
  </v-data-table>
</template>

<script>
import moment from "moment";

export default {
  inheritAttrs: false,
  beforeMount() {
    if (this.selectable && this.headers[0]?.value != "actions")
      this.headers.unshift({ value: "actions", actions: [] });
  },
  data() {
    return {
      selectedItems: {},
      checkAll: false
    };
  },
  watch: {
    items() {
      this.selectedItems = {};
    },
    selectedItems(items) {
      const keys = Object.keys(items),
        keys2 = Object.keys(this.items);
      this.checkAll = keys.length > 0 && keys.length === keys2.length;
      this.$emit("selected", keys);
    }
  },
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    actions: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      default: false
    },
    length: {
      type: Number,
      default: 1
    },
    page: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    keyItem: {
      type: String
    },
    justifyPagination: {
      type: String,
      default: "end"
    },
    noDataText: {
      type: String,
      default: "Nenhum resultado encontrado."
    }
  },
  methods: {
    dateFormat(date) {
      if (date) return moment(date).format("DD/MM/YYYY");
      return "";
    },
    currencyFormat(value) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(value);
    },
    paginate(page) {
      this.checkAll = false;
      this.selectedItems = {};
      this.$emit("paginate", page);
    },
    selectAll(value) {
      if (value) {
        const selected = {};
        for (let item of this.items) selected[item[this.keyItem]] = value;

        this.selectedItems = selected;
      } else this.selectedItems = {};
    },
    execDisabled(action, item) {
      if (typeof action.disabled === "function") return action.disabled(item);
      return action.disabled;
    },
    execHide(action, item) {
      if (!Object.prototype.hasOwnProperty.call(action, "hide")) return true;
      else if (typeof action.hide === "function") return action.hide(item);
      return false;
    }
  }
};
</script>

<style scoped lang="scss">
.v-data-table >>> tr {
  word-break: break-all;
}

.v-data-table >>> th:first-child {
  width: auto !important;
}

.v-data-table >>> td:first-child {
  width: auto !important;
}

.spacing {
  gap: 6px;
}

.with-border {
::v-deep  .v-input__slot .v-input--selection-controls__input .v-icon {
border: 1px solid #8A8A8A;
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
    color: #7692DB !important;
  }
  font-size: 15px !important;
}
</style>
