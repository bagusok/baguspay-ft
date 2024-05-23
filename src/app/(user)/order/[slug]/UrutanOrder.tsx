export default function UrutanOrder({
  number,
  text,
}: {
  number: number;
  text: string;
}): React.JSX.Element {
  return (
    <div className="w-full inline-flex gap-3 items-center md:hidden">
      <div className="rounded-full w-8 h-8 p-3 bg-primary inline-flex items-center justify-center">
        <h3 className="text-lg font-semibold text-primary-foreground">
          {number}
        </h3>
      </div>
      <p className="text-lg font-semibold">{text}</p>
    </div>
  );
}
