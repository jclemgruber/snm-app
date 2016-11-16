<template>
  <div>
    <spinner v-if="loading" :size="20" class="float-right"></spinner>
    <template v-else>
      <!--i v-show="isEmpty" class="primary float-right">search</i-->
      <a href="#" v-show="isDirty" class="primary float-right" @click.prevent="clear"><i>close</i></a>
    </template>

    <input type="text"
           class="full-width"
           placeholder="Search"
           autocomplete="off"
           @keydown.down="down"
           @keydown.up="up"
           @keydown.enter="hit"
           @keydown.esc="reset"
           @blur="reset"
           v-model="query"
           @input="update"
           :disabled="loading"/>

    <ul v-show="hasItems">
      <li v-for="(item, index) in items" :class="activeClass(index)" @mousedown="hit" @mousemove="setActive(index)">
        <span class="name" v-text="item.nome"></span>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  data () {
    return {
      limit: 5,
      minChars: 3,
      query: '',
      current: -1,
      loading: false,
      items: []
    }
  },

  computed: {
    hasItems () {
      return this.items.length > 0
    },

    isEmpty () {
      return !this.query
    },

    isDirty () {
      return !!this.query
    },

    getParams () {
      return {
        'params': {
          q: this.query,
          limit: this.limit
        }
      }
    }
  },

  methods: {
    setActive (index) {
      this.current = index
    },

    activeClass (index) {
      return {
        active: this.current === index
      }
    },

    hit () {
      if (this.current !== -1) {
        this.onHit(this.items[this.current])
      }
    },

    reset () {
      this.items = []
    },

    clear () {
      this.items = []
      this.query = ''
      this.$emit('input', '')
    },

    up () {
      if (this.current > 0) {
        this.current--
      }
      else if (this.current === -1) {
        this.current = this.items.length - 1
      }
      else {
        this.current = -1
      }
    },

    down () {
      if (this.current < this.items.length - 1) {
        this.current++
      }
      else {
        this.current = -1
      }
    },

    onHit (item) {
      this.query = item.nome
      this.$emit('input', item.id)
      this.items = []
    },

    update () {
      if (!this.query) {
        return this.reset()
      }

      if (this.minChars && this.query.length < this.minChars) {
        return
      }
      this.loading = true
      this.$http.get('/api/cidades/list', this.getParams).then((response) => {
        let data = response.data
        this.items = data.slice(0, this.limit)
        this.current = -1
        this.loading = false
      }, (response) => {
        console.log(response)
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
i {
  float: right;
  position: relative;
  top: 30px;
  opacity: 0.4;
}

ul {
  position: absolute;
  padding: 0;
  margin-top: 8px;
  min-width: 100%;
  background-color: #fff;
  list-style: none;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0,0,0, 0.25);
  z-index: 1000;
}

li {
  padding: 10px 16px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

li:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

li:last-child {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom: 0;
}

span {
  display: block;
  color: #2c3e50;
}

.active {
  background-color: #3aa373;
}

.active span {
  color: white;
}

.name {
  font-weight: 700;
  font-size: 18px;
}

.screen-name {
  font-style: italic;
}
</style>
