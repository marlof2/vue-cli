<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >   
    <template v-slot:top>
      <v-toolbar flat color="white">       
        
        <v-col cols="4" sm="4">
          <v-select
            v-model="value"
            :items="items"
            chips
            label="Plano"
          ></v-select>         
        </v-col>
         <v-checkbox
        v-model="checkbox"        
        label="Inativos"
        required
      ></v-checkbox>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="800px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              rounded
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >ADICIONAR NOVO</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Código"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.calories" label="Descrição"></v-text-field>
                  </v-col>                 
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn  text @click="close">Cancelar</v-btn>
              <v-btn  text @click="save">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>      
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
    
  </v-data-table>  
</template>


<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        { text: '', value: 'actions', sortable: false },        
        { text: 'Códigp', value: 'fat' },               
        { text: 'Descrição do Item', value: 'calories' }, 
      ],
      items: ['Plano 1', 'Plano 2', 'Plano 3', 'Plano 4'],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Item' : 'Editar Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          {           
            calories: 'Descrição',
            fat: 136,
          },           
          {            
            calories: 'Descrição',
            fat: 256,
            carbs: 37,
            protein: 4.3,
          },
          {           
            calories: 'Descrição',
            fat: 253,
          },
          
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
