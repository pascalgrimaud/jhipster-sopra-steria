<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="sopraSteriaApp.ticket.home.createOrEditLabel" v-text="$t('sopraSteriaApp.ticket.home.createOrEditLabel')">Create or edit a Ticket</h2>
                <div>
                    <div class="form-group" v-if="ticket.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="ticket.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sopraSteriaApp.ticket.title')" for="ticket-title">Title</label>
                        <input type="text" class="form-control" name="title" id="ticket-title"
                            :class="{'valid': !$v.ticket.title.$invalid, 'invalid': $v.ticket.title.$invalid }" v-model="$v.ticket.title.$model"  required/>
                        <div v-if="$v.ticket.title.$anyDirty && $v.ticket.title.$invalid">
                            <small class="form-text text-danger" v-if="!$v.ticket.title.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sopraSteriaApp.ticket.description')" for="ticket-description">Description</label>
                        <input type="text" class="form-control" name="description" id="ticket-description"
                            :class="{'valid': !$v.ticket.description.$invalid, 'invalid': $v.ticket.description.$invalid }" v-model="$v.ticket.description.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sopraSteriaApp.ticket.dueDate')" for="ticket-dueDate">Due Date</label>
                        <div class="input-group">
                            <input id="ticket-dueDate" type="date" class="form-control" name="dueDate"  :class="{'valid': !$v.ticket.dueDate.$invalid, 'invalid': $v.ticket.dueDate.$invalid }"
                            v-model="$v.ticket.dueDate.$model"  />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sopraSteriaApp.ticket.done')" for="ticket-done">Done</label>
                        <input type="checkbox" class="form-check" name="done" id="ticket-done"
                            :class="{'valid': !$v.ticket.done.$invalid, 'invalid': $v.ticket.done.$invalid }" v-model="$v.ticket.done.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sopraSteriaApp.ticket.project')" for="ticket-project">Project</label>
                        <select class="form-control" id="ticket-project" name="project" v-model="ticket.project">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="ticket.project && projectOption.id === ticket.project.id ? ticket.project : projectOption" v-for="projectOption in projects" :key="projectOption.id">{{projectOption.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sopraSteriaApp.ticket.assignedTo')" for="ticket-assignedTo">Assigned To</label>
                        <select class="form-control" id="ticket-assignedTo" name="assignedTo" v-model="ticket.assignedTo">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="ticket.assignedTo && userOption.id === ticket.assignedTo.id ? ticket.assignedTo : userOption" v-for="userOption in users" :key="userOption.id">{{userOption.login}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label v-text="$t('sopraSteriaApp.ticket.label')" for="ticket-label">Label</label>
                        <select class="form-control" id="ticket-label" multiple name="label" v-model="ticket.labels">
                            <option v-bind:value="getSelected(ticket.labels, labelOption)" v-for="labelOption in labels" :key="labelOption.id">{{labelOption.label}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.ticket.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./ticket-update.component.ts">
</script>
