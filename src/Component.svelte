<script>
  import "core-js/es6/promise";
  import "core-js/es6/set";
  import "core-js/es6/map";

  import * as yup from "yup";

  import OrganizationForm from "./Form/Organization.svelte";
  import IpForm from "./Form/Ip.svelte";
  import PrivatePersonForm from "./Form/PrivatePerson.svelte";

  import { form, errors, validationSchema } from "./stores";
  import { scrollToError } from "./utils";

  const personTypes = [
    { id: 2, slug: "org", name: "Юридическое лицо" },
    { id: 3, slug: "ip", name: "Индивидуальный предприниматель" },
    { id: 1, slug: "private", name: "Физическое лицо" }
  ];
  let currentPersonType = personTypes[0].slug;

  let promiseCountries = getCountries();
  let sumbitState;

  $: schema = yup.object().shape($validationSchema);

  async function getCountries() {
    const res = await fetch(
      "http://depo.terentev.me/api/domain/registration/getCountries/"
    );
    const json = await res.json();

    if (res.ok) {
      return json;
    } else {
      throw new Error(json.error);
    }
  }

  function parseErrors(errors) {
    return errors.reduce(
      (res, { path, message }) => ({ ...res, [path]: message }),
      {}
    );
  }

  async function onSubmit() {
    sumbitState = "pending";
    try {
      await schema.validate($form, { abortEarly: false });
      fetch("http://depo.terentev.me/api/domain/registration/submit/", {
        method: "POST",
        body: JSON.stringify($form)
      })
        .then(res => {
          const { status } = res;
          if (status === 201) {
            sumbitState = "fulfilled";
          } else if (status >= 400) {
            throw new Error(res);
          }
          return res;
        })
        .catch(() => (sumbitState = "rejected"));
    } catch (error) {
      if (error.name === "ValidationError") {
        sumbitState = undefined;
        $errors = parseErrors(error.inner);
        scrollToError($errors);
      }
    }
  }

  async function onChange(e) {
    const { name, value } = e.target;
    schema.validate($form, { abortEarly: false }).catch(error => {
      if (error.name === "ValidationError") {
        const err = parseErrors(error.inner);
        $errors = { ...$errors, [name]: err[name] };
      }
    });
  }

  const formProps = {
    promiseCountries,
    onSubmit,
    onChange,
    sumbitState
  };
</script>

<style>
  ul {
    display: flex;
    justify-content: space-between;
    list-style: none;
    border-bottom: 1px solid #dce5e9;
    padding: 0;
    margin: 0;
  }

  ul li button {
    border: 0;
    display: block;
    width: 100%;
    height: 100%;
    padding: 5px 15px;
    outline: 0;
    font-size: 18px;
    color: #787b7c;
    background: linear-gradient(
      to bottom,
      rgba(241, 247, 250, 1) 0%,
      rgba(232, 240, 244, 1) 100%
    );
  }

  ul li {
    flex-grow: 1;
    height: 70px;
    background-color: #fff;
    border-right: 1px solid #ddd;
  }

  ul li:last-of-type {
    border-right: 0;
  }

  ul li:first-of-type {
    border-left: 0;
  }

  ul li.active button {
    color: #000;
    background: #fff;
  }

  ul li button:hover,
  ul li button:focus {
    background: #eee;
  }

  .wrapper {
    margin: 20px 0;
  }

  .server-error {
    padding: 20px 0;
    color: #f00;
  }
</style>

<svelte:options immutable />
<ul>
  {#each personTypes as { slug, name, id } (id)}
    <li
      class:active={slug === currentPersonType}
      on:click={() => (currentPersonType = slug)}>
      <button>{name}</button>
    </li>
  {/each}
</ul>
<div class="wrapper">
  {#if currentPersonType === 'org'}
    <OrganizationForm {...formProps} />
  {/if}
  {#if currentPersonType === 'ip'}
    <IpForm {...formProps} />
  {/if}
  {#if currentPersonType === 'private'}
    <PrivatePersonForm {...formProps} />
  {/if}
  {#if sumbitState === 'rejected'}
    <div class="server-error">Произошла ошибка. Попробуйте позже.</div>
  {/if}

</div>
