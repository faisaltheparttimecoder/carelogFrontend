<template>
  <section>
    <app-no-contents :message="noEnvDetailsContent" v-if="objectEmpty(instances)"> </app-no-contents>
    <div v-for="(instance_type, index) in instances" v-else>
      <!--Type of environment banner-->
      <app-banner :title="index.toUpperCase()"></app-banner>
      <!--Environment Type instance cards-->
      <app-tile :data="chunkData(instance_type, 3)"
                @delete="confirmDelete($event, 'Environment Instance')"
                @edit="$emit('editInstance', {
                  id: $event.id,
                  type: $event.type_id,
                  name: $event.name,
                  timeline_id: $event.timeline_id,
                  infrastructure: $event.infrastructure,
                  inputs: $event['environment_instance']
                })">
        <template slot-scope="props">
          <p class="title">{{ props.content.name }}</p>
          <p class="subtitle"><strong>Infrastructure (IaaS): </strong> {{ props.content.infrastructure }}</p>
          <p><strong> Product List </strong></p>
          <table class="table is-narrow is-hoverable is-fullwidth is-striped">
            <tbody>
            <tr v-for="product in props.content.environment_instance">
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
        </template>
      </app-tile>
    </div>
  </section>
</template>

<script>
   import banner from './../../core/skeletons/banner'
   import tile from './../../core/skeletons/tile'
   export default {
     components: {
       'app-banner': banner,
       'app-tile': tile
     },
     props: [
       'orgID', 'instances'
     ],
     methods: {
       deleteData: function (id) {
         this.delete(this.api.envInstance + id + '/').then(response => {
           this.notice(this.instanceDeleteSuccess, 'success', 'success')
           this.$emit('updateInstance')
         }).catch(error => {
           this.errorParser(this.instanceDeleteFailure, error)
         })
       }
     }
   }
</script>
