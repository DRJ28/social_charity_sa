import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useSelector } from "react-redux";

export default function ToastComponent() {
  const { toastNotification } = useSelector(({ app }) => app);
  // const app = useSelector(({ app }) => app);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="bg-dark position-relative"
      style={{ minHeight: "240px" }}
    >
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
        {toastNotification.map(toast => {
          <Toast show>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Citi Charity</strong>
              {/* <small className="text-muted">2 seconds ago</small> */}
            </Toast.Header>
            <Toast.Body>toast</Toast.Body>
          </Toast>;
        })}
      </ToastContainer>
    </div>
  );
}
