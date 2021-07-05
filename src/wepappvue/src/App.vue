<template>
  <v-app>
    <div>
    <v-toolbar color="indigo darken-4"  >
      <v-toolbar-title class="text-uppercase white--text">
        <span class="font-weight-light">Bryant</span>
        <span> Insurance</span>
      </v-toolbar-title>
    </v-toolbar>
    </div>
    <div class="ma-0 pa-0" >
        <v-navigation-drawer
            color="#09151E"
            permanent
            expand-on-hover
            height="92.5vh"
            mini-variant-width="20vh"
            width="40vh"
            dark
        >
                   <v-list
                       dense
                       nav
                       class="py-0"
                   >
                     <v-list-item two-line :class="miniVariant && 'px-10'">
                       <v-list-item-avatar size="100">
                         <img src="https://scontent.fkdt2-1.fna.fbcdn.net/v/t1.6435-9/131494959_2150874375044351_1395866012002412665_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=KIVQoj6KZuEAX9_Nqbf&tn=z_i1IRYF_DIjOQlW&_nc_ht=scontent.fkdt2-1.fna&oh=c702aa2a579380a6f87be0c7d66a89bf&oe=60E66660">
                       </v-list-item-avatar>

                       <v-list-item-content>
                         <v-list-item-title class="font-weight-medium white--text">Firstname Lastname</v-list-item-title>
                         <v-list-item-subtitle class="font-weight-medium white--text">ROLES</v-list-item-subtitle>
                       </v-list-item-content>
                     </v-list-item>
                     <v-divider></v-divider>
                   </v-list>
          <v-list dense>
            <v-list-item
                v-for="item in items"
                :key="item.title"
                link
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <template v-slot:append>
            <div class="pa-2">
              <v-btn block>
                Logout
              </v-btn>
            </div>
          </template>
                 </v-navigation-drawer>
    </div>
    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  data: () => ({
    items: [
      { title: 'Edit User', icon: 'mdi-wrench' },
      { title: 'Add User', icon: 'mdi-account-multiple-plus' },
      { title: 'Add Carrier', icon: 'mdi-file-document-outline' },
    ],
    //
  }),
};
</script>
