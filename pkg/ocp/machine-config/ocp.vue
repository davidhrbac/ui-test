<script>
import { Banner } from '@components/Banner';
import Loading from '@shell/components/Loading';
import CreateEditView from '@shell/mixins/create-edit-view';
import { LabeledInput } from '@components/Form/LabeledInput';
import { _VIEW } from '@shell/config/query-params';

export default {
  components: {
    Banner,
    Loading,
    LabeledInput
  },

  mixins: [CreateEditView],

  props: {
    uuid: {
      type:     String,
      required: true
    },

    cluster: {
      type:    Object,
      default: () => ({})
    },

    credentialId: {
      type:     String,
      required: true
    },

    disabled: {
      type:    Boolean,
      default: false
    },

    busy: {
      type:    Boolean,
      default: false
    },

    provider: {
      type:     String,
      required: true
    }
  },

  data() {
    return {
      errors: [],
      region: this.value?.region || 'FINLAND',
      customerId: this.value?.customerId || '',
      projectId: this.value?.projectId || '',
      templateId: this.value?.templateId || '',
      tierId: this.value?.tierId || '',
      networkId: this.value?.networkId || '',
      domainId: this.value?.domainId || '',
      hostname: this.value?.hostname || '',
      dataProtectionPolicy: this.value?.dataProtectionPolicy || '',
      cpuCount: this.value?.cpuCount || 1,
      coresPerSocket: this.value?.coresPerSocket || 1,
      memorySizeGb: this.value?.memorySizeGb || 16,
      allowResizeRestart: this.value?.allowResizeRestart || false
    };
  },

  computed: {
    isView() {
      return this.mode === _VIEW;
    }
  },

  watch: {
    region: 'emitValid',
    customerId: 'emitValid',
    projectId: 'emitValid',
    templateId: 'emitValid',
    tierId: 'emitValid',
    networkId: 'emitValid',
    domainId: 'emitValid',
    hostname: 'emitValid',
    dataProtectionPolicy: 'emitValid',
    cpuCount: 'emitValid',
    coresPerSocket: 'emitValid',
    memorySizeGb: 'emitValid',
    allowResizeRestart: 'emitValid'
  },

  created() {
    this.$emit('validationChanged', true);
  },

  methods: {
    emitValid() {
      this.$emit('validationChanged', true);
    },

    syncValue() {
      this.value.region = this.region;
      this.value.customerId = this.customerId;
      this.value.projectId = this.projectId;
      this.value.templateId = this.templateId;
      this.value.tierId = this.tierId;
      this.value.networkId = this.networkId;
      this.value.domainId = this.domainId;
      this.value.hostname = this.hostname;
      this.value.dataProtectionPolicy = this.dataProtectionPolicy;
      this.value.cpuCount = Number(this.cpuCount);
      this.value.coresPerSocket = Number(this.coresPerSocket);
      this.value.memorySizeGb = Number(this.memorySizeGb);
      this.value.allowResizeRestart = !!this.allowResizeRestart;
    },

    test() {
      this.syncValue();
    }
  }
};
</script>

<template>
  <div>
    <Loading
      v-if="$fetchState?.pending"
      :delayed="true"
    />

    <div v-if="errors.length">
      <div
        v-for="(err, idx) in errors"
        :key="idx"
      >
        <Banner
          color="error"
          :label="err"
        />
      </div>
    </div>

    <div class="row mt-10">
      <div class="col span-6">
        <LabeledInput
          v-model="region"
          label="Region"
          :disabled="isView || disabled"
        />
      </div>
      <div class="col span-6">
        <LabeledInput
          v-model="hostname"
          label="Hostname"
          :disabled="isView || disabled"
        />
      </div>
    </div>

    <div class="row mt-10">
      <div class="col span-6">
        <LabeledInput
          v-model="customerId"
          label="Customer ID"
          :disabled="isView || disabled"
        />
      </div>
      <div class="col span-6">
        <LabeledInput
          v-model="projectId"
          label="Project ID"
          :disabled="isView || disabled"
        />
      </div>
    </div>

    <div class="row mt-10">
      <div class="col span-6">
        <LabeledInput
          v-model="templateId"
          label="Template ID"
          :disabled="isView || disabled"
        />
      </div>
      <div class="col span-6">
        <LabeledInput
          v-model="tierId"
          label="Tier ID"
          :disabled="isView || disabled"
        />
      </div>
    </div>

    <div class="row mt-10">
      <div class="col span-6">
        <LabeledInput
          v-model="networkId"
          label="Network ID"
          :disabled="isView || disabled"
        />
      </div>
      <div class="col span-6">
        <LabeledInput
          v-model="domainId"
          label="Domain ID"
          :disabled="isView || disabled"
        />
      </div>
    </div>

    <div class="row mt-10">
      <div class="col span-6">
        <LabeledInput
          v-model="dataProtectionPolicy"
          label="Data Protection Policy ID"
          :disabled="isView || disabled"
        />
      </div>
      <div class="col span-6">
        <LabeledInput
          v-model="allowResizeRestart"
          label="Allow Resize Restart"
          :disabled="true"
        />
      </div>
    </div>

    <div class="row mt-10">
      <div class="col span-4">
        <LabeledInput
          v-model="cpuCount"
          label="CPU Count"
          type="number"
          :disabled="isView || disabled"
        />
      </div>
      <div class="col span-4">
        <LabeledInput
          v-model="coresPerSocket"
          label="Cores per Socket"
          type="number"
          :disabled="isView || disabled"
        />
      </div>
      <div class="col span-4">
        <LabeledInput
          v-model="memorySizeGb"
          label="Memory (GB)"
          type="number"
          :disabled="isView || disabled"
        />
      </div>
    </div>
  </div>
</template>
