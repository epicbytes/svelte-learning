<script>
  import FieldLabel from "./FieldLabel.svelte";

  let label;
  let value;
  let isRequired = false;

  export { label, isRequired, value };
</script>

<style>
  .radio {
    display: flex;
  }

  .radio > div {
    background: none;
    border: 0;
    outline: 0;
    margin-right: 10px;
    font-weight: 500;
    color: #787b7c;
    cursor: pointer;
  }

  .radio > div.active {
    color: #00adf7;
  }
</style>

<FieldLabel {isRequired}>{label}</FieldLabel>

<div class="radio">
  <div class:active={!value} on:click={() => (value = false)}>Нет</div>
  <div class:active={value} on:click={() => (value = true)}>Да</div>
</div>
