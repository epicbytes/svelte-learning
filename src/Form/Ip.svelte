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

  const initialValues = {
    resident: "",
    fio: "",
    fioEn: "",
    inn: "",
    bornDate: "",
    passportNumber: "",
    passportOrg: "",
    passportDate: "",
    passportOrgCode: "",
    city: "",
    region: "",
    address: "",
    zip: "",
    isSamePostAddress: true,
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
    fio: yup
      .string()
      .min(2, TOO_SMALL_TEXT)
      .required(REQUERIED_TEXT),
    fioEn: yup
      .string()
      .min(2, TOO_SMALL_TEXT)
      .required(REQUERIED_TEXT),
    inn: yup
      .string()
      .length(12, "Должен содержать 12 цифр")
      .required(REQUERIED_TEXT),
    bornDate: yup
      .date()
      .max(new Date(), "Некорректная дата")
      .required(REQUERIED_TEXT),
    passportNumber: yup
      .string()
      .matches(
        /\d{4}\s\d{6}/,
        "Некорректный номер, должен быть формата 1234 123456"
      )
      .required(REQUERIED_TEXT),
    passportOrg: yup
      .string()
      .min(2, TOO_SMALL_TEXT)
      .required(REQUERIED_TEXT),
    passportDate: yup
      .date()
      .max(new Date(), "Некорректная дата")
      .required(REQUERIED_TEXT),
    passportNumber: yup
      .string()
      .matches(/\d{3}\-\d{3}/, "Некорректный код, должен быть формата 123-123")
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
      error={$errors.resident}
      on:change={onChange} />

  </FieldRow>

  <FieldRow>
    <TextField
      label="Фамилия, имя, отчество"
      name="fio"
      bind:value={$form.fio}
      isRequired
      placeholder="Иванов Иван Иванович"
      error={$errors.fio}
      on:change={onChange} />
  </FieldRow>

  <FieldRow>
    <TextField
      label="Фамилия, имя на латинице"
      name="fioEn"
      bind:value={$form.fioEn}
      isRequired
      placeholder="Ivan Ivanov"
      error={$errors.resident}
      on:change={onChange} />
  </FieldRow>
  <FieldRow>
    <TextField
      variant="small"
      type="number"
      label="ИНН"
      name="inn"
      bind:value={$form.inn}
      placeholder="123456789012"
      isRequired
      error={$errors.resident}
      on:change={onChange} />
  </FieldRow>

  <FieldRow>
    <TextField
      variant="small"
      label="Дата рождения"
      name="bornDate"
      bind:value={$form.bornDate}
      placeholder="12.12.2005"
      isRequired
      error={$errors.bornDate}
      on:change={onChange} />
  </FieldRow>

  <FieldRow>
    <TextField
      variant="small"
      type="tel"
      label="Серия и номер паспорта"
      name="passportNumber"
      bind:value={$form.passportNumber}
      placeholder="1234 123456"
      isRequired
      error={$errors.resident}
      on:change={onChange} />
  </FieldRow>

  <FieldRow>
    <TextField
      label="Кем выдан паспорт"
      name="passportOrg"
      bind:value={$form.passportOrg}
      isRequired
      error={$errors.passportOrg}
      on:change={onChange} />
  </FieldRow>

  <FieldRow>
    <TextField
      label="Дата выдачи"
      name="passportDate"
      bind:value={$form.passportDate}
      placeholder="12.03.2005"
      isRequired
      error={$errors.passportDate}
      on:change={onChange} />
  </FieldRow>

  <FieldRow>
    <TextField
      label="Код подразделения"
      name="passportOrgCode"
      bind:value={$form.passportOrgCode}
      placeholder="123-123"
      isRequired
      error={$errors.passportOrgCode}
      on:change={onChange} />
  </FieldRow>

  <SectionRow>Адрес регистрации</SectionRow>

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
      bind:value={$form.region}
      placeholder="ул. Искры, 31, корп 1, офис 709 В"
      isRequired
      error={$errors.region}
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
  <SectionRow>Почтовый адрес</SectionRow>
  <FieldRow>
    <RadioCheckbox
      label="Почтовый адрес совпадает с адресом регистрации"
      isRequired
      bind:value={$form.isSamePostAddress} />
  </FieldRow>

  {#if !$form.isSamePostAddress}
    <div transition:slide>
      <FieldRow>
        <Select
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
      error={$errors.hasAgree}
      on:change={onChange}>
      Я даю согласие на обработку персональных данных
      <a href="https://www.depohost.ru/doc/pl.pdf">Cсылка</a>
    </Agree>
  </FieldRow>

  <Button disabled={sumbitState === 'pending'}>Оформить заказ</Button>
</form>
