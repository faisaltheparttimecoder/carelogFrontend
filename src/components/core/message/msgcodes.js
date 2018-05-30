// Placeholder to control all the message flow.
const  errorSuffix = 'Check the browsers console log for more details'
export default {
  data: function () {
    return {
      // All the messages for home & engagement page
      pageLoadFailure: 'Error loading the page, ' + errorSuffix,
      pageUpdateSuccess: 'Page successfully updated',
      pageUpdateFailure: 'Failed to update the page, ' + errorSuffix,
      mapLoadingFailure: 'Failed to obtain the map data, ' + errorSuffix,
      noContentPage: 'Cannot save, since the page has no data',

      // All the message from team page
      teamLoadFailure: 'Failed to obtain the team information, ' + errorSuffix,
      teamPostSuccess: 'Successfully created a new team member',
      teamPostFailure: 'Failure in creating a new team member, ' + errorSuffix,
      deleteTeamSuccess: 'Successfully deleted team member data',
      deleteTeamFailure: 'Failure in deleting team member, ' + errorSuffix,
      updateTeamFailure: 'Failure in updating team member, ' + errorSuffix,
      updateTeamSuccess: 'Successfully updated team member ',

      // Achievements pages
      certificationUserLoadFailure: 'Failed to load all the certificated users list, ' + errorSuffix,
      certifiedSaveSuccess: 'Successfully saved certification information',
      certifiedSaveFailure: 'Failed to save certification information, ' + errorSuffix,
      certifiedUpdateSuccess: 'Successfully updated certification information',
      certifiedUpdateFailure: 'Failed to update certification information, ' + errorSuffix,
      certifiedDeleteSuccess: 'Successfully deleted the certification information',
      certifiedDeleteFailure: 'Failed to delete certification information, ' + errorSuffix,
      feedbackLoadFailure: 'Failed to load all the feedback list, ' + errorSuffix,
      feedbackSaveSuccess: 'Successfully saved teams feedback',
      feedbackSaveFailure: 'Failed to save feedback, ' + errorSuffix,
      feedbackUpdateSuccess: 'Successfully updated feedback',
      feedbackUpdateFailure: 'Failed to update feedback, ' + errorSuffix,
      feedbackDeleteSuccess: 'Successfully deleted the feedback',
      feedbackDeleteFailure: 'Failed to delete feedback, ' + errorSuffix,

      // Rss feed page related message
      rssLoadFailure: 'Failed to get data for RSS Page, ' + errorSuffix,
      rssPostSuccess: 'Successfully saved the location of RSS',
      rssPostFailure: 'Failure in saving the new RSS location, ' + errorSuffix,
      rssDeleteSuccess: 'Successfully deleted the rss reader entry',
      rssDeleteFailure: 'Failed to remove the rss reader, ' + errorSuffix,
      rssUpdateSuccess: 'Successfully updated the rss reader entry',
      rssUpdateFailure: 'Failed to update the rss reader, ' + errorSuffix,
      rssContentFailure: 'Failed to obtain the content for this RSS feed, ' + errorSuffix,
      rssNoContentMessage: 'There doesn\'t seems to be any RSS content for this feed source, check the URL or try again later',

      // Product page related messages
      productReleaseFailure: 'Failed to obtain release information for this product, ' + errorSuffix,
      productLoadFailure: 'Failed to obtain all the products name, ' + errorSuffix,
      productNoContentMessage: 'There doesn\'t seems to be any releases for this product',

      // Link page related messages
      categoryLoadFailure: 'Failure in retrieving all the link categories. ' + errorSuffix,
      linkLoadingFailure: 'Failed to load the links from the database, ' + errorSuffix,
      selectedCategoryLoadFailure: 'Failed to retrieve links from this selected category, ' + errorSuffix,
      selectedLinkLoadFailure: 'Failed to retrieve links of this selected category, ' + errorSuffix,
      categorySaveSuccess: 'Successfully saved the category name',
      categorySaveFailure: 'Failed to save the category, ' + errorSuffix,
      categoryDeleteSuccess: 'Successfully deleted the category',
      categoryDeleteFailure: 'Failed to delete the category, ' + errorSuffix,
      categoryUpdateSuccess: 'Successfully updated the category',
      categoryUpdateFailure: 'Failed to update the category, ' + errorSuffix,
      linkAddSuccess: 'Successfully saved the links',
      linkAddFailure: 'Failed to save the links, '  + errorSuffix,
      linkUpdateSuccess: 'Successfully updated the links',
      linkUpdateFailure: 'Failed to updated the links, '  + errorSuffix,
      linkDeleteSuccess: 'Successfully deleted the links',
      linkDeleteFailure: 'Failed to delete the links, '  + errorSuffix,
      linkNoContentMessage: 'This category don\'t have any URL, add one using the register new link button',

      // Customer components related messages
      customerLoadFailure: 'Failed to obtain the customer information, ' + errorSuffix,
      countryListLoadFailure: 'Failed to obtain all the country list, ' + errorSuffix,
      noCustomerModifyMessage: 'Nothing to modify, since there is no customer list found',
      deleteCustomerSuccess: 'Organisation Successfully Deleted',
      deleteCustomerFailure: 'Failed to delete the customer, ' + errorSuffix,
      archiveCustomerSuccess: 'Successfully archived the customer',
      archiveCustomerFailure: 'Failed to archive the customer, ' + errorSuffix,
      noCustomerSelected: 'Nothing selected, type and select the customer name from the list',
      addCustomerSuccess: 'Successfully saved the customer information',
      addCustomerFailure: 'Failed to save the customer information, ' + errorSuffix,

      // Chart
      noChartDataMessage: 'No chart data available',

      // Dashboard specific messages
      recentlyAddedCustomer: 'Dashboard for this customer is not yet ready (sync is in progress). Come back later after 30 to 40 minutes....',
      dashboardDataFailure: 'Failed to obtain the dashboard data for loading the charts, ' + errorSuffix,

      // Ticket page messages.
      ticketLoadFailure: 'Failed to load ticket data, ' + errorSuffix,
      patchRecordFailure: 'Failed to save the state of the patch for the ticket, ' + errorSuffix,
      patchClearFailure: 'Failed to remove the patch state for the ticket, ' + errorSuffix,
      noTicketMessage: 'There doesn\'t seems to be tickets created (or open) within those date range, try different date range',
      ticketCommentLoadFailure: 'Failed to load the ticket comments, ' + errorSuffix,
      ticketNotesLoadFailure: 'Failed to load the ticket notes, ' + errorSuffix,
      ticketMetricsLoadFailure: 'Failed to load the ticket metrics, ' + errorSuffix,
      ticketNotesSaveSuccess: 'Notes successfully saved',
      ticketNotesSaveFailure: 'Failed to save the notes, ' + errorSuffix,
      ticketNotesDeleteSuccess: 'Notes successfully deleted',
      ticketNotesDeleteFailure: 'Failed to delete the notes, ' + errorSuffix,
      ticketAttributeRegisterError: 'Failed to register the state of ticket',

      // Environment
      environmentLoadFailure: 'Failed to load the environment information for this page',
      noEnvContentMessage: 'No content available, click on the edit button to edit the page...',
      environmentPostSuccess: 'The environment information has been successfully saved',
      environmentPutSuccess: 'The environment information has been successfully updated',
      environmentPostFailure: 'Failed to save the environment information, ' + errorSuffix,
      environmentPutFailure: 'Failed to update the environment information, ' + errorSuffix,
      notesLoadFailure: 'Failed to load environment notes' + errorSuffix,
      notesPostSuccess: 'Successfully created new notes',
      notesPostFailure: 'Failed to create new notes, ' + errorSuffix,
      notesDeleteSuccess: 'Successfully deleted note',
      notesDeleteFailure: 'Failed to delete the note, '+ errorSuffix,
      notesUpdateSuccess: 'Successfully updated note title',
      notesUpdateFailure: 'Failed to update the note title, '+ errorSuffix,
      noNotesMessage: 'No environment notes found, Click on the add button to add one.',
      noteContentUpdateSuccess: 'Environment note content successfully updated',
      noteContentUpdateFailure: 'Failed to update environment note content, ' + errorSuffix,
      noProductSelected: 'No product selected, select some product and click save again',
      chooseProductFromList: 'Choose all products that apply to this customer',
      postProductListSuccess: 'Successfully saved the product list for this customer',
      postProductListFailure: 'Failed to save the product list for this customer, ' + errorSuffix,
      updateProductListSuccess: 'Successfully updated the product list for this customer',
      updateProductListFailure: 'Failed to update the product list for this customer, ' + errorSuffix,
      instanceTypeLoadFailure: 'Failed to load the environment instance type, ' + errorSuffix,
      failedTimeLineCreation: 'Failed to create a timeline for this environment, ' + errorSuffix,
      environmentInstancePostFailure: 'Failed to record the environment instance name, ' + errorSuffix,
      environmentInstancePutFailure: 'Failed to update the environment instance name, ' + errorSuffix,
      environmentInstanceProductPostFailure: 'Failure in recording the instance information, ' + errorSuffix,
      failureToPostToTimeline: 'Failed to update the timeline about this environment changes, ' + errorSuffix,
      successfullySavedProductInfo: 'Successfully recorded the product information in the database',
      noEnvDetailsContent: 'There is no environment details available, try adding one by clicking on Add Button...',
      instanceDeleteSuccess: 'Successfully deleted environment instance',
      instanceDeleteFailure: 'Failed to delete environment instance, ' + errorSuffix,
      instanceProductDeleteSuccess: 'Environment Instance Product Successfully Deleted',
      instanceProductDeleteFailure: 'Failure in deleting Environment Instance Product' + errorSuffix,
      environmentInstanceListLoadFailure: 'Failed to load the environment instance, ' + errorSuffix,
      environmentProductLoadFailure: 'Failed to load the environment products, ' + errorSuffix,
      environmentDistinctProductLoadFailure: 'Failed to load the distinct environment products, ' + errorSuffix,

      // Timeline
      noTimelineMessage: 'No timeline available, click on the add button to add one.',
      timelineLoadFailure: 'Failed to obtain the timeline information, ' + errorSuffix,
      newTimelinePostSuccess: 'Successfully created new timeline',
      newTimelinePostFailure: 'Failed to create new timeline, ' + errorSuffix,
      timelineUpdateSuccess: 'Successfully updated timeline',
      timelineUpdateFailure: 'Failed to update timeline, ' + errorSuffix,
      timelineDeleteSuccess: 'Successfully deleted timeline',
      timelineDeleteFailure: 'Failed to delete timeline, ' + errorSuffix,
      noTimelineDataMessage: 'No data available, add some activity using the form.',
      timelineDataLoadFailure: 'Failed to get the timeline data, ' + errorSuffix,
      timelineDataPostSuccess: 'Successfully saved timeline data',
      timelineDataPostFailure: 'Failed to save timeline data, ' + errorSuffix,
      timelineDataUpdateSuccess: 'Successfully updated timeline data',
      timelineDataUpdateFailure: 'Failed to update timeline data, ' + errorSuffix,
      timelineDataDeleteSuccess: 'Successfully deleted timeline data',
      timelineDataDeleteFailure: 'Failed to delete timeline data, ' + errorSuffix,

      // Resource Page
      resourceUpdateSuccess: 'Successfully saved the content of the resource page',
      resourceUpdateFailure: 'Failed to save the content of the resource page, ' + errorSuffix,
      resourcePageLoadFailure: 'Failed to load resource page, ' + errorSuffix

    }
  }
}
