<template class="max-">
<v-app>
  <v-data-table :headers="headers" :items="clients" class="elevation-1" height="550px" :search="search">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>CLIENTS LIST</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog persistent no-click-animation v-model="dialog" max-width="1000px" >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Client</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" >
                    <v-text-field v-model="editedItem.firstname" label="Firstname"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" >
                    <v-text-field v-model="editedItem.lastname" label="Lastname" ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.phoneNumber" label="Phone Number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" >
                    <v-menu v-model="menu0" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="editedItem.dateSold" label="Date Sold" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.dateSold" @input="menu0 = false"></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" >
                    <v-menu v-model="menu1" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="editedItem.quoteDate" label="Quote Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.quoteDate" @input="menu1 = false"></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" >
                    <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="editedItem.expiryDate" label="Expiry Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.expiryDate" @input="menu2 = false"></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" >
                    <v-menu v-model="menu3" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="editedItem.latestContactDate" label="Latest Contact Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.latestContactDate" @input="menu3 = false"></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" >
                    <v-text-field v-model="editedItem.quoteStatus" label="Quote Status"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" >
                    <v-text-field v-model="editedItem.commissionAmount" label="Commission Amount"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" >
                    <v-text-field v-model="editedItem.referral" label="Referral"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
<!--            NEW CLIENT POP UP CARD-->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save(editedItem.id)">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
<!--        CARRIER DIALOG-->
        <v-dialog v-model="dialogCarrier" max-width="500px">
          <v-card>
            <v-card-title v-model="editedItem">List of {{editedItem.firstname}}'s Carriers</v-card-title>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" >
                  <v-text-field v-model="toAddCarrier" label="Carrier Type"></v-text-field>
                  <v-btn color="primary" dark class="mb-2" tile @click="addCarrier(editedItem.id)">Add Carrier</v-btn>
                </v-col>
                  <v-col sm="6" >
                  <v-simple-table dark>
                    <thead>
                    </thead>
                    <template v-slot:default>
                      <tbody>
                      <tr v-for="c in carrier" :key="c.id">
                        <td>{{ c.type }}</td>
                        <td><v-icon right title="Delete Carrier" @click="deleteCarrier(c.id)">mdi-delete</v-icon></td>
                      </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>
<!--        DELETE DIALOG-->
        <v-dialog v-model="dialogDelete" max-width="600px">
          <v-card>
            <v-card-title v-model="editedItem" class="text-h5 justify-center">Are you sure you want to remove client: {{editedItem.firstname}}?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
<!--              TODO: SEND REQUEST HERE BROTHER-->
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteClient">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="setCarrier(item)" title="View Client Carrier">mdi-account</v-icon>
      <v-icon small class="mr-2" @click="editClient(item)" title="Edit Client">mdi-pencil</v-icon>
      <v-icon small @click="confirmDeleteClient(item)" title="Delete Client">mdi-delete</v-icon>
    </template>
  </v-data-table>
</v-app>
</template>

<script>
import api from "@/service/apiService";

export default {
  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString(),
      menu0: false,
      menu1: false,
      menu2: false,
      menu3: false,
      dialog: false,
      dialogDelete: false,
      dialogCarrier: false,
      clients: [],
      search: "",
      toAddCarrier: "",
      editedIndex: -1,
      carrier: [],
      headers: [
        {text: 'Client Id', value: 'id'},
        {text: 'Firstname', value: 'firstname'},
        {text: 'Lastname', value: 'lastname'},
        {text: 'Email', value: 'email'},
        {text: 'Phone Number', value: 'phoneNumber'},
        {text: 'Quote Date', value: 'quoteDate'},
        {text: 'Expiry Date', value: 'expiryDate'},
        {text: 'Latest Contact Date', value: 'latestContactDate'},
        {text: 'Quote Status', value: 'quoteStatus'},
        {text: 'Commission Amount', value: 'commissionAmount'},
        {text: 'Actions', value: 'actions', sortable: false},
      ],
      // TODO: FIX THIS LATER
      editedItem: {
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        dateSold: '',
        quoteDate: '',
        expiryDate: '',
        latestContactDate: '',
        quoteStatus: '',
        commissionAmount: '',
        referral: '',
      },
      defaultItem: {
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        dateSold: '',
        quoteDate: '',
        expiryDate: '',
        latestContactDate: '',
        quoteStatus: '',
        commissionAmount: '',
        referral: '',
      },
    };
  },

  methods: {
    readClients: async function () {
      const data = await api.readClient();
      this.clients = data;
      console.log(data)
    },
    setCarrier: async function(client){
      this.editedItem = Object.assign({},client)
      let carrier = await api.getCarrier(this.editedItem.id)
      console.log(this.editedItem);
      this.carrier = carrier;
      console.log(carrier);
      this.dialogCarrier = true;
    },
    deleteCarrier: async function(id){
      let response = await api.deleteCarrier(id)
      console.log(response)
      this.dialogCarrier = false;
    },
    addCarrier: async function(id){
      console.log(id)
      const requestData = {
        type: this.toAddCarrier,
      }
      console.log(requestData.data)
      let response = await api.addCarrier(requestData,this.editedItem.id)
      console.log(response)
      this.toAddCarrier = "";
      this.dialogCarrier = false;
    },
    editClient(client) {
      this.editedIndex = this.clients.indexOf(client)
      this.editedItem = Object.assign({}, client)
      this.dialog = true
    },
    confirmDeleteClient(item){
      this.editedIndex = this.clients.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteClient: async function() {
      let response = await api.deleteClient(this.editedItem.id)
      console.log(response)
      window.location.reload();
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save: async function(id) {
      // edit the user
      if (this.editedIndex > -1) {
        let response = await api.updateClient(this.editedItem,id)
        console.log(response)
        window.location.reload();
       } else { // add new user
        let response = await api.createClient(this.editedItem)
        console.log(response)
        window.location.reload();
      }
      this.close()
    },
  },
  mounted() {
    this.readClients();
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Create new client' : 'Edit client'
    },
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    dialogCarrier (val){
      val || this.closeDelete()
    },
  },
};
</script>
