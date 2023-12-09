<template>
    <v-container>
      <h2>ホテルリスト</h2>
      <template v-for="hotel in hotels">
        <v-row :key="hotelName(hotel)" style="margin: 5 0 5 0;">
          <v-col cols="12" sm="6" md="4" lg="3">
            <a :href="hotelUrl(hotel)" target="_blank" rel="noopener noreferrer">
              <p>{{ hotelName(hotel) }}</p>
              <img :src="hotelThumnailUrl(hotel)" />
            </a>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3">
            <p>{{ hotelSpecial(hotel) }}</p>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3">
            <p>{{ hotelAccess(hotel) }}</p>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3">
            <p>{{ hotelReview(hotel) }}</p>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </template>
  
  <script>
  export default {
    props: ["hotels"],
    methods: {
      hotelName(info) {
        return info.hotel[0].hotelBasicInfo.hotelName;
      },
      hotelUrl(info) {
        return info.hotel[0].hotelBasicInfo.hotelInformationUrl;
      },
      hotelSpecial(info) {
        return info.hotel[0].hotelBasicInfo.hotelSpecial;
      },
      hotelAccess(info) {
        return info.hotel[0].hotelBasicInfo.access;
      },
      hotelReview(info) {
        return info.hotel[0].hotelBasicInfo.userReview;
      },
      hotelThumnailUrl(info) {
        return info.hotel[0].hotelBasicInfo.hotelThumbnailUrl;
      },
    },
  };
  </script>
  