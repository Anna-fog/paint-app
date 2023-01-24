<script setup>
import { ref } from "vue";

const emits = defineEmits(['save'])

const format = ref('jpg')
const name = ref('')

const saveDetails = () => {
  emits('save', format.value, name.value)
}

</script>

<template>
  <div class="modal fade" id="detailsModal" tabindex="-1" aria-labelledby="detailsModal" aria-hidden="true">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="detailsModalLabel">Format and Name</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveDetails">
            <div class="form-check">
              <input v-model="format" class="form-check-input" type="radio" name="flexRadioDefault" value="jpg" id="jpg" checked>
              <label class="form-check-label" for="jpg">
                JPG
              </label>
            </div>
            <div class="form-check">
              <input v-model="format" class="form-check-input" type="radio" name="flexRadioDefault" value="png" id="png">
              <label class="form-check-label" for="png">
                PNG
              </label>
            </div>

            <div class="input-group mb-3 mt-3">
              <input v-model="name" type="text" class="form-control" placeholder="drawing" aria-label="name" aria-describedby="name">
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save as {{ format.toUpperCase() }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>