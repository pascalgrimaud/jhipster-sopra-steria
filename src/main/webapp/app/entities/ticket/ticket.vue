<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('sopraSteriaApp.ticket.home.title')" id="ticket-heading">Tickets</span>
            <router-link :to="{name: 'TicketCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-ticket">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('sopraSteriaApp.ticket.home.createLabel')">
                    Create a new Ticket
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && tickets && tickets.length === 0">
            <span v-text="$t('sopraSteriaApp.ticket.home.notFound')">No tickets found</span>
        </div>
        <div class="table-responsive" v-if="tickets && tickets.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('title')"><span v-text="$t('sopraSteriaApp.ticket.title')">Title</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'title'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('description')"><span v-text="$t('sopraSteriaApp.ticket.description')">Description</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'description'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('dueDate')"><span v-text="$t('sopraSteriaApp.ticket.dueDate')">Due Date</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'dueDate'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('done')"><span v-text="$t('sopraSteriaApp.ticket.done')">Done</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'done'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('project.name')"><span v-text="$t('sopraSteriaApp.ticket.project')">Project</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'project.name'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('assignedTo.login')"><span v-text="$t('sopraSteriaApp.ticket.assignedTo')">Assigned To</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'assignedTo.login'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="ticket in tickets"
                    :key="ticket.id">
                    <td>
                        <router-link :to="{name: 'TicketView', params: {ticketId: ticket.id}}">{{ticket.id}}</router-link>
                    </td>
                    <td>{{ticket.title}}</td>
                    <td>{{ticket.description}}</td>
                    <td>{{ticket.dueDate}}</td>
                    <td>{{ticket.done}}</td>
                    <td>
                        <div v-if="ticket.project">
                            <router-link :to="{name: 'ProjectView', params: {projectId: ticket.project.id}}">{{ticket.project.name}}</router-link>
                        </div>
                    </td>
                    <td>
                        {{ticket.assignedTo ? ticket.assignedTo.login : ''}}
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'TicketView', params: {ticketId: ticket.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'TicketEdit', params: {ticketId: ticket.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(ticket)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="sopraSteriaApp.ticket.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-ticket-heading" v-text="$t('sopraSteriaApp.ticket.delete.question', {'id': removeId})">Are you sure you want to delete this Ticket?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-ticket" v-text="$t('entity.action.delete')" v-on:click="removeTicket()">Delete</button>
            </div>
        </b-modal>
        <div v-show="tickets && tickets.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./ticket.component.ts">
</script>
