<template>
    <span>
        {{formatedDate}}
    </span>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    value: {
      type: String,
      required: true
    },
    mask: {
      type: String,
      default: 'DD/MM/YYYY'
    }
  },

  computed: {
    formatedDate: function () {
      return moment.utc(this.value).format(this.mask)
    }
  }
}
</script>
