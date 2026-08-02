import "../styles/ConfirmModal.css";


function ConfirmModal({
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) {


  return (

    <div className="modal-overlay">


      <div className="confirm-modal">


        <h2>
          {title}
        </h2>



        <p>
          {message}
        </p>




        <div className="modal-actions">


          <button
            className="cancel-button"
            onClick={onCancel}
          >
            {cancelText}
          </button>





          <button
            className="confirm-button"
            onClick={onConfirm}
          >
            {confirmText}
          </button>




        </div>



      </div>



    </div>

  );

}


export default ConfirmModal;