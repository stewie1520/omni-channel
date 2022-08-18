import type * as yup from "yup";
import _isEmpty from "lodash/isEmpty";
import { yupResolver } from "@hookform/resolvers/yup";

export class YupAsyncValidationResolverBuilder {
  private asyncValidationSchema?: Record<
    string,
    (value: any) => Promise<string | null | undefined>
  >;

  withAsyncValidation(
    schema: Record<string, (value: any) => Promise<string | null | undefined>>
  ) {
    this.asyncValidationSchema = schema;
    return this;
  }

  constructor(private yupSchema: yup.AnyObjectSchema) {}

  build() {
    let lastValiateData: any;

    return async (data: any) => {
      let asyncValidationResults: {
        key: string;
        values?: Record<string, any>;
        errors?: Record<string, { type: string; message: string }> | {};
      }[] = [];

      if (this.asyncValidationSchema) {
        try {
          asyncValidationResults = await Promise.all(
            Object.keys(this.asyncValidationSchema).map(async (key) => {
              const validator = this.asyncValidationSchema?.[key];
              if (!validator)
                return {
                  key,
                  values: { [key]: data[key] },
                  errors: {},
                };

              const result = await validator(data[key]);
              if (!result) {
                return { key, values: { [key]: data[key] }, errors: {} };
              }

              return {
                key,
                values: {},
                errors: { type: "async.validation", message: result },
              };
            })
          );
        } catch (err: unknown) {}
      }

      let syncValidationResults: any = { errors: {}, values: {} };

      try {
        const values = await this.yupSchema.validate(data, {
          abortEarly: false,
        });

        syncValidationResults = {
          values,
          errors: {},
        };
      } catch (err: unknown) {
        const errors = err as yup.ValidationError;
        syncValidationResults = {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path!]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }

      const results = {
        values: asyncValidationResults.reduce(
          (allValues, currentResult) => ({
            ...allValues,
            [currentResult.key]: currentResult.values?.[currentResult.key],
          }),
          syncValidationResults.values
        ),
        errors: asyncValidationResults.reduce((allErrors, currentResult) => {
          if (_isEmpty(currentResult.errors)) return allErrors;
          return {
            ...allErrors,
            [currentResult.key]: currentResult.errors,
          };
        }, syncValidationResults.errors),
      };

      return results;
    };
  }
}
