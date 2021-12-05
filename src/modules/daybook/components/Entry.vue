<template>
  <div class="entry-container mb-3 pointer p-2"
        @click="$router.push({name: 'entry', params: {id: 10}})">
      <div class="entry-title d-flex">
          <span class="text-success fs-5 fw-bold">15</span>
          <span class="mx-1 fs-5">Julio</span>
          <span class="mx-2 fw-light">2021</span>
      </div>
      <div class="entry-description">
          Deserunt esse ex enim fugiat et in laboris esse proident ea veniam et. Est elit officia aute dolor amet in non exercitation laborum excepteur. Minim ea ad officia nulla.
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

.entry-container {
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover {
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-out;
    }

    .entry-description {
        font-size: 12px;
    }
}


</style>