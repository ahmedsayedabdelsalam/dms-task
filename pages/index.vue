<template>
  <div class="container mt-3">
    <div class="card">
      <div class="card-header justify-content-between d-flex align-items-center">
        <h2 class="text-muted">Users</h2>
        <div>
          <div class="text-center">
            <b-button variant="primary">
              Rejcted
              <b-badge variant="light">{{additional.rejected_count || 0}}</b-badge>
            </b-button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-6">
            <b-form
              @submit.prevent="uploadUsers"
              class="d-flex align-items-start justify-content-between mb-3"
            >
              <b-form-group
                :invalid-feedback="errors.first('users_file')"
                :state="!errors.has('users_file')"
              >
                <b-form-file
                  v-validate="'required'"
                  data-vv-as="Users File"
                  name="users_file"
                  v-model="form.users_file"
                  placeholder="Upload users xlsx"
                  drop-placeholder="Drop file here..."
                  accept=".xlsx"
                ></b-form-file>
              </b-form-group>
              <b-button
                type="submit"
                class="ml-3"
                variant="primary"
                :disabled="formLoading || errors.any()"
              >
                <b-spinner v-if="formLoading" small type="grow"></b-spinner>Upload
              </b-button>
            </b-form>
          </div>
        </div>

        <vue-good-table
          ref="my-table"
          :columns="columns"
          :rows="rows"
          mode="remote"
          :line-numbers="true"
          :pagination-options="paginationOptions"
          @on-page-change="onPageChange"
          @on-sort-change="onSortChange"
          @on-column-filter="onColumnFilter"
          @on-per-page-change="onPerPageChange"
          :totalRows="totalRecords"
          :isLoading.sync="isLoading"
          styleClass="table table-hover table-bordered vgt-table bordered "
        >
          <div slot="emptystate">No Data</div>
          <div slot="selected-row-actions"></div>
        </vue-good-table>
      </div>
    </div>
  </div>
</template>

<script>
import { vueGoodTable } from "../mixins/vueGoodTableMixin.js";
import { errorsMixin } from "../mixins/errorsMixin.js";
import { objectToFormData } from "object-to-formdata";

export default {
  head: {
    title: "DMS | Users",
  },
  mixins: [vueGoodTable(), errorsMixin],
  data() {
    return {
      form: {
        users_file: null,
      },
      formLoading: false,
      columns: [
        {
          label: "First Name",
          field: "first_name",
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "Search", // placeholder for filter input
            trigger: "enter", //only trigger on enter not on keyup
          },
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          label: "Second Name",
          field: "second_name",
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "Search", // placeholder for filter input
            trigger: "enter", //only trigger on enter not on keyup
          },
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          label: "Family Name",
          field: "family_name",
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "Search", // placeholder for filter input
            trigger: "enter", //only trigger on enter not on keyup
          },
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          label: "Uuid",
          field: "uuid",
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "Search", // placeholder for filter input
            trigger: "enter", //only trigger on enter not on keyup
          },
          tdClass: "text-center",
          thClass: "text-center",
        },
      ],
    };
  },
  methods: {
    uploadUsers() {
      this.$validator.validateAll().then((valid) => {
        if (!valid) {
          return;
        }

        this.formLoading = true;

        this.$axios
          .post("import/users", objectToFormData(this.form))
          .then((res) => {
            this.formLoading = false;
            this.$awn.success(res.data.message);
            this.withoutValidation(this.resetForm);
          })
          .catch((err) => {
            this.formLoading = false;
            this.addServerSideValidationErrors(err);
          });
      });
    },
    resetForm() {
      this.form.users_file = null;
    },
  },
  mounted() {
    this.loadItems("/users");
  },
};
</script>

<style>
</style>