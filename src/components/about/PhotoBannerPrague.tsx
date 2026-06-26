import Image from 'next/image'

export function PhotoBannerPrague() {
  return (
    <div className="relative w-full h-[50vh] overflow-hidden">
      <Image
        src="/short-sleeve-travel/images/prague-streets.jpg"
        alt="Travellers walking through Prague streets"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
    </div>
  )
}
