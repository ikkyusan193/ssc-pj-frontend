<template>
  <div class="Login">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Welcome to Bryant-Insurance</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                      v-model="username"
                      id="username"
                      name="username"
                      label="Username"
                      type="text"
                  ></v-text-field>
                  <v-text-field
                      v-model="password"
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer> </v-spacer>
<!--                TODO add actions and send to api-->
                <v-btn color="primary" v-on:click="login">Login</v-btn>
                <v-dialog v-model="dialog" persistent max-width="600px" >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on" class="mx-2">
                      Create Account
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">Create User</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4" >
                            <v-text-field
                                label="Legal first name*"
                                required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                                label="Email*"
                                required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                                label="Password*"
                                type="password"
                                required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                      <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </div>
</template>



<script>
import api from "@/service/apiService";
export default {
  name: "Author",
  data() {
    return {
      username: "",
      password: "",
      dialog: false,
      responseSuccess: false
    };
  },
  methods: {
    login: async function() {
      this.dialog = false;
      let requestData = new FormData();
      requestData.append("username",this.username);
      requestData.append("password",this.password);

      let response = await api.login(requestData);
      if(response.data.success){
        this.$router.push({name:"Home"});
      }
      this.responseSuccess = response;
    },
  },
  mounted() {
  },
};
</script>