<template class="max-">
  <v-app>
    <v-data-table :headers="headers" :items="users" class="elevation-1" height="550px" :search="search">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>USERS LIST</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog persistent no-click-animation v-model="dialog" max-width="1000px" >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New User</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" >
                      <v-text-field v-model="editedItem.username" label="Username"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" >
                      <v-text-field v-model="editedItem.role" label="Role"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
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
              <v-card-title v-model="editedItem" class="text-h5 justify-center">Are you sure you want to remove user: {{editedItem.username}}?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <!--TODO: SEND REQUEST HERE BROTHER-->
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteUser">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editUser(item)" title="Edit User">mdi-pencil</v-icon>
        <v-icon small @click="confirmDeleteUser(item)" title="Delete User">mdi-delete</v-icon>
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
      users: [],
      search: "",
      editedIndex: -1,
      headers: [
        {text: 'User Id', value: 'sid'},
        {text: 'Username', value: 'username'},
        {text: 'Role', value: 'role'},
        {text: 'Actions', value: 'actions', sortable: false},
      ],
      // TODO: FIX THIS LATER
      editedItem: {
        sid: '',
        username: '',
        role: '',
      },
      defaultItem: {
        sid: '',
        username: '',
        role: '',
      },
    };
  },

  methods: {
    readUsers: async function () {
      const data = await api.readUser();
      this.users = data;
      console.log(data)
    },
    editUser(user) {
      this.editedIndex = this.users.indexOf(user)
      this.editedItem = Object.assign({}, user)
      this.dialog = true
    },
    confirmDeleteUser(item){
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteUser: async function() {
      let response = await api.deleteUser(this.editedItem.username)
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
      if (this.editedIndex > -1) {
        let response = await api.updateUser(this.editedItem,id)
        console.log(response)
        window.location.reload();
      } else {
        let response = await api.createUser(this.editedItem)
        console.log(response)
        window.location.reload();
      }
      this.close()
    },
  },
  mounted() {
    this.readUsers();
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Create new user' : 'Edit user'
    },
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