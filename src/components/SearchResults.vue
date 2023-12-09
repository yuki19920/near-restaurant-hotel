<template>
    <v-container>
      <v-row justify="center" align-content="center">
        <v-col cols="12" sm="6" md="4" lg="3">
          <h3>ホテル検索</h3>
          <v-select
            :items="hotelRange"
            label="現在地からの距離(km)"
            v-model="hotelKm"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <h3>飲食店検索</h3>
          <v-select
            :items="restaurantRange"
            item-text="km"
            item-value="id"
            label="現在地からの距離(km)"
            v-model="restaurantKm"
          ></v-select>
          <v-select
            :items="genre"
            item-text="genreName"
            item-value="id"
            label="飲食店ジャンル"
            v-model="selectedGenre"
          ></v-select>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center">
        <v-col cols="2" sm="1" md="1" lg="1">
          <v-btn @click="start" elevation="2" x-large>検索</v-btn>
        </v-col>
      </v-row>
      <template>
        <v-app>
          <v-overlay :value="isLoading">
            <v-progress-circular indeterminate size="64" />
          </v-overlay>
        </v-app>
      </template>
    </v-container>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        latitude: 0,
        longitude: 0,
        hotelRange: [3, 2, 1],
        hotelKm: 3,
        isLoading: false,
        restaurantRange: [
          { km: 3, id: 5 },
          { km: 2, id: 4 },
          { km: 1, id: 3 },
          { km: 0.5, id: 2 },
          { km: 0.3, id: 1 },
        ],
        restaurantKm: 5,
  
        genre: [
          { id: null, genreName: "-------------------------------" },
          { id: "G001", genreName: "居酒屋" },
          { id: "G002", genreName: "ダイニングバー・バル" },
          { id: "G003", genreName: "創作料理" },
          { id: "G004", genreName: "和食" },
          { id: "G005", genreName: "洋食" },
          { id: "G006", genreName: "イタリアン・フレンチ" },
          { id: "G007", genreName: "中華" },
          { id: "G008", genreName: "焼肉・ホルモン" },
          { id: "G017", genreName: "韓国料理" },
          { id: "G009", genreName: "アジア・エスニック料理" },
          { id: "G010", genreName: "各国料理" },
          { id: "G011", genreName: "カラオケ・パーティ" },
          { id: "G012", genreName: "バー・カクテル" },
          { id: "G013", genreName: "ラーメン" },
          { id: "G016", genreName: "お好み焼き・もんじゃ" },
          { id: "G014", genreName: "カフェ・スイーツ" },
          { id: "G015", genreName: "その他・グルメ" },
        ],
        selectedGenre: null,
        resSearchingInfo: {},
      };
    },
    methods: {
      start() {
        this.isLoading = true;
        navigator.geolocation.getCurrentPosition(this.success, this.error);
      },
      success(position) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        // this.latitude = "35.645736";
        // this.longitude = "139.74757499999998";
        console.log("緯度：" + this.latitude);
        console.log("経度：" + this.longitude);
        this.searchHotel();
        this.searchRestaurant();
      },
      error() {
        alert("現在地が取得できませんでした");
      },
      searchHotel() {
        console.log("searchHotel-tuka");
        axios
          .get("/api/hotel-data", {
            params: {
              latitude: this.latitude,
              longitude: this.longitude,
              searchRadius: this.hotelKm
            }
          })
          .then((response) => {
            this.$emit("hotels", response.data.hotels);
          })
          .catch((error) => {
            console.log(error);
            alert("ホテル情報が取得できません");
          });
      },
      searchRestaurant() {
        console.log("searchrestaurant-tuka");
        axios
          .get("/api/restaurant-data", {
            params: {
              lat: this.latitude,
              lng: this.longitude,
              range: this.restaurantKm,
              genre: this.selectedGenre,
              start: "1",
              format: "json",
            },
          })
          .then((response) => {
            this.$emit("restaurants", response.data.results);
            this.resSearchingInfo = {
              lat: this.latitude,
              lng: this.longitude,
              restaurantKm: this.restaurantKm,
              genre: this.selectedGenre,
            };
            this.$emit("resSearchingInfo", this.resSearchingInfo);
            setInterval(() => {
              this.isLoading = false;
              this.$emit("getCurrentComponent", "RestaurantSearch");
            }, 1000);
          })
          .catch((error) => {
            this.isLoading = false;
            console.error("APIリクエストエラー:", error);
          });
      },
    },
  };
  </script>
  