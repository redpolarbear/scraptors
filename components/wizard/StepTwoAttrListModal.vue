<template>
  <b-modal id="attrListModal" title="Attribute Title List" @ok="selectAttrTitle">
    <b-row>
      <b-col sm="auto" v-for="attr in weidian.attr_list" :key="attr.attr_title">
        <b-card>
          <b-media no-body>
            <b-media-body>
              <b-form-group>
                <b-form-checkbox-group v-model="attrTitleChecked">
                  <b-form-checkbox :value="{ attr_title: attr.attr_title }">{{attr.attr_title}}</b-form-checkbox>
                  <b-form-select :select-size="8" multiple v-model="attrValueSelected">
                    <option
                      v-for="attr_value in attr.attr_values"
                      :key="attr_value.attr_id"
                      :value="attr_value"
                      :disabled="true">
                      {{ attr_value.attr_value }}
                    </option>
                    <!-- :disabled="!!attrTitleChecked.attr_title ? attrTitleChecked.attr_title !== attr.attr_title : false"> -->
                  </b-form-select>
                </b-form-checkbox-group>
              </b-form-group>
            </b-media-body>
          </b-media>
        </b-card>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'stepTwoAttrListModal',
  computed: {
    ...mapGetters({
      weidian: 'GET_WEIDIAN'
    })
  },
  data() {
    return {
      attrTitleChecked: [],
      attrValueSelected: []
    }
  },
  methods: {
    selectAttrTitle () {
      if (this.attrTitleChecked.length > 0) {
        this.$store.commit('SELECT_ATTR_TITLES_FOR_WEIDIAN_ITEM', this.attrTitleChecked)
        this.$store.commit('SELECT_ATTR_TITLES_FOR_WEIDIAN_SKU')
      } else if (this.attrTitleChecked.length === 0) {
        this.$store.commit('REMOVE_ATTR_TITLES_FROM_WEIDIAN_ITEM')
        this.$store.commit('REMOVE_ATTR_TITLES_FROM_WEIDIAN_SKU')
      }
    }
  },
}
</script>

<style>

</style>
