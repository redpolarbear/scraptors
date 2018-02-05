<template>
  <b-container>
    <app-url-input-form></app-url-input-form>
    <app-show-item v-if="getItem !== null" :item="getItem"></app-show-item>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import UrlInputFormComponent from '@/components/home/UrlInputForm'
import ShowItemComponent from '@/components/home/ShowItem'

export default {
  name: 'home',
  components: {
    'app-url-input-form': UrlInputFormComponent,
    'app-show-item': ShowItemComponent
  },
  computed: {
    ...mapGetters({
      getItem: 'GET_ITEM'
    })
  },
}
</script>

<style>

</style>
