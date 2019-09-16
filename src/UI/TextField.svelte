<script>
  import omit from "lodash.omit";

  import FieldLabel from "./FieldLabel.svelte";
  import mask from "../actions/mask.js";

  let value = "";
  let error;
  let hasError = false;
  let {
    label,
    options,
    isRequired = false,
    variant,
    type = "text",
    ...other
  } = $$props;

  export { value, error };
</script>

<style>
  input[type="text"],
  input[type="password"],
  input[type="tel"],
  input[type="email"],
  input[type="number"] {
    width: 100%;
    background: #fff;
    border: 1px solid #c1c5c8;
    border-radius: 2px;
    color: #000;
    box-shadow: inset 2px 2px 2px -1px rgba(180, 188, 191, 0.5);
    display: inline-block;
    outline: none;
    vertical-align: middle;
    font-size: 14px;
    padding: 6px 8px;
    margin-bottom: 3px;
    height: 44px;
  }

  div {
    width: 60%;
  }

  @media (min-width: 768px) {
    .smallVariant {
      width: 30%;
    }
  }

  hint {
    display: block;
    font-size: 12px;
    color: #f00;
    height: 0;
  }

  .error {
    border: 1px solid #f00 !important;
  }
</style>

<FieldLabel {isRequired}>{label}</FieldLabel>
<div class:smallVariant={variant === 'small'}>
  <input
    use:mask={options}
    class:error
    {...omit(other, ['error'])}
    {type}
    on:input={e => (value = e.target.value)}
    on:change={e => (value = e.target.value)}
    on:input
    on:change
    on:search
    on:focus
    on:blur
    on:invalid
    on:accept
    on:complete />
  {#if !!error}
    <hint>{error}</hint>
  {/if}
</div>
