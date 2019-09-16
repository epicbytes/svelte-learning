<script>
  let isRequired = false;

  export { isRequired };
</script>

<style>
  label {
    width: 100%;
    font-weight: 400;
  }

  label .star {
    color: rgba(199, 31, 31, 1);
    font-weight: 700;
  }

  @media (min-width: 768px) {
    label {
      width: 40%;
      padding-right: 10px;
    }

    label
      ~ :global(input[type="text"], input[type="password"], input[type="tel"], input[type="email"], input[type="number"], select) {
      width: 60%;
    }
  }
</style>

<label>
  <slot />
  {#if isRequired}
    <span class="star">*</span>
  {/if}
</label>
