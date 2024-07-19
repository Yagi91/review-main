import Rating from "../components/Rating";
import type { PageDetails } from "./Home";

type ProductProps = {
  productName?: string;
  rating: number;
  createdAt?: string;
  image?: string;
  id: string;
};

export default function ProductCard({
  product,
  pageDetails,
  setPageDetails,
}: // setPageDetails,
{
  product: ProductProps;
  setPageDetails: React.Dispatch<React.SetStateAction<PageDetails>>;
  pageDetails: PageDetails;
}) {
  return (
    <div
      onClick={() => {
        setPageDetails({
          ...pageDetails,
          currentReview: product.id,
          detailModal: true,
        });
      }}
      //current product refers to the product that currently displayed over the modal
      className="h-min cursor-pointer hover:scale-95 transition-all duration-200"
    >
      <img src={product.image} className=" rounded-sm object-cover w-full" />

      <div className="flex flex-col items-center space-y-2">
        <p className="font-uppercase text-sm font-medium">
          {product.productName}
        </p>
        <Rating rating={product.rating} />
      </div>
    </div>
  );
}
