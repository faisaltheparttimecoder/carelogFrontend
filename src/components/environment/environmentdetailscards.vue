<template>
  <section>
    <div v-for="(instance_type, index) in instances">
      <div class="hero">
        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title has-text-primary">
              {{ index.toUpperCase() }}
            </h1>
          </div>
        </div>
      </div>
      <div class="tile is-ancestor" v-for="i in chunkInstance(instance_type)">
        <div class="tile is-parent" v-for="instance in i">
          <div class="tile is-child box" >
            <p class="title">{{ instance.name }}</p>
            <p class="subtitle"><strong>Infrastructure (IaaS): </strong> {{ instance.infrastructure }}</p>
            <p><strong> Product List </strong></p>
            <table class="table is-narrow is-hoverable is-fullwidth is-striped">
              <tbody>
              <tr v-for="product in instance.environment_instance">
                <th>{{ product.name }}</th>
                <td>{{ product.version }}</td>
                <td>
                  <a class="level-item is-danger" v-on:click="$emit('DeleteInstanceProduct', product.id)">
                    <span class="icon is-small">
                      <i class="fas fa-times"></i>
                    </span>
                  </a>
                </td>
              </tr>
              </tbody>
            </table>
            <nav class="level is-mobile">
              <div class="level-left">
                <a class="level-item"  v-on:click="$emit('updateInstance', instance)">
                  <span class="icon is-small">
                    <i class="fas fa-pencil-alt"></i>
                  </span>
                </a>
                <a class="level-item" v-on:click="$emit('deleteInstance', instance.id)">
                  <span class="icon is-small">
                    <i class="fas fa-trash"></i>
                  </span>
                </a>
              </div>
              <div class="level-right">
                <p class="heading">
                  <strong> updated: </strong> {{ instance.updated | moment("ddd, MMMM Do YYYY HH:MM:ss Z") }}
                </p>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

  var chunk = require('chunk')
  import defaults from './../../mixins/default'
  export default {
    mixins: [
      defaults
    ],
    props: [
      'orgID', 'instances'
    ],
    methods: {
      chunkInstance: function(instance) {
        return chunk(instance, 3)
      }
    },
  }

</script>
