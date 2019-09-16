<script>
  import FieldLabel from "./FieldLabel.svelte";
  import Spinner from "svelte-spinner";
  import omit from "lodash.omit";

  /**@param value number|string */
  let value = "";
  let name;

  /**@param items [{name: string, id: number|string}] */
  let items = [];

  let label;
  let placeholder;
  let error;
  let isRequired = false;

  const props = omit($$props, [
    "value",
    "name",
    "items",
    "label",
    "placeholder",
    "isRequired"
  ]);

  export { value, label, placeholder, isRequired, items, name, error };
</script>

<style>
  select {
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

  hint {
    display: block;
    font-size: 12px;
    color: #f00;
    height: 14px;
    margin-bottom: -14px;
  }

  .error {
    border: 1px solid #f00;
  }
</style>

<FieldLabel {isRequired}>{label}</FieldLabel>
<div>
  {#if items instanceof Promise}
    {#await items}
      <div>
        <Spinner size="44" speed="750" color="#A82124" thickness="2" gap="40" />
      </div>
    {:then items}
      <select class:error {name} {...props} bind:value on:change on:blur>
        {#if placeholder}
          <option value="">{placeholder}</option>
        {/if}
        {#each items as { id, name } (id)}
          <option value={id}>{name}</option>
        {/each}
      </select>
    {:catch error}
      <div class="error">
        Произошла ошибка получения списка стран. Попробуйте позднее
      </div>
    {/await}
  {:else}
    <select class:error {name} {...props} bind:value on:change on:blur>
      {#if placeholder}
        <option value="">{placeholder}</option>
      {/if}
      {#each items as { id, name } (id)}
        <option value={id}>{name}</option>
      {/each}
    </select>
  {/if}
  {#if !!error}
    <hint>{error}</hint>
  {/if}
</div>
