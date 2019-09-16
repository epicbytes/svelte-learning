<style>
  button {
    background: #fff;
    border: 1px solid transparent;
    border-bottom: 2px solid #dedede;
    box-shadow: 0 2px 0 rgba(35, 31, 32, 0.25);
    font-size: 16px;
    font-weight: 700;
    text-decoration: none;
    text-transform: uppercase;
    color: #00adf7;
    border-radius: 4px;
    padding: 9px 27px 8px;
  }

  button:hover {
    background: #00adf7;
    border-bottom-color: #008cd6;
    color: #fff;
  }
</style>

<button {...$$props}>
  <slot />
</button>
