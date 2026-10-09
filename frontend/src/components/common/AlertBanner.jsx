import { CheckCircleIcon, AlertCircleIcon, CloseIcon } from "../icons";

function AlertBanner({ type = "success", message, onClose }) {
  if (!message) return null;

  const isSuccess = type === "success";

  return (
    <div
      className={`alert-banner ${isSuccess ? "success" : "error"}`}
      role="alert"
    >
      <div className="alert-icon">
        {isSuccess ? <CheckCircleIcon size={16} /> : <AlertCircleIcon size={16} />}
      </div>
      <div className="alert-content">
        <span>{message}</span>
      </div>
      {onClose && (
        <button
          className="alert-close"
          onClick={onClose}
          aria-label="Dismiss message"
        >
          <CloseIcon size={14} />
        </button>
      )}
    </div>
  );
}

export default AlertBanner;
