import React from "react";

const NotificationToast = ({ message, type = "success", onClose }) => {
    if (!message) return null;

    return (
        <div
            className="position-fixed bottom-0 end-0 p-3"
            style={{ zIndex: 1055 }}
        >
            <div
                className={`toast show align-items-center text-white bg-${type} border-0 shadow-lg`}
                role="alert"
            >
                <div className="d-flex">
                    <div className="toast-body">{message}</div>
                    <button
                        type="button"
                        className="btn-close btn-close-white me-2 m-auto"
                        onClick={onClose}
                    ></button>
                </div>
            </div>
        </div>
    );
};

export default NotificationToast;