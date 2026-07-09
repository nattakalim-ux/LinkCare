import Image from "next/image";

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/brand/logo-icon.png"
        alt=""
        width={size}
        height={size}
        priority
        aria-hidden
      />
      <div className="text-body font-extrabold tracking-tight text-navy leading-tight">
        Link<span className="text-turquoise">Care</span>
      </div>
    </div>
  );
}
