<template>
  <v-app>
    <v-alert dismissible v-model="alert" :value="alert"  :color="alertColor" :icon="alertIcon" border="left" elevation="2" colored-border><strong>{{this.alertText}}</strong></v-alert>
    <v-data-table :headers="headers" :items="carriers" class="elevation-5" :search="search">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>CARRIERS LIST</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog persistent no-click-animation v-model="dialog" max-width="1000px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Carrier</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" >
                    <v-text-field v-model="editedItem.type" label="Carrier Name"></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save(editedItem.id)">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--DELETE DIALOG-->
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title v-model="editedItem" class="text-h5 justify-center">Are you sure you want to remove carrier: {{editedItem.type}}?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <!--TODO: SEND REQUEST HERE BROTHER-->
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteCarrier">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="confirmDeleteCarrier(item)" title="Delete Carrier">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
import api from "@/service/apiService";

export default {
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      carriers: [],
      search: "",
      editedIndex: -1,
      // currentLoggedInUser: this.$store.state.username,
      requestStatus: null,
      //NOTIFICATIONS STUFFS
      response: "",
      alert: false,
      alertText: "",
      alertTimeout: null,
      headers: [
        {text: 'Carrier Id', value: 'id'},
        {text: 'Carrier Type', value: 'type'},
        {text: 'Actions', value: 'actions', sortable: false},
      ],
      editedItem: {
        type: '',
      },
      defaultItem: {
        type: '',
      },
    };
  },

  methods: {
    readCarrier: async function () {
      const data = await api.readCarrier();
      this.carriers = data;
      console.log(data)
    },
    confirmDeleteCarrier(item) {
      this.editedIndex = this.carriers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteCarrier: async function () {
      let response = await api.deleteCarrier(this.editedItem.id)
      console.log(response)
      this.dialogDelete = false
      this.requestStatus = this.response.data.success;
      this.alertText = this.response.data.message;
      this.alert = true;
      await this.readCarrier();
    },
    close() {
      this.dialog = false
      this.editPassword = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.readCarrier();
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save: async function() {
        let requestResponse = await api.createCarrier(this.editedItem)
        console.log(requestResponse)
        this.response = requestResponse;
        this.requestStatus = this.response.data.success;
        this.alertText = this.response.data.message;
        this.alert = true;
        this.close()
    },
  },
  mounted() {
    this.readCarrier();
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Create new carrier' : 'Edit carrier'
    },
    alertColor(){
      return this.requestStatus ? 'green' : 'red'
    },
    alertIcon(){
      return this.requestStatus ? 'mdi-checkbox-marked-circle' : 'mdi-cancel'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
};
</script>