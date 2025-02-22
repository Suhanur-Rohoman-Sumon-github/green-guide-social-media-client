import React, { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface IFormConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

interface IProps extends IFormConfig {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
}

const GGForm = ({ children, onSubmit, defaultValues, resolver }: IProps) => {
  console.log(defaultValues);
  let formConfig: IFormConfig = {};

  if (!!defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (!!resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);
  const submitHandler = methods.handleSubmit;

  return (
    <FormProvider {...methods}>
      <form onSubmit={submitHandler(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default GGForm;
