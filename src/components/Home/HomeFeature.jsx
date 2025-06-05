const HomeFeature = ({reverseOrder, heading, sideImage, content }) => {
  return (
    <section>
      <div className="container mx-auto">
        <div className={`flex flex-wrap items-center gap-y-8 md:gap-y-12 ${reverseOrder? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="w-full md:w-1/2">
            <h2 className="text-heading text-main">{heading}</h2>
            <p className="text-muted text-sm md:text-base !leading-relaxed mt-2 md:mt-4 max-w-lg">{content}</p>
          </div>
          <div className={`w-full md:w-1/2 pe-8 md:pe-12 ${reverseOrder ? ' lg:pe-20' : 'lg:ps-20'}`}>
            <img src={sideImage} className="h-full max-h-80 w-full object-contain" alt="side image" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeFeature