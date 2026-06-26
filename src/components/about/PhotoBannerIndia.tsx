import Image from 'next/image'

export function PhotoBannerIndia() {
  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <Image
        src="/short-sleeve-travel/images/india-palace-girls.jpg"
        alt="Group of women at an ornate Indian palace doorway"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
    </div>
  )
}
