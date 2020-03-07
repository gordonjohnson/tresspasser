import React from "react";
import styles from "./Button.module.scss";

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { children, ...rest } = props;
  return (
    <button className={styles.button} {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 480 80"
        preserveAspectRatio="none"
      >
        <path
          d={`M5,40 l25,-35 h420 l25,35 -25,35 h-420z`}
          className="path"
          fill="none"
          stroke="#ffffff"
          strokeWidth={3}
          strokeLinejoin="round"
        />
      </svg>
      {props.children}
    </button>
  );
}
