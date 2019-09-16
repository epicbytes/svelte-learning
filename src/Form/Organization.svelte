<script>
  import Spinner from "svelte-spinner";
  import { slide } from "svelte/transition";
  import { onDestroy } from "svelte";
  import * as yup from "yup";
  import omit from "lodash.omit";

  import FieldRow from "../UI/FieldRow.svelte";
  import TextField from "../UI/TextField.svelte";
  import Select from "../UI/Select.svelte";
  import RadioCheckbox from "../UI/RadioCheckbox.svelte";
  import Button from "../UI/Button.svelte";
  import SectionRow from "../UI/SectionRow.svelte";
  import Agree from "../UI/Agree.svelte";

  import { form, errors, validationSchema } from "../stores";
  import { REQUERIED_TEXT, EMAIL_TEXT, TOO_SMALL_TEXT } from "../constants";

  let promiseCountries;
  let sumbitState, onSubmit, onChange;

  onDestroy(() => {
    console.log("onDestroy");
  });

  const initialValues = {
    resident: "",
    orgName: "",
    orgNameEn: "",
    isAffiliate: false,
    orgMainName: "",
    inn: "",
    kpp: "",
    city: "",
    region: "",
    address: "",
    zip: "",
    isSamePostAddress: false,
    postCountry: "",
    postCity: "",
    postRegion: "",
    postAddress: "",
    postZip: "",
    email: "",
    secondEmail: "",
    phone: "",
    password: "",
    confirmPassword: "",
    hasAgree: false
  };

  $form = initialValues;

  $validationSchema = {
    resident: yup.string().required(REQUERIED_TEXT),
    orgName: yup
      .string()
      .min(2, TOO_SMALL_TEXT)
      .required(REQUERIED_TEXT),
    orgNameEn: yup
      .string()
      .min(2, TOO_SMALL_TEXT)
      .required(REQUERIED_TEXT),
    inn: yup
      .string()
      .length(10, "Должен содержать 10 цифр")
      .required(REQUERIED_TEXT),
    kpp: yup
      .string()
      .length(9, "Должен содержать 9 цифр")
      .required(REQUERIED_TEXT),
    city: yup
      .string()
      .min(2, TOO_SMALL_TEXT)
      .required(REQUERIED_TEXT),
    region: yup
      .string()
      .min(2, TOO_SMALL_TEXT)
      .required(REQUERIED_TEXT),
    address: yup
      .string()
      .min(2, TOO_SMALL_TEXT)
      .required(REQUERIED_TEXT),
    zip: yup
      .string()
      .length(6, "Должен содержать 6 цифр")
      .required(REQUERIED_TEXT),
    email: yup
      .string()
      .required(REQUERIED_TEXT)
      .email(EMAIL_TEXT),
    secondEmail: yup
      .string()
      .required(REQUERIED_TEXT)
      .email(EMAIL_TEXT),
    phone: yup
      .string()
      .min(11, "Некорректный номер телефона")
      .required(REQUERIED_TEXT),
    password: yup
      .string()
      .min(6, "Слишком короткий пароль, должен быть не менее 6 символов")
      .required(REQUERIED_TEXT),
    confirmPassword: yup
      .string()
      .required(REQUERIED_TEXT)
      .oneOf([yup.ref("password")], "Должен совпадать с паролем"),
    hasAgree: yup.bool().oneOf([true], "Необходимо согласие")
  };

  $: {
    if ($form.isAffiliate) {
      $validationSchema = {
        ...$validationSchema,
        orgMainName: yup
          .string()
          .min(2, TOO_SMALL_TEXT)
          .required(REQUERIED_TEXT)
      };
    } else {
      $validationSchema = omit($validationSchema, ["orgMainName"]);
    }
  }

  $: {
    if (!$form.isSamePostAddress) {
      $validationSchema = {
        ...$validationSchema,
        postCountry: yup
          .string()
          .min(2, TOO_SMALL_TEXT)
          .required(REQUERIED_TEXT),
        postCity: yup
          .string()
          .min(2, TOO_SMALL_TEXT)
          .required(REQUERIED_TEXT),
        postRegion: yup
          .string()
          .min(2, TOO_SMALL_TEXT)
          .required(REQUERIED_TEXT),

        postAddress: yup
          .string()
          .min(2, TOO_SMALL_TEXT)
          .required(REQUERIED_TEXT),
        postZip: yup
          .string()
          .length(6, "Должен содержать 6 цифр")
          .required(REQUERIED_TEXT)
      };
    } else {
      $validationSchema = omit($validationSchema, [
        "postCountry",
        "postCity",
        "postRegion",
        "postAddress",
        "postZip"
      ]);
    }
  }

  export { promiseCountries, onSubmit, onChange, sumbitState };
</script>

<svelte:options immutable />
<form on:submit|preventDefault={onSubmit}>
  <FieldRow>
    <Select
      name="resident"
      label="Резидент"
      isRequired
      items={promiseCountries}
      placeholder="Выберите страну"
      bind:value={$form.resident}
      on:change={onChange}
      error={$errors.resident}
      on:change={onChange} />

  </FieldRow>

  <FieldRow>
    <TextField
      label="Полное наименование организаций"
      name="orgName"
      bind:value={$form.orgName}
      isRequired
      placeholder={'ООО "Компания"'}
      error={$errors.orgName}
      on:change={onChange} />
  </FieldRow>

  <FieldRow>
    <TextField
      label="Полное наименование организаций на латинице"
      name="orgNameEn"
      bind:value={$form.orgNameEn}
      isRequired
      placeholder={'LTD "Company"'}
      error={$errors.orgNameEn}
      on:change={onChange} />
  </FieldRow>

  <FieldRow>
    <RadioCheckbox
      label="Является филиалом"
      isRequired
      bind:value={$form.isAffiliate} />
  </FieldRow>
  {#if $form.isAffiliate}
    <div transition:slide>
      <FieldRow>
        <TextField
          label="Название головной организации"
          name="orgMainName"
          bind:value={$form.orgMainName}
          isRequired
          placeholder={'ООО "Компания"'}
          error={$errors.orgMainName}
          on:change={onChange} />
      </FieldRow>
    </div>
  {/if}

  <FieldRow>
    <TextField
      variant="small"
      type="number"
      label="ИНН"
      name="inn"
      bind:value={$form.inn}
      placeholder="1234567890"
      isRequired
      error={$errors.inn}
      on:change={onChange} />
  </FieldRow>
  <FieldRow>
    <TextField
      variant="small"
      type="number"
      label="КПП"
      name="kpp"
      bind:value={$form.kpp}
      placeholder="123456789"
      isRequired
      error={$errors.kpp}
      on:change={onChange} />
  </FieldRow>
  <SectionRow>Юридический адрес организации</SectionRow>
  <FieldRow>
    <TextField
      label="Город"
      name="city"
      bind:value={$form.city}
      placeholder="Москва"
      isRequired
      error={$errors.city}
      on:change={onChange} />
  </FieldRow>
  <FieldRow>
    <TextField
      label="Область"
      type="text"
      name="region"
      bind:value={$form.region}
      placeholder="Московская область"
      isRequired
      error={$errors.region}
      on:change={onChange} />
  </FieldRow>
  <FieldRow>
    <TextField
      label="Улица, дом, офис"
      type="text"
      name="address"
      bind:value={$form.address}
      placeholder="ул. Искры, 31, корп 1, офис 709 В"
      isRequired
      error={$errors.address}
      on:change={onChange} />
  </FieldRow>

  <FieldRow>
    <TextField
      variant="small"
      type="number"
      label="Индекс"
      name="zip"
      bind:value={$form.zip}
      placeholder="123456"
      isRequired
      error={$errors.zip}
      on:change={onChange} />
  </FieldRow>
  <SectionRow>Почтовый адрес организации</SectionRow>
  <FieldRow>
    <RadioCheckbox
      label="Почтовый адрес совпадает с юридическим"
      isRequired
      bind:value={$form.isSamePostAddress} />
  </FieldRow>

  {#if !$form.isSamePostAddress}
    <div transition:slide>
      <FieldRow>
        <Select
          name="postCountry"
          label="Страна"
          isRequired
          items={promiseCountries}
          placeholder="Выберите страну"
          bind:value={$form.postCountry}
          error={$errors.postCountry}
          on:change={onChange} />

      </FieldRow>
      <FieldRow>
        <TextField
          label="Город"
          name="postCity"
          placeholder="Москва"
          bind:value={$form.postCity}
          isRequired
          error={$errors.postCity}
          on:change={onChange} />
      </FieldRow>
      <FieldRow>
        <TextField
          label="Область"
          name="postRegion"
          placeholder="Московская область"
          bind:value={$form.postRegion}
          isRequired
          error={$errors.postRegion}
          on:change={onChange} />
      </FieldRow>
      <FieldRow>
        <TextField
          label="Улица, дом, офис"
          name="postAddress"
          placeholder="ул. Искры, 31, корп 1, офис 709 В"
          bind:value={$form.postAddress}
          isRequired
          error={$errors.postAddress}
          on:change={onChange} />
      </FieldRow>
      <FieldRow>
        <TextField
          variant="small"
          type="number"
          label="Индекс"
          name="postZip"
          placeholder="123456"
          bind:value={$form.postZip}
          isRequired
          error={$errors.postZip}
          on:change={onChange} />
      </FieldRow>
    </div>
  {/if}
  <FieldRow>
    <TextField
      label="E-mail"
      name="email"
      placeholder="mail@domain.ru"
      bind:value={$form.email}
      isRequired
      error={$errors.email}
      on:change={onChange} />
  </FieldRow>
  <FieldRow>
    <TextField
      label="Дополнительный e-mail"
      name="secondEmail"
      placeholder="mail@domain.ru"
      bind:value={$form.secondEmail}
      isRequired
      error={$errors.secondEmail}
      on:change={onChange} />
  </FieldRow>
  <FieldRow>
    <TextField
      label="Телефон"
      type="tel"
      name="phone"
      placeholder="+7(999) 999-99-99"
      options={{ mask: '+7(000) 000-00-00' }}
      bind:value={$form.phone}
      isRequired
      error={$errors.phone}
      on:change={onChange} />
  </FieldRow>
  <FieldRow>
    <TextField
      type="password"
      label="Пароль"
      autocomplete="new-password"
      name="password"
      bind:value={$form.password}
      isRequired
      error={$errors.password}
      on:change={onChange} />
  </FieldRow>
  <FieldRow>
    <TextField
      type="password"
      label="Подтверждение пароля"
      autocomplete="new-password"
      name="confirmPassword"
      bind:value={$form.confirmPassword}
      isRequired
      error={$errors.confirmPassword}
      on:change={onChange} />
  </FieldRow>

  <FieldRow>
    <Agree
      name="hasAgree"
      bind:value={$form.hasAgree}
      isRequired
      on:change={onChange}
      error={$errors.hasAgree}>
      Я даю согласие на обработку персональных данных
      <a href="https://www.depohost.ru/doc/pl.pdf">Cсылка</a>
    </Agree>
  </FieldRow>
  <Button disabled={sumbitState === 'pending'}>Оформить заказ</Button>
</form>
