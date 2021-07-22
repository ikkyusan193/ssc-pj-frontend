<template>
  <v-app>

<!--    TOOLBAR AT THE TOP-->
  <div>
    <v-toolbar color="indigo darken-4" max-height="60">
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase white--text">
        <span class="font-weight-light">Bryant</span>
        <span> Insurance</span>
      </v-toolbar-title>
    </v-toolbar>
  </div>


<!--    ROUTER VIEW-->
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-navigation-drawer v-if="$store.state.isLoggedIn === true" color="#09151E" dark v-model="drawer" absolute bottom temporary >
      <v-list dense nav class="py-0" >
        <v-list-item two-line :class="'px-10'">
          <v-list-item-avatar size="50">
            <img src="https://cf.shopee.co.th/file/429c897c97f5825abbb794b6609549dc">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium white--text">{{ $store.state.username }}</v-list-item-title>
            <v-list-item-subtitle class="font-weight-medium white--text">{{ $store.state.role }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
      <v-list nav dense>
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

<!--      ORIGINAL LOGOUT BUTTON-->
<!--      <template v-slot:append>-->
<!--        <div class="pa-2" >-->
<!--          <v-btn block v-on:click="logout" tile>-->
<!--            Logout-->
<!--          </v-btn>-->
<!--        </div>-->
<!--      </template>-->


        <div class="pa-2" >
          <v-btn block v-on:click="logout" tile>
            Logout
          </v-btn>
        </div>

    </v-navigation-drawer>
  </v-app>
</template>



<script>
import api from "@/service/apiService";
export default {
  name: 'App',
  data: () => ({
    drawer: false,
    items: [
      { title: 'Home', icon: 'mdi-home-city', route: '/' },
      { title: 'Add/Modify Users', icon: 'mdi-account',route:'/Users'},
      { title: 'Add/Modify Client', icon: 'mdi-account-multiple-plus', route: '/Clients' },
      { title: 'Add/Modify Carrier', icon: 'mdi-file-document-outline', route: '/Carriers' },
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
    },
  },

};
</script>

<style>
#app{
  background: url("https://www.therev.co.nz/wp-content/uploads/2020/07/656668.jpg");
}
</style>
