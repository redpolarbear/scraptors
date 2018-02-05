<template>
  <b-form @submit="onSubmit" novalidate>
    <b-form-group
      id="scrapeInputGroup"
      description="Please copy/paste the url you'd like to scrape.">
      <b-form-input
        id="url-input"
        type="url"
        v-model="url"
        required
        placeholder="Enter url">
      </b-form-input>
    </b-form-group>
    <b-row class="justify-content-center">
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-row>
  </b-form>
</template>

<script>
export default {
  name: 'UrlInputForm',
  data () {
    return {
      url: ''
    }
  },
  methods: {
    // async onSubmit (event) { // production function
    //   event.preventDefault()
    //   this.$store.commit('SET_ITEM', null)
    //   this.$store.dispatch('SCRAPE_ITEM_BY_API', {url: this.url})
    // }
    onSubmit (event) {
      event.preventDefault()
      const itemSample = {
        skus: [
          {
            colorImg: 'https://cdn.mec.ca/medias/sys_master/placeholder/placeholder/8912718921758/5043127-LIA01-SWATCH-placeholder.jpg',
            colorName: 'Liam Plaid',
            price: 69,
            sizes: ['XX-Large']
          },
          {
            colorImg: 'https://cdn.mec.ca/medias/sys_master/placeholder/placeholder/8912732291102/5043127-MDB20-SWATCH-placeholder.jpg',
            colorName: 'Midnight Blue Tom Plaid',
            price: 69,
            sizes: ['Small', 'Medium', 'XX-Large']
          },
          {
            colorImg: 'https://cdn.mec.ca/medias/sys_master/placeholder/placeholder/8912735272990/5043127-BK618-SWATCH-placeholder.jpg',
            colorName: 'Black Olive Tom Plaid',
            price: 69,
            sizes: ['Small', 'Medium', 'XX-Large']
          }
        ],
        desc: '<p>From gridlock to off the grid, a plaid shirt remains low-key. This one has a tailored fit to neaten things up a bit.</p><ul><li>Made of soft, comfortable organically grown cottona and recycled polyester.</li><li>Slim fit for a bit of tailored sophistication.</li><li>Chest pockets allow you to bring this and that.</li><li>Length at centre back is 30 inches.</li></ul>',
        imgs: [
          {
            local: '',
            src: 'https://cdn.mec.ca/medias/sys_master/high-res/high-res/8912717217822/5043127-LIA01.jpg',
            wdsrc: ''
          },
          {
            local: '',
            src: 'https://cdn.mec.ca/medias/sys_master/high-res/high-res/8912718331934/5043127-LIA01-ALT-BACK.jpg',
            wdsrc: ''
          },
          {
            local: '',
            src: 'https://cdn.mec.ca/medias/sys_master/high-res/high-res/8912732094494/5043127-MDB20.jpg',
            wdsrc: ''
          },
          {
            local: '',
            src: 'https://cdn.mec.ca/medias/sys_master/high-res/high-res/8912734781470/5043127-BK618.jpg',
            wdsrc: ''
          }
        ],
        name: 'MEC Lodging Shirt - Men\'s'
      }
      this.$store.commit('SET_ITEM', itemSample)
    }
  }
}
</script>

<style>

</style>
