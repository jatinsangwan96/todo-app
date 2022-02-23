import React from "react";
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";
import PageTitle from "./components/PageTitle";
import { Toaster } from "react-hot-toast";
import styles from "./styles/modules/app.module.scss";

const App = () => {
  return (
    <>
      <div className={styles.container}>
        <PageTitle>Todo List</PageTitle>
        <div className={styles.app__wrapper}>
          <AppHeader />
          <AppContent />
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: "1.4rem",
          },
        }}
      />
    </>
  );
};

export default App;
