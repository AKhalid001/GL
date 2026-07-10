import React from "react";
import styles from "./AppLayout.module.css";
import Sidebar from "../sidebar/Sidebar";
import Header from "../Header/Header";

interface Props {
  children: React.ReactNode;
}

function AppLayout({ children }: Props) {
  return (
    <div className={styles.appContainer}>
      <Header />

      <div className={styles.bodyContainer}>
        <Sidebar />

        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
