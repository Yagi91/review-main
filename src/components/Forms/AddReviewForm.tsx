import { useState } from "react";
import { addReview } from "../../services/review";

export default function AddReviewForm() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    setSubmitting(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    addReview({
      productName: formData.get("productName"),
      rating: formData.get("rating"),
      reviewText: formData.get("reviewText"),
    }).then((data) => {
      if (data.error) {
        console.log("Error");
        setError(true);
      } else {
        setSuccess(true);
        console.log(data);
      }
      setSubmitting(false);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="grid grid-cols-7 gap-4">
          <label className="col-span-2 self-end" htmlFor="title">
            Product name
          </label>
          <input
            type="text"
            required
            id="productName"
            name="productName"
            placeholder="Product name"
            className="col-span-5 input input-bordered w-full "
          />
        </div>
        <div className="grid grid-cols-7 gap-4">
          <label className="col-span-2 self-end" htmlFor="score">
            Review score
          </label>
          <input
            type="number"
            max={5}
            required
            min={0}
            step={0.1}
            id="rating"
            name="rating"
            placeholder="Product score"
            className="input input-bordered col-span-5 invalid:outline-red-400 valid:outline-green-400"
          />
        </div>
        <div className="grid grid-cols-7 gap-4">
          <label className="col-span-2 self-end" htmlFor="description">
            Review text
          </label>
          <textarea
            rows={4}
            id="reviewText"
            name="reviewText"
            aria-required
            className="textarea col-span-5  textarea-bordered"
            placeholder="Review text"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-block my-4 btn-primary">
          Add Review{" "}
          {isSubmitting ? (
            <span className="loading loading-ring loading-xs"></span>
          ) : null}
        </button>
      </form>
      {isSuccess ? (
        <div className="text-green-500 text-center">
          Added review successfully
        </div>
      ) : null}
      {isError ? (
        <div className="text-red-500 text-center">Failed to add review</div>
      ) : null}
    </>
  );
}
