<template>
  <div>
    <v-app>
      <!-- TOOL BAR AT THE TOP -->
      <div>
        <v-toolbar color="indigo darken-4" max-height="60">
          <v-toolbar-title class="text-uppercase white--text">
            <span class="font-weight-light">Bryant</span>
            <span> Insurance</span>
          </v-toolbar-title>
        </v-toolbar>

        <v-main>
          <!-- Navigation bar -->
          <v-navigation-drawer color="#09151E" expand-on-hover  mini-variant-width="20vh" width="40vh" dark>
            <v-list dense nav class="py-0" >
              <v-list-item two-line :class="'px-10'">
                <v-list-item-avatar size="100">
                  <img src="https://cf.shopee.co.th/file/429c897c97f5825abbb794b6609549dc">
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-medium white--text">TODO GET USERNAME</v-list-item-title>
                  <v-list-item-subtitle class="font-weight-medium white--text">TODO GET ROLES</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </v-list>
            <v-list dense>
              <v-list-item v-for="item in items" :key="item.title" router :to="item.route">
                <v-list-item-icon>
                  <v-icon>
                    {{ item.icon }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-btn class="pa-2" block v-on:click="logout" tile>Logout </v-btn>
          </v-navigation-drawer>

          <v-container>
            <v-row>
              <v-col>
                <v-sheet min-height="70vh" rounded="lg">
                  <!--  -->
                  <router-view></router-view>
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </div>









      <!-- Main content -->
      <!--  <div>-->
      <!--    <v-main class="white">-->
      <!--      <v-container fluid>-->
      <!--        <router-view></router-view>-->
      <!--      </v-container>-->
      <!--    </v-main>-->
      <!--  </div>-->


    </v-app>
  </div>
</template>



<script>
import api from "@/service/apiService";
export default {
  name: 'App',
  data: () => ({
    items: [
      { title: 'Home', icon: 'mdi-home-city', route: '/' },
      { title: 'My Account', icon: 'mdi-account',route:'/Login'},
      { title: 'Add User', icon: 'mdi-account-multiple-plus', route: '/Crud' },
      { title: 'Add Carrier', icon: 'mdi-file-document-outline', route: '/Add-Carrier' },
    ],
    search: '',
    headers: [
      {
        text: 'Name',
        align: 'start',
        filterable: true,
        value: 'name',
      },
      {text: 'Carrier', value: 'carrier'},
      {text: 'Phone Number', value: 'phone_number'},
      {text: 'Date Sold', value: 'sell_date'},
    ],
    entries: [
      {
        name: 'John Smith',
        carrier: 'Progressive',
        phone_number: '888-555-1234',
        sell_date: '12/21/2020',
      },
    ],
  }),
  methods: {
    logout: async function() {
      let response = await api.logout();
      if(response.data.success){
        await this.$router.push("/Login")
      }
      this.responseSuccess = response;
    },
  },
};
</script>
