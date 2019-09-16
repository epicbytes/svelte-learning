<script>
  import FieldLabel from "./FieldLabel.svelte";
  import omit from "lodash.omit";

  let value;
  let error;
  let isRequired = false;

  export { isRequired, value, error };
</script>

<style>
  label {
    display: flex;
    align-items: center;
    padding: 5px 0;
  }

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    margin-right: 7px;
  }

  .required {
    background: #fff;
    border: 1px solid #f00;
  }

  hint {
    display: block;
    color: #f00;
    font-size: 12px;
    height: 0;
  }
</style>

<div>
  <label>
    <input
      class:required={isRequired && !value}
      type="checkbox"
      {...omit($$props, ['isRequired', 'error'])}
      bind:value />
    <span>
      <slot />
    </span>
  </label>
  {#if error}
    <hint>{error}</hint>
  {/if}
</div>
