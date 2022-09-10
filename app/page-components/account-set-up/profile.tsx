import IconCamera from "@ant-design/icons/CameraFilled";
import IconLoading from "@ant-design/icons/LoadingOutlined";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useMemo } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "~/components/buttons/button";
import { DatePicker } from "~/components/inputs/date-picker";
import { InputSelect } from "~/components/inputs/input-select";
import notify from "~/libs/notify";
import { Select } from "../../components/inputs/select";
import {
  backToStepRole,
  changeProfile,
  setLoading,
  toStepVerification,
} from "./context/action-creator";
import type { SetupState } from "./context/set-up.context";
import { useSetupContext } from "./hooks/use-setup.hook";

const genderOptions: Readonly<{ value: SetupState["gender"]; name: string }[]> =
  [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" },
    { name: "Other", value: "other" },
  ];

const validationSchema = yup.object().shape({
  birthDay: yup.date().required().max(new Date()),
  gender: yup.string().oneOf(["male", "female", "other"]),
  selectedCountry: yup.string().required(),
  phone: yup.string().required(),
});

export const SetUpProfile = (props: any) => {
  const { dispatch, state } = useSetupContext();
  const today = new Date();
  const countryOptions = useMemo<{ value: string; name: string }[]>(() => {
    return state.countries.map((country) => ({
      name: `${country.flagCode} ${country.name} (${country.timezone})`,
      value: country.code,
    }));
  }, [state.countries]);

  const countryCodeOptions = useMemo<{ value: string; name: string }[]>(() => {
    return state.countries.map((country) => ({
      name: `${country.flagCode} (${country.phoneCode})`,
      value: country.code,
      short: country.flagCode,
    }));
  }, [state.countries]);

  const { control, register, setValue, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: {
      birthDay: state.birthDay,
      gender: state.gender,
      selectedCountry: state.selectedCountry,
      phone: state.phone,
      bio: state.bio,
    },
  });

  const onCloseStep = useCallback(() => {
    backToStepRole(dispatch);
  }, [dispatch]);

  const onChangeCountry = useCallback(
    (country: string) => {
      setValue("selectedCountry", country);
      changeProfile(dispatch, { selectedCountry: country });
    },
    [dispatch, setValue]
  );

  const onChangeGender = useCallback(
    (gender: SetupState["gender"]) => {
      setValue("gender", gender);
      changeProfile(dispatch, { gender });
    },
    [dispatch, setValue]
  );

  const onChangeBirthday = useCallback(
    (birthDay: Date) => {
      setValue("birthDay", birthDay);
      changeProfile(dispatch, { birthDay });
    },
    [dispatch, setValue]
  );

  const onChangePhone = useCallback(
    (phone: string) => {
      setValue("phone", phone);
      changeProfile(dispatch, { phone });
    },
    [dispatch, setValue]
  );

  const onChangeBio = useCallback(
    (e: any) => {
      const bio = e.target.value as unknown as string;
      setValue("bio", bio);
      changeProfile(dispatch, { bio });
    },
    [dispatch, setValue]
  );

  const onSubmit: SubmitHandler<{
    birthDay: Date;
    gender: "other" | "female" | "male";
    selectedCountry: string;
    phone: string;
    bio: string | null;
  }> = async (data) => {
    try {
      setLoading(dispatch, true);
      const result = await fetch("/api/account/send-mail-otp", {
        method: "post",
      });

      const data = await result.json();

      if (!result.ok) {
        throw new Error(data.message);
      }

      const { otpId, expiredAt, provider } = data as {
        otpId: string;
        expiredAt: Date;
        provider: string;
      };

      toStepVerification(dispatch, otpId, new Date(expiredAt), provider);
    } catch (err: any) {
      notify.error(err.message);
      console.log("err", err);
    } finally {
      setLoading(dispatch, false);
    }
  };

  return (
    <>
      <div className="flex flex-col rounded-xl border bg-white px-8 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-slate-700/[.7]">
        <div className="flex w-full items-center">
          <div className="flex w-full flex-col pt-5 lg:w-full">
            <div className="group block flex-shrink-0 flex-row">
              <div className="flex items-end">
                <div className="relative">
                  <img
                    draggable="false"
                    className="inline-block h-[154px] w-[154px] flex-shrink-0 rounded-full ring-4 ring-blue-400 ring-offset-4"
                    src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                    alt="User Avatar"
                  />
                  <button className="absolute -right-1 bottom-6 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-blue-500 p-1 transition-all hover:bg-blue-600">
                    <IconCamera className="text-white" />
                  </button>
                </div>
                <div className="ml-5 mb-5">
                  <h3 className="text-3xl font-semibold text-slate-800 dark:text-white">
                    {state.firstName + " " + state.lastName}
                  </h3>
                  <p className="text-sm font-medium text-gray-400">
                    {state.email}
                  </p>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <Controller
                  name="birthDay"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Birthday"
                      onChange={onChangeBirthday}
                      max={today}
                    />
                  )}
                />
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label={"Gender"}
                      onChange={onChangeGender}
                      options={genderOptions}
                    />
                  )}
                />
              </div>

              <div className="mt-5 flex w-full gap-2">
                <Controller
                  name="selectedCountry"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label={"Country - Region"}
                      options={countryOptions}
                      onChange={onChangeCountry}
                    />
                  )}
                />

                <InputSelect
                  {...register("phone")}
                  label={"Phone"}
                  options={countryCodeOptions}
                  onChange={onChangePhone}
                />
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="with-corner-hint"
                    className="mb-2 block text-sm font-medium text-gray-600 dark:text-white"
                  >
                    Bio
                  </label>
                  <span className="mb-2 block text-xs text-gray-500">
                    Optional
                  </span>
                </div>
                <Controller
                  name="bio"
                  control={control}
                  render={({ field: { value, ...field } }) => (
                    <textarea
                      {...field}
                      onChange={onChangeBio}
                      className="block w-full rounded-md border-gray-200 py-3 px-4 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                      rows={3}
                      placeholder="I love sharing 🔥..."
                    />
                  )}
                />
              </div>

              <div className="mt-5 flex w-full">
                <Button
                  type="submit"
                  variant="gradient-primary"
                  disabled={state.loading}
                >
                  {state.loading && <IconLoading />} Next
                </Button>
                <Button variant="tertiary" onClick={onCloseStep}>
                  Close
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
