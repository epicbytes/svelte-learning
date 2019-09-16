<style>
  .field-row {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
  }

  @media (min-width: 768px) {
    .field-row {
      flex-direction: row;
    }
  }
</style>

<div class="field-row" {...$$props}>
  <slot />
</div>
