import Vuex from 'vuex'
import _ from 'lodash'

const createStore = () => {
  return new Vuex.Store({
    state () {
      return {
        item: null,
        loading: false,
        error: null,
        weidian: {
          item: {
            price: '', // price
            stock: '', // stock
            itemName: '', // product name
            bigImgs: [], // Array[string], weidian https
            titles: [], // Array[string], desc for the images
            cate_id: '', // category id, separate by comma
            free_delivery: '', // delivery cost: 0 - cost, 1 - free
            remote_free_delivery: '' // remote delivery cost: 0 - free, 1 - cost
          },
          sku: [],
          attr_list: []
        }
      }
    },
    getters: {
      GET_ITEM: (state) => {
        return state.item
      },
      GET_LOADING: (state) => {
        return state.loading
      },
      GET_ERROR: (state) => {
        return state.error
      },
      GET_WEIDIAN: (state) => {
        return state.weidian
      },
      GET_WEIDIAN_ITEM: (state) => {
        return state.weidian.item
      },
      GET_WEIDIAN_ATTR_LIST: (state) => {
        return state.weidian.attr_list
      },
      GET_WEIDIAN_ATTR_LIST_BY_TITLE: (state) => {
        return title => state.weidian.attr_list.filter(item => item.attr_title === title)
      },
      GET_WEIDIAN_SKU: (state) => {
        return state.weidian.sku
      }
    },
    mutations: {
      SET_ITEM (state, payload) {
        state.item = payload
      },
      SET_LOADING (state, payload) {
        state.loading = payload
      },
      SET_ERROR (state, payload) {
        state.error = payload
      },
      SET_ITEM_IMG_INFO (state, payload) {
        state.item.imgs[payload.index][payload.key] = payload.value
      },
      COPY_TO_WEIDIAN_ITEM_STEP_1 (state, payload) {
        state.weidian.item.itemName = payload.name
      },
      INITIAL_SKU_IN_WEIDIAN (state, payload) {
        state.weidian.sku = []
        for (let i = 0; i < payload.num; i++) {
          // const sku = {
          //   title: '',
          //   stock: 1,
          //   price: '',
          //   sku_merchant_code: '',
          //   attr_ids: [],
          //   img: ''
          // }
          const sku = {
            skuIndex: i,
            img: ''
          }
          state.weidian.sku.push(sku)
        }
      },
      SET_WEIDIAN_ATTR_LIST (state, payload) {
        state.weidian.attr_list = payload.attr_list
      },
      SET_WEIDIAN_SKU_IMAGE (state, payload) {
        state.weidian.sku[payload.index].img = payload.img
      },
      SELECT_ATTR_TITLES_FOR_WEIDIAN_ITEM (state, payload) {
        if (state.weidian.item.hasOwnProperty('attr_list')) {
          const toRemove = _.differenceBy(state.weidian.item.attr_list, payload, 'attr_title')
          const toAdd = _.differenceBy(payload, state.weidian.item.attr_list, 'attr_title')
          state.weidian.item.attr_list = state.weidian.item.attr_list.filter((el) => !toRemove.includes(el))
          state.weidian.item.attr_list = _.concat(state.weidian.item.attr_list, toAdd)
        } else {
          state.weidian.item = {
            ...state.weidian.item,
            attr_list: payload
          }
        }
      },
      REMOVE_ATTR_TITLES_FROM_WEIDIAN_ITEM (state) {
        if (state.weidian.item.hasOwnProperty('attr_list')) {
          state.weidian.item = _.omit(state.weidian.item, 'attr_list')
        }
      },
      SELECT_ATTR_TITLES_FOR_WEIDIAN_SKU (state) {
        let newSKU = _.clone(state.weidian.sku)
        newSKU.forEach((e) => {
          e.attr_list = state.weidian.item.attr_list
        })
        state.weidian.sku = newSKU
      },
      REMOVE_ATTR_TITLES_FROM_WEIDIAN_SKU (state) {
        let newSKU = _.clone(state.weidian.sku)
        for (let i = 0; i < newSKU.length; i ++) {
          newSKU[i] = _.omit(newSKU[i], 'attr_list')
        }
        state.weidian.sku = newSKU
      },
    },
    actions: {
      async SCRAPE_ITEM_BY_API ({commit}, payload) {
        commit('SET_LOADING', true)
        this.$axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', ['post'])
        try {
          const item = await this.$axios.$post('/api/scrape', {
            url: payload.url
          })
          commit('SET_ITEM', item)
          commit('SET_LOADING', false)
        } catch (error) {
          let errorMessage = error.errorMessage
          commit('SET_LOADING', false)
          commit('SET_ERROR', errorMessage)
          console.log(errorMessage)
        }
      },
      async SAVE_IMAGES_TO_LOCAL ({commit}, payload) {
        try {
          const filename = await this.$axios.$get('/api/saveimage', {
            params: {
              imageUrl: payload.imageUrl
            }
          })
          commit('SET_ITEM_IMG_INFO', {index: payload.index, key: 'local', value: filename})
          const wdsrc = await this.$axios.$get('/api/uploadimage', {
            params: {
              filename
            }
          })
          commit('SET_ITEM_IMG_INFO', {index: payload.index, key: 'wdsrc', value: wdsrc})
        } catch (error) {
          console.log(error)
        }
      },
      async WEIDIAN_GET_ATTRIBUTE ({commit}, payload) {
        try {
          const attrList = await this.$axios.$get('/api/getattr')
          commit('SET_WEIDIAN_ATTR_LIST', { attr_list: attrList.data.attr_list })
        } catch (error) {
          console.log(error)
        }
      }
    }
  })
}

export default createStore
