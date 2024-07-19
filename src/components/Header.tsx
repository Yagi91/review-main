import HeaderEx1 from "../assets/images/headerEx1.jpg";

export default function Header({openModal}: {openModal:(modalId: "AddReview" | "ProductDetail") => void}) {
  return (
    <header
      className="min-h-[454px] bg-cover relative"
      style={{ backgroundImage: `url(${HeaderEx1})` }}
    >
      <div className=" bg-gradient-to-b from-black/0 to-black/60 absolute inset-0 flex flex-col justify-center">
        <div className="container mx-auto py-4">
          <h1 className="text-5xl font-bold leading-normal">
            Find the best products.
            <br /> Reviewed by experts.
          </h1>
          <button onClick={()=>openModal('AddReview')} className="btn btn-primary btn-lg px-8">Add review</button>
        </div>
      </div>
    </header>
  );
}
