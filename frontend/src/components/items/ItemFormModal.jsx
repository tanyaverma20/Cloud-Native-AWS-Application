import { useState, useEffect, useRef } from "react";
import { CloseIcon, PlusIcon } from "../icons";

function ItemFormModal({ isOpen, onClose, onSubmit, submitting }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !submitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, submitting, onClose]);

  if (!isOpen) return null;

  const handleClose = () => {
    setName("");
    setError("");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      setError("Item name is required.");
      return;
    }
    if (trimmed.length < 2) {
      setError("Item name must be at least 2 characters.");
      return;
    }
    if (trimmed.length > 100) {
      setError("Item name cannot exceed 100 characters.");
      return;
    }

    setError("");
    onSubmit({ name: trimmed });
    setName("");
  };

  return (
    <div className="modal-backdrop" onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">Create New Item</h2>
          <button
            className="modal-close-btn"
            onClick={handleClose}
            disabled={submitting}
            aria-label="Close modal"
          >
            <CloseIcon size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="item-name-input" className="form-label">
                Item Name <span style={{ color: "var(--danger-text)" }}>*</span>
              </label>
              <input
                id="item-name-input"
                ref={inputRef}
                type="text"
                className="form-input"
                placeholder="e.g. Production Cluster Config, App Metric..."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError("");
                }}
                disabled={submitting}
                maxLength={100}
                required
              />
              <div className="form-hint">
                <span>Must be between 2 and 100 characters</span>
                <span>{name.length}/100</span>
              </div>
              {error && <span className="form-error-text">{error}</span>}
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting || !name.trim()}
            >
              {submitting ? (
                <>
                  <span className="spinner" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <PlusIcon size={14} />
                  <span>Create Item</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ItemFormModal;
