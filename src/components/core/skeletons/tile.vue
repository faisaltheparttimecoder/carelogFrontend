<template>
  <div>
    <div class="tile is-ancestor" v-for="chunkedData in data">
      <div class="tile is-parent" v-for="content in chunkedData">
        <div class="tile is-child box">
          <nav class="level is-mobile">
            <div class="level-left">
              <p class="heading"><strong> updated: </strong> {{ formatDate(content.updated, true) }} </p>
            </div>
            <div class="level-right">
              <a class="level-item" v-on:click="$emit('edit', content)">
                <span class="icon is-small"><i class="fas fa-pencil-alt"></i></span>
              </a>
              <a class="level-item" v-on:click="$emit('delete', content.id)">
                <span class="icon is-small"><i class="fas fa-trash"></i></span>
              </a>
              <a class="level-item" v-on:click="$emit('detail', content.id)" v-if="showDetail">
                <span class="icon is-small"><i class="fas fa-bullseye"></i></span>
              </a>
            </div>
          </nav>
          <slot :content="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'data', 'showDetail'
    ]
  }
</script>
