<template>
  <section class="nothing flex flex-v flex-align-center">
      <img src="~/assets/images/nothing@2x.png" alt="">
      <p>此处空空如也</p>
  </section>
</template>

<style scoped>
.nothing {
  color: #808080;
  margin: 15vw 0;
}
.nothing img {
  width: 21.6vw;
  height: 23.4vw;
  margin-bottom: 10px;
}
@media screen and (min-width: 681px) {
  .nothing {
    display: none;
  }
}
</style>