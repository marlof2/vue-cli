<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :clearable="clearable"
        :disabled="disabled"
        :id="idDatePicker"
        v-model="dateFormatted"
        outlined
        background-color="white"
        dense
        readonly
        :label="label"
        :prepend-inner-icon="hasIcon ? 'event' : ''"
        v-bind="attrs"
        v-on="on"
        @change="date = parseDate(dateFormatted)"
        @blur="date = parseDate(dateFormatted)"
        :hide-details="hideDetails"
        :class="inputClass"
        :rules="rules"
      ></v-text-field>
    </template>
    <v-date-picker
      locale="pt-br"
      v-model="date"
      :min="min"
      @input="menu = false"
      :disabled="disabled"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import moment from "moment";
export default {
  props: {
    label: {
      type: String,
      default: "Selecione uma data"
    },
    hasIcon: {
      type: Boolean,
      default: true
    },
    idDatePicker: {
      type: String
    },
    errorMessages: {
      type: Function
    },
    value: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    inputClass: {
      type: String,
      default: ''
    },
    rules: {
      type: Array,
      default: () =>  [] 
    },
    min: {
      type: String,
      default: ""
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      date: "",
      menu: false,
      dateFormatted: this.formatDate()
    };
  },
  watch: {
    value(newValue, oldValue) {
      if(newValue !== oldValue) {
        this.date = newValue
      }
    },
    date(newDate) {
        this.dateFormatted = this.formatDate(newDate);
        this.$emit("setDate", newDate);
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      return moment(date).format("DD/MM/YYYY");
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  },
  created() {
    if (this.value) {
      this.dateFormatted = this.formatDate(this.value);
      this.date = this.parseDate(this.formatDate(this.value));
    }
  }
};
</script>

<style></style>
