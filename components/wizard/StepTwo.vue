<template>
  <div>
    <b-row align-v="end">
      <b-col sm="auto" v-for="(img, index) in item.imgs" :key="index" v-if="img.wdsrc">
        <drag style="cursor: move" :transfer-data="{ img: img.wdsrc }" effectAllowed="copy" dropEffect="copy">
          <b-img thumbnail :src="img.wdsrc" width="96"/>
        </drag>
      </b-col>
    </b-row>
    <hr>
    <b-button v-b-modal.attrListModal>Add Attributes</b-button>
    <!-- <b-button-group v-for="attrTitle in attrTitleChecked" :key="attrTitle.attr_title">
      <b-button variant="outline-success" size="sm">{{ attrTitle.attr_title }}</b-button>
      <b-button variant="outline-success" size="sm"><span>&times;</span></b-button>
    </b-button-group> -->
    <app-step-two-attr-list-modal></app-step-two-attr-list-modal>
    <b-row fluid v-for="(sku, indx) in item.skus" :key="indx">
      <b-col sm="auto">
        <b-card>
          <b-media>
            <b-img v-if="sku.colorImg" slot="aside" :src="sku.colorImg" width="64" height="64" />
            <b-img v-else slot="aside" blank blank-color="#abc" width="64" height="64" />
            <p>Price: {{ sku.price }}</p>
            <p class="mt-0">Color: {{ sku.colorName }}</p>
            <b-form-group id="sizeSelectGroup" label="Size:" label-for="sizeSelect">
              <!-- <label class="mr-sm-2" for="sizeSelect">Size: </label> -->
              <b-form-select id="sizeSelect" v-if="sku.sizes" :select-size="4" multiple v-model="skuSizesSelects">
                <option v-for="size in sku.sizes" :key="size" :value="size" :disabled="true">{{ size }}</option>
              </b-form-select>
              <b-form-select id="sizeSelect" v-else>
                <option value="One Size">One Size</option>
              </b-form-select>
            </b-form-group>
          </b-media>
        </b-card>
      </b-col>
      <b-col sm="auto">
        =>
      </b-col>
      <b-col sm="auto">
        <b-card>
          <b-media>
            <drop v-if="weidian.sku[indx].img === ''" slot="aside" style="padding: 30px; border: 1px solid black;" @drop="handleImageDrop(indx, ...arguments)">+</drop>
            <b-img v-else slot="aside" :src="weidian.sku[indx].img" width="96" style="height: 100%;"/>
            <b-row v-for="list in weidian.sku[indx].attr_list" :key="list.attr_title">
              <b-button-group>
                <b-button variant="outline-info" size="sm">{{ list.attr_title}}</b-button>
                <b-button variant="outline-info" size="sm" @click="onSelectAttrValues(indx, list.attr_title)">+</b-button>
              </b-button-group>
            </b-row>
          </b-media>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="attrValuesModal" title="Attribution Values" :lazy="true">
      <app-step-two-attr-values-modal :attrList="attrList" :attrValuesSelected="attrValuesSelected"></app-step-two-attr-values-modal>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import StepTwoAttrListModalComponent from './StepTwoAttrListModal'
import StepTwoAttrValuesModalComponent from './StepTwoAttrValuesModal'

export default {
  name: 'StepTwo',
  computed: {
    ...mapGetters({
      item: 'GET_ITEM',
      weidian: 'GET_WEIDIAN'
    }),
    attrList () {
      return this.$store.getters.GET_WEIDIAN_ATTR_LIST_BY_TITLE(this.attrTitle)[0]
    },
    attrValuesSelected () {
      const attr_list = this.$store.getters.GET_WEIDIAN_SKU_ATTR_LIST_BY_INDEX_AND_TITLE(this.attrTitle, this.skuIndex)[0]
      if (attr_list.hasOwnProperty('attr_values')) {
        return attr_list.attr_values
      } else {
        return []
      }
    }
  },
  components: {
    'app-step-two-attr-list-modal': StepTwoAttrListModalComponent,
    'app-step-two-attr-values-modal': StepTwoAttrValuesModalComponent
  },
  data () {
    return {
      attrTitle: '',
      skuIndex: null,
      skuSizesSelects: []
    }
  },
  methods: {
    handleImageDrop (index, data, event) {
      this.$store.commit('SET_WEIDIAN_SKU_IMAGE', { index, img: data.img })
    },
    onSelectAttrValues (index, title) {
      this.attrTitle = title
      this.skuIndex = index
      this.$refs.attrValuesModal.show()
    }
  },
}
</script>

<style>

</style>
