<template>
  <v-app>
    <v-alert dismissible v-model="alert" :value="alert" :color="alertColor" :icon="alertIcon" border="left"
             elevation="2" colored-border><strong>{{ this.alertText }}</strong></v-alert>
    <v-data-table :headers="headers" :items="users" class="elevation-5" :search="search">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>USERS LIST</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                        hide-details></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog persistent no-click-animation v-model="dialog" max-width="1000px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" v-if="$store.getters.getRank > 0">New User</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.username" label="Username"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select v-model="editedItem.role" item-text="message"  item-value="message" :items="roles" label="ROLE" solo></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field type='password' v-model="editedItem.password" :rules="passwordRules" label="Password"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field type='password' v-model="editedItem.confirmPassword" :rules="confirmPasswordRules" label="Confirm Password"></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" :disabled="isPasswordButtonDisabled" text @click="save(tempUsername)">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--DELETE DIALOG-->
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title v-model="editedItem" class="text-h5 justify-center">Are you sure you want to remove user:
                {{ editedItem.username }}?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <!--TODO: SEND REQUEST HERE BROTHER-->
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteUser">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--EDIT USER-->
          <v-dialog persistent no-click-animation v-model="dialogEditUser" max-width="1000px">
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit {{ currentLoggedInUser }}'s info</span>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.username" label="Username"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select v-model="editedItem.role" item-text="message" item-value="message" :items="roles" label="ROLE" solo></v-select>
                  </v-col>
              </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" :disabled="isUsernameButtonDisabled" text @click="save(tempUsername)">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--EDIT PASSWORD-->
          <v-dialog persistent no-click-animation v-model="dialogPassword" max-width="1000px">
            <v-form v-model="passwordForm">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Edit {{ currentLoggedInUser }}'s password</span>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field type='password' v-model="editedItem.password" label="Password"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field type='password' v-model="editedItem.confirmPassword" label="Confirm Password"></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" :disabled="isPasswordButtonDisabled" text @click="save(tempUsername)">Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editUser(item)"
                v-if="$store.getters.getRank > 0 || currentLoggedInUser === item.username">mdi-pencil
        </v-icon>
        <v-icon v-if="currentLoggedInUser === item.username" small @click="changePassword(item)"
                title="Change Password">mdi-key
        </v-icon>
        <v-icon v-if="currentLoggedInUser === item.username || item.role === 'ROLE_USER'" small @click="confirmDeleteUser(item)" title="Delete User">
          mdi-delete
        </v-icon>
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
      dialogEditUser: false,
      dialogPassword: false,
      users: [],
      roles: [],
      search: "",
      editedIndex: -1,
      editPassword: false,
      currentLoggedInUser: this.$store.state.username,
      tempPassword: "",
      tempUsername: "",
      confirmPassword: "",
      //NOTIFICATIONS STUFFS
      requestStatus: "",
      response: "",
      alert: false,
      alertText: "",
      //FORM STUFFS
      createForm: false,
      passwordForm: false,
      passwordRules: [
        (value) => !!value || 'Please type password.'
      ],
      confirmPasswordRules: [
        (value) =>
            value === this.editedItem.password || 'The password confirmation does not match.',
      ],
      ////////////
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
        password: '',
        // confirmPassword: '',
        role: 'ROLE_USER',
      },
      defaultItem: {
        sid: '',
        username: '',
        password: '',
        // confirmPassword: '',
        role: 'ROLE_USER',
      },
    };
  },

  methods: {
    readUsers: async function () {
      const data = await api.readUser();
      const data2 = await api.readRole();
      this.users = data;
      this.roles = data2.data;
      console.log(data)
      console.log(data2.data)
    },
    changePassword(user) {
      this.editedIndex = this.users.indexOf(user)
      this.editedItem = Object.assign({}, user)
      this.editPassword = true;
      this.tempPassword = this.editedItem.password;
      this.tempUsername = this.editedItem.username;
      this.editedItem.password = "";
      this.dialogPassword = true;
      this.editedIndex = 555;
    },
    editUser(user) {
      this.editedIndex = this.users.indexOf(user)
      this.editedItem = Object.assign({}, user)
      this.tempUsername = this.editedItem.username;
      // this.dialog = true
      this.dialogEditUser = true
    },
    confirmDeleteUser(item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteUser: async function () {
      let response = await api.deleteUser(this.editedItem.username)
      this.requestStatus = this.response.data.success;
      this.alertText = this.response.data.message;
      this.alert = true;
      await this.readUsers();
      console.log(response)
      this.close()
    },
    close() {
      if (this.editPassword === true) {
        this.editedItem.password = this.tempPassword;
        this.tempPassword = "";
      }
      this.dialog = false
      this.dialogPassword = false
      this.dialogEditUser = false
      this.dialogDelete = false
      this.editPassword = false
      this.tempUsername = ""
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.readUsers();
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.readUsers();
      })
    },
    save: async function (username) {
      if (this.editedIndex === 555) {
        let requestResponse = await api.changePasswordUser(this.editedItem, this.editedItem.username)
        this.response = requestResponse;
        // this.alert = true;
      } else if (this.editedIndex > -1) {
        let requestResponse = await api.updateUser(this.editedItem, username)
        this.response = requestResponse;
        // this.alert = true;
      } else {
        let requestResponse = await api.createUser(this.editedItem)
        this.response = requestResponse;
      }
      this.requestStatus = this.response.data.success;
      this.alertText = this.response.data.message;
      this.alert = true;
      this.close()
    },
  },
  mounted() {
    this.readUsers();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Create new user' : 'Edit ' + this.editedItem.username + "'s account"
    },
    alertColor() {
      return this.requestStatus ? 'green' : 'red'
    },
    alertIcon() {
      return this.requestStatus ? 'mdi-checkbox-marked-circle' : 'mdi-cancel'
    },
    isPasswordButtonDisabled() {
      return !(this.editedItem.password || this.editedItem.confirmPassword);
    },
    isUsernameButtonDisabled() {
      return this.editedItem.username === "";
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
};
</script>