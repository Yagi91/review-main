import { IoSearch } from "react-icons/io5";
import DetailModal from "./modals/DetailModal";
import Header from "./Header";
import ProductCard from "./ProductCard";
import { useRef, useState } from "react";
import AddReviewModal from "./modals/AddReviewModal";
import { useAsync } from "../hooks/useAsync";
import { getReviews } from "../services/review";
import { useEffect } from "react";
import Paginator from "./Paginator";

export type PageDetails = {
  currentPage: number;
  currentReview: string;
  detailModal: boolean;
  addReviewModal: boolean;
};

export type ReviewType = {
  productName: string;
  rating: number;
  reviewText: string;
  id?: string;
};
export default function Home() {
  const addReviewModalRef = useRef<HTMLDialogElement>(null);
  const detailModalRef = useRef<HTMLDialogElement>(null);
  const [pageDetails, setPageDetails] = useState<PageDetails>({
    currentPage: 1,
    currentReview: "",
    detailModal: false,
    addReviewModal: false,
  });

  useEffect(() => {
    if (pageDetails.detailModal) {
      detailModalRef.current?.showModal();
    }
  });

  const openModal = (modalId: "AddReview" | "ProductDetail") => {
    switch (modalId) {
      case "AddReview":
        addReviewModalRef.current?.showModal();
        break;
      case "ProductDetail":
        detailModalRef.current?.showModal();
        break;
      default:
        break;
    }
  };

  const { loading, error, value } = useAsync(() =>
    getReviews(pageDetails.currentPage), [pageDetails.currentPage]);
  // Reads reviews from backand and populates reviews
  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Couldn't load reviews</h1>;
  }

  if (!value) {
    return <h1>Couldn't load reviews</h1>;
  }

  return (
    <>
      <DetailModal
        ref={detailModalRef}
        setPageDetails={setPageDetails}
        pageDetails={pageDetails}
      />
      <AddReviewModal ref={addReviewModalRef} />
      <div className="space-y-20">
        <Header openModal={openModal} />
        <div className="container mx-auto space-y-4 px-4">
          <h2 className="text-3xl font-bold">Featured Reviews</h2>
          <div className="grid md:grid-cols-7 grid-cols-1 gap-6">
            <div className="md:col-span-2 col-span-1">
              <h3 className="py-4 text-2xl">Sort by</h3>
              <div className="space-y-4">
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    id="search"
                    className="grow"
                    placeholder="Search"
                  />
                  <IoSearch />
                </label>

                <div className="form-control">
                  <label className="label cursor-pointer checked:bg-primary">
                    <span className="label-text">Latest</span>
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-blue-500"
                      defaultChecked
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Top</span>
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-blue-500"
                      defaultChecked
                    />
                  </label>
                </div>

                <button className="btn btn-accent btn-block">Apply</button>
              </div>
            </div>
            <div className="md:col-span-5 col-span-1 grid md:grid-cols-5 grid-cols-2 gap-2 grow-0">
              {value?.productReviews.map(
                (review: {
                  _id: string;
                  rating: number;
                  productName: string;
                  createdAt: string;
                  image: string;
                }) => {
                  return (
                    <ProductCard
                      key={review._id}
                      pageDetails={pageDetails}
                      setPageDetails={setPageDetails}
                      product={{
                        id: review._id,
                        rating: review.rating,
                        productName: review.productName,
                        createdAt: review.createdAt,
                        image: review.image,
                      }}
                    />
                  );
                }
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Paginator
            setPageDetails={setPageDetails}
            pageDetails={pageDetails}
            count={value?.count}
            max={10}
          />
        </div>
      </div>
    </>
  );
}
