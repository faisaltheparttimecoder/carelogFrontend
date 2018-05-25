<template>
  <section class="section">
    <div class="columns">
      <!--Menu Items-->
      <div class="column is-2">
        <app-menu :menu-items="menuItems"
                  :selectedItem='selectedItem'
                  menuTitle="Resource Category"
                  :sourceInfo=false
                  @refreshContent="loadResources($event)"
                  @updateItem="updateCategory = {id: $event.id, name: $event.name}"
                  @deleteItem="confirmDelete($event, 'Category')"
                  :menuModification="true">
          <!--Extra contents for the menu-->
          <div slot="menuTop">
            <!--Button to add new category-->
            <p class="menu-label has-text-primary has-text-weight-bold">
              Action
            </p>
            <app-category @new="menuItems.push($event)"
                          @update="updateMenuItem"
                          :url="api.resource"
                          :updateCategory="updateCategory">
            </app-category>
          </div>
        </app-menu>
      </div>
      <!--Content section-->
      <div class="column is-10">
        <section>
          <!--The Editor-->
          <app-editor :optionSwitch="switches"
                      :fullWidth="true"
                      :rows="100"
                      :showButton="showButton"
                      :source="resources.content"
                      v-on:saveEdit="confirmSave($event, 'Page')">
            <p class="heading" slot="slot-data">
              <strong>Last Updated:</strong> {{ this.formatDate(resources.updated, true) }}
            </p>
          </app-editor>
          <!--If there is no content, then print this message-->
          <app-no-contents :message="noEnvContentMessage"
                           v-if="resources.content===''">
          </app-no-contents>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
  import resource from './resources'
  import editor from './../core/editor/editor'
  import category from './../core/category'
  export default {
    mixins: [
      resource
    ],
    components: {
      'app-editor': editor,
      'app-category': category
    }
  }
</script>
