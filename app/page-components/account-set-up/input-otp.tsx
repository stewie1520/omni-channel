import { forwardRef, useCallback, useEffect, useRef, useState } from "react";

export interface InputCellProps {
  mode: NonNullable<InputOTPProps["mode"]>;
  onChange: (value: string) => void;
  value?: string;
  onDelete: () => void;
}

// eslint-disable-next-line react/display-name
const InputCell = forwardRef((props: InputCellProps, ref: any) => {
  const [value, setValue] = useState(props.value || "");

  const { current: checkValidKeyPressed } = useRef<
    (key: string, mode: InputCellProps["mode"]) => boolean
  >((key, mode) => {
    if (key === "Backspace") {
      return true;
    }

    if (mode === "numeric" && !/[0-9]/.test(key)) {
      return false;
    }

    return !(mode === "alpha-numeric" && !/[0-9a-zA-Z]/.test(key));
  });

  return (
    <div className="h-[48px] w-[48px] rounded-md bg-[#f7f6fa] shadow-sm ring-0 focus-within:border-[2px] focus-within:border-blue-400">
      <input
        className="h-full w-full border-none bg-transparent text-center text-base font-bold text-slate-700 caret-blue-500 ring-0 focus:outline-none focus:ring-0"
        ref={ref}
        type="text"
        value={value}
        onKeyDown={(e) => {
          if (e.key === "Backspace") {
            props.onDelete();
          }
        }}
        onChange={(e) => {
          const value = [...(e.target.value.split("") || [])].pop() || "";

          if (value !== "" && !checkValidKeyPressed(value, props.mode)) {
            return;
          }

          setValue(value);
          props.onChange(value);
        }}
      />
    </div>
  );
});

export interface InputOTPProps {
  mode?: "numeric" | "alpha-numeric";
  style?: Record<string, unknown>;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const InputOTP = (props: InputOTPProps) => {
  const ref0 = useRef<any>(null);
  const ref1 = useRef<any>(null);
  const ref2 = useRef<any>(null);
  const ref3 = useRef<any>(null);
  const otpEntered = useRef<string[]>([]);

  const jumpToPrev = useCallback(
    (index: number) => {
      if (index === 0) return;
      const refs = [ref0, ref1, ref2, ref3];
      const ref = refs[index - 1];
      ref.current.focus();
    },
    [ref0, ref1, ref2, ref3]
  );

  const jumpToNext = useCallback(
    (index: number) => {
      if (index === 3) return;
      const refs = [ref0, ref1, ref2, ref3];
      const ref = refs[index + 1];
      ref.current.focus();
    },
    [ref0, ref1, ref2, ref3]
  );

  const onChange = (value: string, index: number) => {
    if (props.onChange) {
      otpEntered.current[index] = value;
      if (value !== "") {
        jumpToNext(index);
      }

      props.onChange(otpEntered.current.join(""));
    }
  };

  const onDelete = (index: number) => {
    if (otpEntered.current[index] === "") {
      jumpToPrev(index);
    }
  };

  // hook to automatically focus on the first OTP cell
  useEffect(() => {
    if (ref0.current) {
      ref0.current.focus();
    }
  }, [ref0]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "12px",

        ...(props.style || {}),
      }}
      className={props.className}
    >
      <InputCell
        mode={props.mode || "numeric"}
        ref={ref0}
        onChange={(value) => {
          onChange(value, 0);
        }}
        onDelete={() => onDelete(0)}
      />
      <InputCell
        mode={props.mode || "numeric"}
        ref={ref1}
        onChange={(value) => {
          onChange(value, 1);
        }}
        onDelete={() => onDelete(1)}
      />
      <InputCell
        mode={props.mode || "numeric"}
        ref={ref2}
        onChange={(value) => {
          onChange(value, 2);
        }}
        onDelete={() => onDelete(2)}
      />
      <InputCell
        mode={props.mode || "numeric"}
        ref={ref3}
        onChange={(value) => {
          onChange(value, 3);
        }}
        onDelete={() => onDelete(3)}
      />
    </div>
  );
};
