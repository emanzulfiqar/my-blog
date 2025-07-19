import React from "react";
import PropTypes from "prop-types";

export default function DeleteConfirmationModal({ show, onConfirm, onCancel, isDeleting }) {
  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: show ? "rgba(0,0,0,0.5)" : "transparent" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button type="button" className="close" onClick={onCancel}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this post?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

DeleteConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool.isRequired,
};
