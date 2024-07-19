import { updateReview } from "../../services/review";
import { ReviewType } from "../Home";
import { useState } from "react";

export default function UpdateReviewForm({
  data,
  id,
}: {
  data?: ReviewType;
  id: string;
}) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    setSubmitting(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData.get("productName"));
    updateReview(id, {
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
            id="productName"
            name="productName"
            required
            defaultValue={data?.productName}
            placeholder="Product title"
            className="col-span-5 input input-bordered w-full "
          />
        </div>
        <div className="grid grid-cols-7 gap-4">
          <label className="col-span-2 self-end" htmlFor="score">
            Review rating
          </label>
          <input
            type="number"
            max={5}
            required
            min={0}

            defaultValue={data?.rating}
            step={0.1}
            id="rating"
            name="rating"
            placeholder="Product rating"
            className="input input-bordered col-span-5 invalid:outline-red-400 valid:outline-green-400"
          />
        </div>
        <div className="grid grid-cols-7 gap-4">
          <label className="col-span-2 self-end" htmlFor="description">
            Review text
          </label>
          <textarea
            rows={4}
            required
            defaultValue={data?.reviewText}
            id="reviewText"
            name="reviewText"
            className="textarea col-span-5  textarea-bordered"
            placeholder="Review description"
          ></textarea>
        </div>
        <button className="btn btn-block my-4 btn-secondary">
          Save Changes{" "}
          {isSubmitting ? (
            <span className="loading loading-ring loading-xs"></span>
          ) : null}
        </button>
      </form>
      {isSuccess ? (
        <div className="text-green-500 text-center">
          Updated review successfully
        </div>
      ) : null}
      {isError ? (
        <div className="text-red-500 text-center">Failed to update review</div>
      ) : null}
    </>
  );
}
