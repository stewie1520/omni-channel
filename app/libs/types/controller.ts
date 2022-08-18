export type ControllerFunction<TIn extends any, TOut extends any> = {
  (requestPayload: TIn): Promise<TOut> | void;
  validate: (t: any) => Promise<{
    value?: TIn;
    error?: { [key in keyof TIn]?: string };
  }>;
};
