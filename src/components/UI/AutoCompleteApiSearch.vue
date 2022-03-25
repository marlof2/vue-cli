<template>
  <div>
    <v-autocomplete
      :disabled="disabled"
      dense
      :rules="[rules.required]"
      :background-color="'white'"
      outlined
      :label="label"
      v-mask="mask ? mask : false"
      v-model="model"
      :items="items"
      :loading="isLoading"
      :hide-details="hideDetails"
      :search-input.sync="search"
      :error="noResult"
      :error-messages="noResult ? 'Registro não encontrado' : ''"
      hide-selected
      hide-no-data
      :item-text="itemText"
      :item-value="itemValue"
      :placeholder="placeholder"
      return-object
    ></v-autocomplete>
  </div>
</template>

<script>
import { VueMaskDirective } from "v-mask";
import Api from "../../api";
import _ from "lodash";
export default {
  props: {
    itemText: {
      type: String
    },
    itemValue: {
      type: String
    },
    label: {
      type: String
    },
    placeholder: {
      type: String
    },
    fieldToSearch: {
      type: String
    },
    serviceRoute: {
      type: String
    },
    mask: {
      type: String
    },
    value: {
      type: Object
    },
    newItems: {
      type: Array,
      default: () => {
        return [];
      }
    },
    uniqueItem: {
      type: Boolean
    },
    hideDetails: {
      type: Boolean
    },
    disabled: {
      type: Boolean,
      default: false
    },
    queryStringParams: {
      type: Object,
      default: () => {
        return {};
      }
    },
    fixedItems: {
      type: Boolean,
      default: false
    },
    input: {
      type: String,
      default: "autocomplete"
    },
    valueToSearch: {
      type: String
    },
    valueToSet: {
      type: String
    },
    fieldToSet: {
      type: String
    }
  },
  directives: { mask: VueMaskDirective },
  data: () => ({
    rules: {
      required: value => !!value || "Required."
    },
    noResult: false,
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null
  }),
  computed: {
    items() {
      return this.entries.map(entry => {
        return Object.assign({}, entry);
      });
    }
  },
  watch: {
    newItems() {
      this.entries = this.newItems;
    },
    value(newVal) {
      this.model = newVal;
    },
    async search(val) {
      if (val) {
        if (val.length < 4) return;
        if (this.isLoading) return;
        if (!this.fixedItems) this.get(val);
      }
    },
    model(newVal) {
      if (newVal)
        this.$emit("resultAutocomplete", { value: newVal, items: this.items });
    },
      queryStringParams(newValue, oldValue) {
        if (this.fixedItems && this.serviceRoute && !_.isEqual(newValue, oldValue)) {
        this.get();
      } 
    },
    serviceRoute() {
      if (this.serviceRoute) {
        this.get();
      } 
      
    },
    items(val) {
      if (val.length > 0 && this.valueToSet && !this.model) {
        let value = val.filter(e => {
          if (e[this.fieldToSet] == this.valueToSet) return e;
        });
        this.model = value[0];
      } else if (
        val.length > 0 &&
        this.valueToSet &&
        typeof this.model === "object"
      ) {
        if (Object.keys(this.model).length === 0) {
          let value = val.filter(e => {
            if (parseInt(e[this.fieldToSet]) == this.valueToSet) return e;
          });
          this.model = value[0];
        }
      }
    }
  },

  async mounted() {
    if (this.valueToSearch) this.search = this.valueToSearch;
    if (this.value) this.model = this.value;
    if (this.newItems) this.entries = this.newItems;
    if (
      this.fixedItems &&
      this.serviceRoute != "" &&
      this.newItems.length === 0
    ) {
      this.get();
    }
  },

  methods: {
    async get(val) {
      try {
        this.isLoading = true;
        this.noResult = false;
        let queryString = _.cloneDeep(this.queryStringParams);
        if (!this.fixedItems) queryString[this.fieldToSearch] = val;
        let res = await Api.query(this.serviceRoute, queryString);
        if (res.data.length === 0) {
          this.noResult = true;
        }
        this.entries = res.data;
        this.isLoading = false;
        if (this.uniqueItem) this.model = res.data[0];
      } catch (error) {
        this.entries = [];
        this.isLoading = false;
      }
    }
  }
};
</script>

<style></style>
