<template>
  <div>
    <b-card >
      <b-row>
        <b-col>
          <h5>{{ item.name }}</h5>
        </b-col>
      </b-row>
      <b-row fluid no-gutters>
        <b-col sm="auto" align-self="center" v-for="(img, index) in item.imgs" :key="index">
          <b-img fluid :src="img.src" style="max-width: 128px; max-height: 128px;"/>
        </b-col>
      </b-row>
      <b-row fluid>
        <b-col cols="4" v-for="(sku, indx) in item.skus" :key="indx">
          <b-card>
            <b-media>
              <b-img v-if="sku.colorImg" slot="aside" :src="sku.colorImg" width="64" height="64" />
              <b-img v-else slot="aside" blank blank-color="#abc" width="64" height="64" />
              <p class="mt-0">Color: {{ sku.colorName }}</p>
              <p>Price: {{ sku.price }}</p>
              <b-form-group id="sizeSelectGroup" label="Size:" label-for="sizeSelect">
                <b-form-select multiple id="sizeSelect" v-if="sku.sizes" :select-size="4">
                  <option v-for="size in sku.sizes" :key="size" :value="size">{{ size }}</option>
                </b-form-select>
                <b-form-select id="sizeSelect" v-else>
                  <option value="One Size">One Size</option>
                </b-form-select>
              </b-form-group>
            </b-media>
          </b-card>
        </b-col>
      </b-row>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="DESCRIPTION" active>
            <div v-html="item.desc"></div>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-card>
    <b-row align-h="center">
      <b-col cols="auto">
        <b-button variant="info" @click="onNextStep">Next Step</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'showItem',
  props: ['item'],
  methods: {
    onNextStep (event) {
      event.preventDefault()
      this.$store.commit('COPY_TO_WEIDIAN_ITEM_STEP_1', { name: this.item.name })
      this.$store.commit('INITIAL_SKU_IN_WEIDIAN_ITEM', { num: this.item.skus.length })
      this.$router.push('/wizard')
    }
  }
}
</script>

<style>
#imgs > label > span.custom-control-description {
  width: 100% !important;
}
</style>
