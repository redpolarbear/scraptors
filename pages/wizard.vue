<template>
  <b-container>
    <form-wizard>
      <tab-content title="Upload Images" :before-change="onGetWeidianAttrList">
        <app-step-one></app-step-one>
      </tab-content>
      <tab-content title="SKU">

      </tab-content>
    </form-wizard>
  </b-container>
</template>

<script>
import StepOneComponent from '@/components/wizard/StepOne'

export default {
  name: 'wizard',
  components: {
    'app-step-one': StepOneComponent
  },
  methods: {
    async onGetWeidianAttrList () {
      await this.$store.dispatch('WEIDIAN_GET_ATTRIBUTE')
      return true
    }
  },
}
</script>

<style>

</style>
