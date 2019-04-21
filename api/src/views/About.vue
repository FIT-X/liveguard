<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div v-for="img in images" :key="img">
      <img :src="img" @click="sendImage(img)">
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
@Component
export default class About extends Vue {
  images = [
    "https://storage.googleapis.com/beachhacks2k19/norip1.jpg",
    "https://storage.googleapis.com/beachhacks2k19/norip2.jpg",
    "https://storage.googleapis.com/beachhacks2k19/norip3.jpg",
    "https://storage.googleapis.com/beachhacks2k19/norip4.jpg",
    "https://storage.googleapis.com/beachhacks2k19/norip5.jpg",
    "https://storage.googleapis.com/beachhacks2k19/norip6.jpg",
    "https://storage.googleapis.com/beachhacks2k19/norip7.jpg",
    "https://storage.googleapis.com/beachhacks2k19/norip8.jpg",
    "https://storage.googleapis.com/beachhacks2k19/norip9.jpg",
    "https://storage.googleapis.com/beachhacks2k19/norip10.jpg",
    "https://storage.googleapis.com/beachhacks2k19/rip1.jpg",
    "https://storage.googleapis.com/beachhacks2k19/rip2.jpg",
    "https://storage.googleapis.com/beachhacks2k19/rip3.jpg",
    "https://storage.googleapis.com/beachhacks2k19/rip4.jpg",
    "https://storage.googleapis.com/beachhacks2k19/rip5.jpg",
    "https://storage.googleapis.com/beachhacks2k19/rip6.jpg",
    "https://storage.googleapis.com/beachhacks2k19/rip7.jpg",
    "https://storage.googleapis.com/beachhacks2k19/rip8.jpg",
    "https://storage.googleapis.com/beachhacks2k19/rip9.jpg",
    "https://storage.googleapis.com/beachhacks2k19/rip10.jpg"
  ];

  sendImage(imageUrl: string) {
    axios
      .post("/riptide", { imageUrl })
      .then(function(response) {
        console.log(response);
        alert(JSON.stringify(response.data, null, '    '));
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
</script>

<style lang="scss" scoped>
img {
  height: 150px;
}
</style>
