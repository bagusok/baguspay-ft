export default function ProductGroup() {
  return (
    <>
      <section className="w-full grid grid-flow-row md:grid-flow-col gap-4">
        <div
          id="product-category"
          className="rounded-md p-3 bg-slate-200/60 h-48 grid-flow-col gap-2"
        >
          <div className="w-14 h-1 rounded-md bg-card"></div>
        </div>
        <div
          id="product-category"
          className="rounded-md p-3 bg-slate-200/60 h-48"
        ></div>
      </section>
    </>
  );
}
