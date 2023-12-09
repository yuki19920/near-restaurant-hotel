<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" clipped>
      <v-container>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title grey--text text--darken-2"
              >メニュー</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav>
          <template v-for="nav_list in nav_lists">
            <v-list-item :key="nav_list.name">
              <v-list-item-content>
                <v-list-item-title
                  @click="
                    currentComponent = nav_list.valu;
                    drawer = !drawer;
                  "
                  class="hamburger-menu"
                  >{{ nav_list.name }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-container>
    </v-navigation-drawer>
    <v-app-bar color="green" dark app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>現在地からホテルと飲食店検索!</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="currentComponent = 'SearchResults'; $vuetify.goTo(0)">検索</v-btn>
      <v-toolbar-items>
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" text>使い方</v-btn>
          </template>
          <v-card>
            <v-card-title class="headline green lighten-2" style="color: white"
              >現在地からホテルと飲食店検索</v-card-title
            >
            <v-card-text
              >ホットペッパーグルメと楽天空室検索が現在地から検索可能です</v-card-text
            >
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">閉じる</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <template v-if="currentComponent == 'SearchResults'">
        <SearchResults
          @hotels="hotels = $event"
          @restaurants="restaurants = $event"
          @resSearchingInfo="resSearchingInfo = $event"
          @getCurrentComponent="currentComponent = $event"
        ></SearchResults>
      </template>
      <template v-else-if="currentComponent == 'HotelSearch'">
        <HotelSearch :hotels="hotels"></HotelSearch>
      </template>
      <template v-else-if="currentComponent == 'RestaurantSearch'">
        <RestaurantSearch
          :restaurants="restaurants"
          :resSearchingInfo="resSearchingInfo"
        ></RestaurantSearch>
      </template>
      <!-- <div>{{ restaurants }}</div> -->
    </v-main>
    <v-footer color="green" dark app>ホテルと飲食店検索アプリ Powered by ホットペッパー Webサービス</v-footer>
  </v-app>
</template>

<script>
import SearchResults from "./components/SearchResults.vue";
import HotelSearch from "./components/HotelSearch.vue";
import RestaurantSearch from "./components/RestaurantSearch.vue";

export default {
  name: "App",

  components: {
    SearchResults,
    HotelSearch,
    RestaurantSearch,
  },
  
  data: () => ({
    hotels: {},
    restaurants: {},
    resSearchingInfo: {},
    drawer: true,
    dialog: false,
    currentComponent: "SearchResults",
    nav_lists: [
      { name: "飲食店", valu: "RestaurantSearch" },
      { name: "ホテル", valu: "HotelSearch" },
      { name: "検索", valu: "SearchResults" },
    ],
  }),
};
</script>
<style>
.hamburger-menu {
  cursor: pointer;
}
</style>
