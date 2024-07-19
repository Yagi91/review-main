import { PageDetails, type ReviewType } from "../Home";
import Rating from "../Rating";
import React, { forwardRef, useState } from "react";
import { useAsync } from "../../hooks/useAsync";
import { deleteReview, getReview } from "../../services/review";
import { IoClose, IoTrash } from "react-icons/io5";
import UpdateReviewForm from "../Forms/UpdateReviewForm";
type DetailModalProps = {
  pageDetails: PageDetails;
  setPageDetails;
};

const DetailModal = forwardRef(function DetailModal(
  { pageDetails, setPageDetails }: DetailModalProps,
  ref: React.ForwardedRef<HTMLDialogElement>
) {
  const {
    loading,
    error,
    value: review,
  } = useAsync(
    () => getReview(pageDetails.currentReview),
    [pageDetails.currentReview]
  );

  if (loading) {
    return <h1>Loading review</h1>;
  }
  if (error) {
    return <h1>Error loading review</h1>;
  }

  return (
    <>
      <dialog ref={ref} className="modal">
        <div className="modal-box space-y-4">
          <div className="flex justify-between">
            <h5 className="text-2xl font-medium">Product Details</h5>
            <div className="flex gap-4">
              <div className="tooltip" data-tip="Delete review">
                <button
                  className="btn btn-error"
                  onClick={() => {
                    deleteReview(review?._id).then((data) => {
                      if (data.error) {
                        console.log(error);
                      } else {
                        alert("Successfully deleted product");
                        setPageDetails({ ...pageDetails, detailModal: false });
                      }
                    });
                  }}
                >
                  <IoTrash />
                </button>
              </div>
              <form method="dialog">
                <button className="btn btn-neutral" onClick={() => setPageDetails({...pageDetails, detailModal:false})}>
                  <IoClose />
                </button>
              </form>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <img
                className="object-cover rounded-2xl"
                src={review?.image}
              ></img>
            </div>
            <div>
              <p>Product name: {review?.productName}</p>
              <div>
                Rating: <Rating rating={review?.rating || 1.2} />
              </div>
              <div>Description: {review?.reviewText}</div>
            </div>
            <h6 className="font-bold">Update Review</h6>
            <UpdateReviewForm
              id={review?._id}
              data={{
                productName: review?.productName,
                rating: review?.rating,
                reviewText: review?.reviewText,
              }}
            />
          </div>
        </div>
      </dialog>
    </>
  );
});

export default DetailModal;
