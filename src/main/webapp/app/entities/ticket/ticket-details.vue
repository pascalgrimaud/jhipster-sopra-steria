<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="ticket">
                <h2 class="jh-entity-heading"><span v-text="$t('sopraSteriaApp.ticket.detail.title')">Ticket</span> {{ticket.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('sopraSteriaApp.ticket.title')">Title</span>
                    </dt>
                    <dd>
                        <span>{{ticket.title}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sopraSteriaApp.ticket.description')">Description</span>
                    </dt>
                    <dd>
                        <span>{{ticket.description}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sopraSteriaApp.ticket.dueDate')">Due Date</span>
                    </dt>
                    <dd>
                        <span>{{ticket.dueDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sopraSteriaApp.ticket.done')">Done</span>
                    </dt>
                    <dd>
                        <span>{{ticket.done}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('sopraSteriaApp.ticket.project')">Project</span>
                    </dt>
                    <dd>
                        <div v-if="ticket.project">
                            <router-link :to="{name: 'ProjectView', params: {projectId: ticket.project.id}}">{{ticket.project.name}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('sopraSteriaApp.ticket.assignedTo')">Assigned To</span>
                    </dt>
                    <dd>
                        {{ticket.assignedTo ? ticket.assignedTo.login : ''}}
                    </dd>
                    <dt>
                        <span v-text="$t('sopraSteriaApp.ticket.label')">Label</span>
                    </dt>
                    <dd>
                        <span v-for="(label, i) in ticket.labels" :key="label.id">{{i > 0 ? ', ' : ''}}
                            <router-link :to="{name: 'LabelView', params: {labelId: label.id}}">{{label.label}}</router-link>
                        </span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="ticket.id" :to="{name: 'TicketEdit', params: {ticketId: ticket.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./ticket-details.component.ts">
</script>
