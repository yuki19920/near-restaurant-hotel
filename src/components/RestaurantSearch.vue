<template>
    <v-container>
      <h2 style="margin-bottom: 20px" id="topTitle">飲食店リスト</h2>
      <template v-for="res in searchedRes.shop">
        <v-row :key="restaurantName(res)">
          <v-col cols="12" sm="6" md="4" lg="3">
            <a
              :href="restaurantUrl(res)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>{{ restaurantName(res) }}</p>
              <img :src="restaurantThumnail(res)" />
            </a>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3">
            <p>{{ restaurantCatch(res) }}</p>
            <p>{{ restaurantGenreCatch(res) }}</p>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3">
            <p>{{ restaurantBudget(res) }}</p>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3">
            <p>{{ restaurantAccess(res) }}</p>
          </v-col>
        </v-row>
      </template>
      <template>
        <div class="text-center">
          <v-container>
            <v-row justify="center">
              <v-col cols="5">
                <v-container class="max-width" @click="$vuetify.goTo(0)">
                  <v-pagination
                    v-model="page"
                    class="my-4"
                    :length="pageLength"
                    @input="pageChange"
                    circle
                  ></v-pagination>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
          <v-overlay :value="isLoading">
            <v-progress-circular indeterminate size="64" />
          </v-overlay>
        </div>
      </template>
    </v-container>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    props: ["restaurants", "resSearchingInfo"],
    data() {
      return {
        searchedRes: this.restaurants,
        resCount: this.restaurants.results_available,
        page: 1,
        pageSize: 10,
        isLoading: false,
      };
    },
    computed: {
      pageLength: function () {
        return Math.ceil(this.resCount / this.pageSize);
      },
      getStartPage() {
        return (this.page - 1) * this.pageSize + 1;
      },
    },
    methods: {
      restaurantName(r) {
        return r.name;
      },
      restaurantUrl(r) {
        return r.urls.pc;
      },
      restaurantThumnail(r) {
        return r.photo.pc.m;
      },
      restaurantCatch(r) {
        return r.catch;
      },
      restaurantAccess(r) {
        return r.access;
      },
      restaurantTotalCount(r) {
        return r.results_availabl;
      },
      restaurantBudget(r) {
        return r.budget.average;
      },
      restaurantGenreCatch(r) {
        return r.genre.catch;
      },
      pageChange() {
        this.isLoading = true;
        axios
          .get("/api/restaurant-data", {
            params: {
              lat: this.resSearchingInfo.lat,
              lng: this.resSearchingInfo.lng,
              range: this.resSearchingInfo.restaurantKm,
              genre: this.resSearchingInfo.genre,
              start: this.getStartPage,
              format: "json",
            },
          })
          .then((response) => {
            this.searchedRes = response.data.results;
            this.isLoading = false;
          })
          .catch((error) => {
            console.log(error);
            this.isLoading = false;
            alert("飲食店情報が取得できません");
          });
      },
    },
  };
  </script>
  