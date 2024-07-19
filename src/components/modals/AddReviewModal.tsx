import { ForwardedRef, forwardRef } from "react";
import AddReviewForm from "../Forms/AddReviewForm";
import { IoClose } from "react-icons/io5";

const AddReviewModal = forwardRef(function AddReviewModal(
  _props,
  ref: ForwardedRef<HTMLDialogElement>
) {
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button
        className="btn"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        open modal
      </button> */}
      <dialog ref={ref} className="modal">
        <div className="modal-box">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg py-4">Product Review Form</h3>
            <form method="dialog">
              <button className="btn btn-neutral">
                <IoClose />
              </button>
            </form>
          </div>
          <AddReviewForm />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
});

export default AddReviewModal;
