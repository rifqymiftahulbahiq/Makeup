import { TextInput } from "flowbite-react";

export default function SearchComp({ onKeyUpAction }) {
  return (
    <div className="w-full max-w-2xl"> 
      <TextInput
        id="name"
        placeholder="Cari nama produk..."
        onKeyUp={onKeyUpAction}
        className="[&>div>input]:bg-[rgb(31,41,55)] [&>div>input]:text-white [&>div>input]:border-none [&>div>input]:rounded-lg [&>div>input]:py-3.5 [&>div>input]:pl-11"
      />
    </div>
  );
}