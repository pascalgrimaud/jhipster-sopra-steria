<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="sopraSteriaApp.project.home.createOrEditLabel" v-text="$t('sopraSteriaApp.project.home.createOrEditLabel')">Create or edit a Project</h2>
                <div>
                    <div class="form-group" v-if="project.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="project.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('sopraSteriaApp.project.name')" for="project-name">Name</label>
                        <input type="text" class="form-control" name="name" id="project-name"
                            :class="{'valid': !$v.project.name.$invalid, 'invalid': $v.project.name.$invalid }" v-model="$v.project.name.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.project.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./project-update.component.ts">
</script>
