export const errorsMixin = {
  methods: {
    withoutValidation(cb) {
      /**
       * the following code related to vee validate
       * is to fix the issue results from resetting validation input for field that is not already exists
       * because some forms has some conditionally mounted fields so vee validate get confused and throws
       * console error
       * cb => callback (the function that needs to be run without firing validations)
       */
      this.$validator.pause();
      cb();
      this.$nextTick(() => {
        this.$validator.reset();
        this.$validator.resume();
      });
    },
    resetValidationErrors() {
      this.errors.clear();
    },
    errorBags(errors, scope = null) {
      if (Object.keys(errors).length > 0) {
        for (let error in errors) {
          this.addErrors(error, errors[error][0], scope);
        }
      }
    },
    addErrors(key, error, scope = null) {
      this.$validator.errors.add({
        field: key,
        msg: error,
        scope: scope
      });
    },
    addServerSideValidationErrors(error, scope = null) {
      if (error.response.status == 422) {
        this.errorBags(error.response.data.errors, scope);
      } else if (error.response.status == 403) {
        if (error.response.data && error.response.data.message) {
          this.$awn.alert(error.response.data.message,
            {
              labels: {
                success: this.trans("supplier.alert") || "Alert",
              },
            });
        }
      }
    }
  }
};
