<script>
import Banner from '@components/Banner/Banner.vue';
import { LabeledInput } from '@components/Form/LabeledInput';
import BusyButton from '../../node-driver/components/BusyButton.vue';
import { _CREATE, _EDIT, _VIEW } from '@shell/config/query-params';

const DEFAULT_ENDPOINT = 'https://ocpportal.int.tieto.com/v2/graphql/';

export default {
  components: {
    Banner,
    BusyButton,
    LabeledInput
  },

  props: {
    mode: {
      type:     String,
      required: true
    },

    value: {
      type:     Object,
      required: true
    }
  },

  data() {
    return {
      busy:     false,
      error:    '',
      insecure: this.value?.decodedData?.insecureSkipVerify ?? true
    };
  },

  watch: {
    insecure() {
      this.$emit('validationChanged', !!this.value?.decodedData?.token);
    }
  },

  computed: {
    isView() {
      return this.mode === _VIEW;
    },

    canAuthenticate() {
      return !!this.value?.decodedData?.token;
    }
  },

  created() {
    this.value.decodedData.endpoint = this.value?.decodedData?.endpoint || DEFAULT_ENDPOINT;
    this.value.decodedData.insecureSkipVerify = this.insecure;
    this.$emit('validationChanged', !!this.value?.decodedData?.token);
  },

  methods: {
    onTokenChange(value) {
      this.value.setData('token', value);
      this.$emit('validationChanged', !!value);
    },

    onEndpointChange(value) {
      this.value.setData('endpoint', value);
      this.$emit('validationChanged', !!this.value?.decodedData?.token);
    },

    onInsecureChange(event) {
      const nextValue = !!event?.target?.checked;

      this.insecure = nextValue;
      this.value.setData('insecureSkipVerify', nextValue);
      this.$emit('validationChanged', !!this.value?.decodedData?.token);
    },

    async test(cb) {
      this.$set(this, 'error', '');
      this.$set(this, 'busy', true);

      if (!this.canAuthenticate) {
        this.$set(this, 'busy', false);
        this.$emit('validationChanged', false);

        if (cb) {
          cb(false);
        }

        return false;
      }

      // TODO: Implement API test once OCP API helper is available.
      this.$set(this, 'busy', false);
      this.$emit('validationChanged', true);

      if (cb) {
        cb(true);
      }

      return true;
    }
  }
};
</script>

<template>
  <div>
    <div class="row">
      <div class="col span-6">
        <LabeledInput
          :value="value.decodedData.endpoint"
          :disabled="isView"
          label="Endpoint"
          placeholder="https://ocpportal.int.tieto.com/v2/graphql/"
          type="text"
          :mode="mode"
          @input="onEndpointChange"
        />
      </div>
      <div class="col span-6">
        <LabeledInput
          :value="value.decodedData.token"
          :disabled="isView"
          label="Token"
          placeholder="Paste OCP token"
          type="password"
          :mode="mode"
          @input="onTokenChange"
        />
      </div>
    </div>

    <div class="row mt-20">
      <div class="col span-6">
        <label class="checkbox">
          <input
            type="checkbox"
            :disabled="isView"
            :checked="insecure"
            @change="onInsecureChange"
          />
          <span>Skip TLS verification</span>
        </label>
      </div>
    </div>

    <BusyButton
      label="Test connection"
      :disabled="isView || !canAuthenticate"
      class="mt-20"
      @click="test"
    />

    <Banner
      v-if="error"
      class="mt-20"
      color="error"
    >
      {{ error }}
    </Banner>
  </div>
</template>

<style lang="scss" scoped>
  .checkbox {
    display: flex;
    gap: 8px;
    align-items: center;
  }
</style>
