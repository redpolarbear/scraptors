<template>
  <!-- <b-modal id="attrValuesModal" title="Attribution Values"> -->
    <b-row>
      <b-col sm="auto">
        <b-card>
          <b-media no-body>
            <b-media-body>
              <b-form-group>
                <b-form-checkbox-group v-model="attrList.attr_title">
                  <b-form-checkbox :value="attrList.attr_title" :disabled="true">{{ attrList.attr_title }}</b-form-checkbox>
                  <b-form-select :select-size="8" multiple v-model="attrValuesSelected">
                    <option
                      v-for="attr_value in attrList.attr_values"
                      :key="attr_value.attr_id"
                      :value="attr_value.attr_value"
                      :disabled="false">
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
  <!-- </b-modal> -->
</template>

<script>
export default {
  name: 'stepTwoAttrValuesModal',
  props: [ 'attrList', 'attrValuesSelected' ]
}
</script>

<style>

</style>
