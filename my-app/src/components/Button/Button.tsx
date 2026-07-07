import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
}

function Button({ children, onClick, type = "button" }: ButtonProps) {
  return (
    <div>
      <button className={styles.button} type={type} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export default Button;
