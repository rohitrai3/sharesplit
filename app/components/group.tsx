import Image from "next/image";

export default function Group() {
  return (
    <div className="flex items-center space-x-5">
      <Image src="/group_icon.svg" alt="Group icon" width={64} height={64} />
      <div>
        <h2 className="text-xl">Ino-Shika-Cho</h2>
        <p className="text-xs opacity-50">ino, shikamaru, choji</p>
      </div>
    </div>
  );
}
